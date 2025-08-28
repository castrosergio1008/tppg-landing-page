// pages/api/leads.js
import nodemailer from 'nodemailer';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

// Configuración para manejar archivos
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    // Parsear el formulario con archivos
    const form = new IncomingForm({
      uploadDir: './tmp',
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // Extraer datos del formulario
    const leadData = {
      nombre: fields.nombre?.[0] || '',
      email: fields.email?.[0] || '',
      telefono: fields.telefono?.[0] || '',
      tipoServicio: fields.tipoServicio?.[0] || '',
      mensaje: fields.mensaje?.[0] || '',
      fechaCreacion: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    };

    // Validar datos requeridos
    const requiredFields = ['nombre', 'email', 'telefono', 'tipoServicio', 'mensaje'];
    const missingFields = requiredFields.filter(field => !leadData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: 'Campos requeridos faltantes', 
        missingFields 
      });
    }

    // Configurar el transporter de email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER, // tu-email@gmail.com
        pass: process.env.SMTP_PASS, // tu contraseña de aplicación
      },
    });

    // Procesar archivos adjuntos
    const attachments = [];
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

    // Email para el cliente (confirmación)
    const clientEmailOptions = {
      from: process.env.SMTP_USER,
      to: leadData.email,
      subject: '✅ Solicitud de Cotización Recibida - The Pro Paint Group',
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
            .cta-button { display: inline-block; background: #7ED957; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>¡Gracias por contactarnos!</h1>
              <p>Tu solicitud de cotización ha sido recibida</p>
            </div>
            <div class="content">
              <h2>Hola ${leadData.nombre},</h2>
              
              <p>Nos complace confirmar que hemos recibido tu solicitud de cotización para <span class="highlight">${getServiceName(leadData.tipoServicio)}</span>.</p>
              
              <h3>📋 Resumen de tu solicitud:</h3>
              <ul>
                <li><strong>Nombre:</strong> ${leadData.nombre}</li>
                <li><strong>Servicio:</strong> ${getServiceName(leadData.tipoServicio)}</li>
                <li><strong>Teléfono:</strong> ${leadData.telefono}</li>
                ${attachments.length > 0 ? `<li><strong>Cotizaciones adjuntas:</strong> ${attachments.length} archivo(s)</li>` : ''}
              </ul>
              
              <h3>⏰ ¿Qué sigue?</h3>
              <p>Nuestro equipo revisará tu proyecto y te contactaremos en las próximas <strong>24 horas</strong> para:</p>
              <ul>
                <li>✅ Programar una visita gratuita</li>
                <li>✅ Evaluar tu proyecto en detalle</li>
                <li>✅ Preparar una cotización personalizada</li>
                ${attachments.length > 0 ? '<li>✅ Analizar las cotizaciones que enviaste para garantizar una mejor oferta</li>' : ''}
              </ul>
              
              <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h4 style="color: #082A37; margin-top: 0;">🎯 Recordatorio especial:</h4>
                <p style="margin: 0;">Como enviaste cotizaciones de otros proveedores, <strong>garantizamos mejorar cualquier precio</strong> manteniendo la misma o mejor calidad. ¡Prepárate para ahorrar!</p>
              </div>
              
              <p>Si tienes alguna pregunta urgente, no dudes en llamarnos:</p>
              <p><strong>📞 Teléfono:</strong> <a href="tel:+1234567890">(123) 456-7890</a></p>
              
              <div class="footer">
                <p>Gracias por elegir The Pro Paint Group<br>
                <em>"Transformando espacios, superando expectativas"</em></p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Email interno (notificación para la empresa)
    const internalEmailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.INTERNAL_EMAIL || process.env.SMTP_USER,
      subject: `🔥 NUEVO LEAD: ${leadData.nombre} - ${getServiceName(leadData.tipoServicio)}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { background: #082A37; color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .urgent { background: #ff6b6b; color: white; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center; }
            .data-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
            .data-item { background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #7ED957; }
            .priority-high { background: linear-gradient(135deg, #7ED957, #82e95d); color: white; padding: 20px; border-radius: 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎯 NUEVO LEAD RECIBIDO</h1>
              <p>Fecha: ${new Date(leadData.fechaCreacion).toLocaleString('es-ES')}</p>
            </div>
            <div class="content">
              ${attachments.length > 0 ? 
                `<div class="urgent">
                  <h3>⚡ PRIORIDAD ALTA ⚡</h3>
                  <p>Este cliente envió ${attachments.length} cotizacion(es) de competidores. 
                  <strong>¡Contactar dentro de las próximas 2 horas para garantizar conversión!</strong></p>
                </div>` : ''
              }
              
              <div class="data-grid">
                <div class="data-item">
                  <strong>👤 Cliente:</strong><br>
                  ${leadData.nombre}
                </div>
                <div class="data-item">
                  <strong>📧 Email:</strong><br>
                  <a href="mailto:${leadData.email}">${leadData.email}</a>
                </div>
                <div class="data-item">
                  <strong>📱 Teléfono:</strong><br>
                  <a href="tel:${leadData.telefono}">${leadData.telefono}</a>
                </div>
                <div class="data-item">
                  <strong>🎨 Servicio:</strong><br>
                  ${getServiceName(leadData.tipoServicio)}
                </div>
              </div>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3>💬 Detalles del Proyecto:</h3>
                <p style="background: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${leadData.mensaje}</p>
              </div>
              
              ${attachments.length > 0 ? 
                `<div class="priority-high">
                  <h3>📎 Cotizaciones Adjuntas (${attachments.length})</h3>
                  <p><strong>ACCIÓN REQUERIDA:</strong> Revisar cotizaciones y preparar oferta competitiva inmediatamente.</p>
                  <p>Este lead tiene alta probabilidad de conversión - ¡Actuar rápido!</p>
                </div>` : ''
              }
              
              <div style="text-align: center; margin: 30px 0;">
                <h3>🚀 PRÓXIMOS PASOS:</h3>
                <ol style="text-align: left; max-width: 500px; margin: 0 auto;">
                  <li>Llamar al cliente dentro de 2 horas</li>
                  <li>Programar visita para cotización</li>
                  ${attachments.length > 0 ? '<li>Analizar cotizaciones adjuntas</li>' : ''}
                  <li>Preparar propuesta competitiva</li>
                  <li>Seguimiento en 24 horas</li>
                </ol>
              </div>
              
              <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; text-align: center;">
                <p><strong>🎯 Meta de Conversión: Contactar y agendar cita dentro de las próximas 4 horas</strong></p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: attachments,
    };

    // Enviar emails
    await Promise.all([
      transporter.sendMail(clientEmailOptions),
      transporter.sendMail(internalEmailOptions),
    ]);

    // Limpiar archivos temporales
    for (const attachment of attachments) {
      if (fs.existsSync(attachment.path)) {
        fs.unlinkSync(attachment.path);
      }
    }

    // Opcional: Guardar lead en base de datos
    // await saveLeadToDatabase(leadData);

    // Opcional: Enviar a webhook de CRM
    // await sendToCRM(leadData);

    // Respuesta exitosa
    res.status(200).json({ 
      message: 'Lead procesado exitosamente',
      leadId: `LEAD_${Date.now()}`,
      redirectUrl: '/gracias'
    });

  } catch (error) {
    console.error('Error procesando lead:', error);
    res.status(500).json({ 
      message: 'Error interno del servidor', 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
}

// Función auxiliar para obtener nombre del servicio
function getServiceName(serviceType) {
  const services = {
    interior: 'Pintura Interior',
    exterior: 'Pintura Exterior',
    comercial: 'Pintura Comercial',
    mantenimiento: 'Mantenimiento de Pintura',
    otro: 'Otro Servicio',
  };
  return services[serviceType] || serviceType;
}

// Función opcional para guardar en base de datos
async function saveLeadToDatabase(leadData) {
  // Implementar según tu base de datos preferida
  // Ejemplo con MongoDB:
  /*
  const { MongoClient } = require('mongodb');
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db('painting_business');
  await db.collection('leads').insertOne({
    ...leadData,
    status: 'new',
    createdAt: new Date(),
  });
  await client.close();
  */
}

// Función opcional para enviar a CRM
async function sendToCRM(leadData) {
  // Ejemplo con webhook genérico:
  /*
  await fetch(process.env.CRM_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leadData),
  });
  */
}