// pages/api/leads.js
import nodemailer from 'nodemailer';
import { IncomingForm } from 'formidable';
import fs from 'fs';

class CustomError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends CustomError {
  constructor(message, details = {}) {
    super(message, 400);
    this.name = 'ValidationError';
    this.details = details;
  }
}

class APIError extends CustomError {
  constructor(message, originalError = null) {
    super(message, 500);
    this.name = 'APIError';
    this.originalError = originalError;
  }
}

// Configuración para manejar archivos
export const config = {
  api: {
    bodyParser: false,
  },
};

// Crear el transporter de email una sola vez para reutilizar la conexión
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// --- Funciones Auxiliares ---

async function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      uploadDir: './tmp',
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    });
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        return reject(new APIError('Error al procesar el formulario', err));
      }
      resolve({ fields, files });
    });
  });
}

async function sendEmails(leadData, attachments) {
  const clientEmailOptions = {
    from: process.env.SMTP_USER,
    to: leadData.email,
    subject: '✅ Quote Request Received - The Pro Paint Group',
    html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #082A37, #7ED957); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .highlight { color: #7ED957; font-weight: bold; }
            .footer { text-align: center; margin-top: 30px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank you for contacting us!</h1>
              <p>Your quote request has been received</p>
            </div>
            <div class="content">
              <h2>Hi ${leadData.nombre},</h2>
              <p>We are pleased to confirm that we have received your quote request for <span class="highlight">${getServiceName(leadData.tipoServicio)}</span>.</p>
              <h3>📋 Summary of your request:</h3>
              <ul>
                <li><strong>Name:</strong> ${leadData.nombre}</li>
                <li><strong>Service:</strong> ${getServiceName(leadData.tipoServicio)}</li>
                <li><strong>Phone:</strong> ${leadData.telefono}</li>
                ${attachments.length > 0 ? `<li><strong>Attached quotes:</strong> ${attachments.length} file(s)</li>` : ''}
              </ul>
              <h3>⏰ What's next?</h3>
              <p>Our team will review your project and contact you within the next <strong>24 hours</strong>.</p>
            </div>
          </div>
        </body>
        </html>
      `,
  };

  const internalEmailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.INTERNAL_EMAIL || process.env.SMTP_USER,
    subject: `🔥 NEW LEAD: ${leadData.nombre} - ${getServiceName(leadData.tipoServicio)}`,
    html: `
        <!DOCTYPE html>
        <html>
        <body>
          <h1>🎯 NEW LEAD RECEIVED</h1>
          <p><strong>Client:</strong> ${leadData.nombre}</p>
          <p><strong>Email:</strong> ${leadData.email}</p>
          <p><strong>Phone:</strong> ${leadData.telefono}</p>
          <p><strong>Service:</strong> ${getServiceName(leadData.tipoServicio)}</p>
          <p><strong>Message:</strong> ${leadData.mensaje}</p>
        </body>
        </html>
      `,
    attachments,
  };

  try {
    await Promise.all([
      transporter.sendMail(clientEmailOptions),
      transporter.sendMail(internalEmailOptions),
    ]);
  } catch (error) {
    console.error('Error sending emails:', error);
    throw new APIError('Error sending emails', error);
  }
}

function getServiceName(serviceType) {
  const services = {
    interior: 'Interior Painting',
    exterior: 'Exterior Painting',
    comercial: 'Commercial Painting',
    mantenimiento: 'Painting Maintenance',
    otro: 'Other Service',
  };
  return services[serviceType] || serviceType;
}

// --- Main Handler ---

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  let attachments = [];

  try {
    const { fields, files } = await parseForm(req);

    const leadData = {
      nombre: fields.nombre?.[0] || '',
      email: fields.email?.[0] || '',
      telefono: fields.telefono?.[0] || '',
      tipoServicio: fields.tipoServicio?.[0] || '',
      mensaje: fields.mensaje?.[0] || '',
      fechaCreacion: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    };

    const requiredFields = ['nombre', 'email', 'telefono', 'tipoServicio', 'mensaje'];
    const missingFields = requiredFields.filter(field => !leadData[field]);
    if (missingFields.length > 0) {
      throw new ValidationError('Missing required fields', { missingFields });
    }

    const cotizacionesFiles = files.cotizacionesArchivos || [];
    const fileList = Array.isArray(cotizacionesFiles) ? cotizacionesFiles : [cotizacionesFiles];
    for (const file of fileList) {
      if (file && file.filepath) {
        attachments.push({
          filename: file.originalFilename,
          path: file.filepath,
          contentType: 'application/pdf',
        });
      }
    }

    await sendEmails(leadData, attachments);

    res.status(200).json({ 
      message: 'Lead processed successfully',
      leadId: `LEAD_${Date.now()}`,
      redirectUrl: '/thank-you'
    });

  } catch (error) {
    if (error instanceof ValidationError) {
      console.error('Validation Error:', error.message, error.details);
      return res.status(error.statusCode).json({ 
        message: error.message, 
        details: error.details 
      });
    } else if (error instanceof APIError) {
      console.error('API Error:', error.message, error.originalError);
      return res.status(error.statusCode).json({ 
        message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.originalError?.message || 'Unknown API Error' : undefined 
      });
    } else {
      console.error('Unexpected Error:', error);
      return res.status(500).json({ 
        message: 'An unexpected error occurred on the server',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined 
      });
    }
  } finally {
    // Limpiar archivos temporales sin importar si hubo un error o no
    for (const attachment of attachments) {
      if (fs.existsSync(attachment.path)) {
        fs.unlinkSync(attachment.path);
      }
    }
  }
}
