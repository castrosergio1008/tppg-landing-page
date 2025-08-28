import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../components/layout/Layout';

export default function Home() {
  const router = useRouter();
  
  // Estado del formulario
  const initialState = {
    nombre: '',
    email: '',
    telefono: '',
    tipoServicio: '',
    mensaje: '',
    cotizacionesArchivos: [],
    aceptaTerminos: false
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Funciones del formulario
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      const validFiles = Array.from(files).filter(file => 
        file.type === 'application/pdf' && file.size <= 10 * 1024 * 1024 // 10MB max
      );
      setFormData(prev => ({
        ...prev,
        [name]: validFiles
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    // Limpiar error cuando el usuario corrige
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }


  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'El formato del email no es válido';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (!validatePhone(formData.telefono)) {
      newErrors.telefono = 'El formato del teléfono no es válido';
    }

    if (!formData.tipoServicio) {
      newErrors.tipoServicio = 'Selecciona el tipo de servicio';
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido';
    }

    if (!formData.aceptaTerminos) {
      newErrors.aceptaTerminos = 'Debes aceptar los términos y condiciones';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      // Scroll al primer error
      const firstErrorElement = document.querySelector('.border-red-500');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Crear FormData para enviar archivos
      const submitFormData = new FormData();
      
      // Agregar campos de texto
      Object.keys(formData).forEach(key => {
        if (key !== 'cotizacionesArchivos') {
          submitFormData.append(key, formData[key]);
        }
      });
      
      // Agregar archivos
      formData.cotizacionesArchivos.forEach(file => {
        submitFormData.append('cotizacionesArchivos', file);
      });

      // Enviar a API
      const response = await fetch('/api/leads', {
        method: 'POST',
        body: submitFormData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al enviar la solicitud');
      }

      // Éxito: redirigir a página de agradecimiento
      router.push('/gracias');
      
    } catch (error) {
      console.error('Error enviando formulario:', error);
      setErrors({ 
        general: 'Hubo un error al enviar el formulario. Por favor, verifica tu conexión e intenta nuevamente.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    {/* 2. Añadir el bloque Head con todas las etiquetas SEO */}
      <Head>
        <title>Pintores Profesionales | Garantizamos Mejorar tu Cotización - The Pro Paint Group</title>
        <meta 
          name="description" 
          content="Servicios de pintura interior, exterior y comercial. Envíanos tu cotización actual y te garantizamos un mejor precio con acabados de alta calidad. ¡Solicita tu visita gratuita!" 
        />
        <meta name="keywords" content="pintores, pintura de casas, pintura comercial, cotización de pintura, mejorar cotización pintura, servicios de pintura" />
        <link rel="canonical" href="https://www.tu-dominio.com" /> {/* Reemplaza con tu dominio */}
        
        {/* Schema Markup para Negocio Local */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "PaintingService",
            "name": "The Pro Paint Group",
            "image": "https://www.tu-dominio.com/logotppg.png", // Reemplaza con la URL completa de tu logo
            "url": "https://www.tu-dominio.com", // Reemplaza con tu dominio
            "telephone": "+1234567890", // Reemplaza con tu teléfono
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Main St",
              "addressLocality": "City",
              "addressRegion": "State",
              "postalCode": "12345",
              "addressCountry": "US" // Reemplaza con tu información
            },
            "description": "Servicios profesionales de pintura interior, exterior y comercial. Garantizamos mejorar cualquier cotización existente.",
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "17:00"
            }
          })}}
        />
      </Head>
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section id="inicio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Transformamos tu hogar con
            <span className="text-[#7ED957] block">pintura profesional</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Especialistas en pintura residencial y comercial. Garantizamos acabados de alta calidad que superan tus expectativas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#contacto"
              className="bg-[#082A37] text-white px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:-translate-y-1 hover:shadow-lg"
            >
              Solicita tu cotización gratuita
            </a>
            <button className="border-2 border-[#7ED957] text-[#082A37] px-8 py-4 rounded-lg font-semibold hover:bg-[#7ED957] hover:text-white transition-all">
              Ver nuestros trabajos
            </button>
          </div>
        </div>
      </section>

      {/* Formulario de Contacto */}
      <section id="contacto" className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              ¿Listo para renovar tu espacio?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Cuéntanos sobre tu proyecto de pintura y te contactaremos para programar una visita gratuita
            </p>
            
            {/* Mensaje Publicitario Competitivo */}
            <div className="bg-gradient-to-r from-[#7ED957]/10 to-[#082A37]/5 border-2 border-[#7ED957] rounded-2xl p-6 mb-8 max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <span className="text-3xl mr-3">💰</span>
                <h3 className="text-2xl font-bold text-[#082A37]">¡Garantizamos mejorar cualquier cotización!</h3>
              </div>
              <div className="text-left space-y-3 text-[#082A37]">
                <div className="flex items-center">
                  <span className="text-[#7ED957] mr-2">✓</span>
                  <span><strong>¿Ya tienes cotizaciones?</strong> Adjúntalas y te garantizamos mejorar el precio manteniendo la misma calidad</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[#7ED957] mr-2">✓</span>
                  <span><strong>Análisis gratuito:</strong> Revisamos tu proyecto y optimizamos costos sin comprometer resultados</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[#7ED957] mr-2">✓</span>
                  <span><strong>Precio final garantizado:</strong> No cobramos extras ocultos, el precio que cotizamos es el que pagas</span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold text-[#082A37]">
                  📋 <em>Envía tus cotizaciones actuales y descubre cuánto puedes ahorrar</em>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 border border-gray-100">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="block text-gray-700 font-semibold mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED957] bg-white text-gray-800 transition-colors ${
                      errors.nombre ? 'border-red-500' : 'border-gray-300'
                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder="Tu nombre completo" 
                  />
                  {errors.nombre && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.nombre}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED957] bg-white text-gray-800 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    placeholder="tu@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Teléfono */}
              <div className="mt-6">
                <label htmlFor="telefono" className="block text-gray-700 font-semibold mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED957] bg-white text-gray-800 transition-colors ${
                    errors.telefono ? 'border-red-500' : 'border-gray-300'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder="(555) 123-4567"
                />
                {errors.telefono && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.telefono}
                  </p>
                )}
              </div>

              {/* Tipo de Servicio */}
              <div className="mt-6">
                <label htmlFor="tipoServicio" className="block text-gray-700 font-semibold mb-2">
                  Tipo de servicio *
                </label>
                <select
                  id="tipoServicio"
                  name="tipoServicio"
                  value={formData.tipoServicio}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED957] bg-white text-gray-800 transition-colors ${
                    errors.tipoServicio ? 'border-red-500' : 'border-gray-300'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <option value="">Selecciona el tipo de servicio</option>
                  <option value="interior">Pintura Interior</option>
                  <option value="exterior">Pintura Exterior</option>
                  <option value="comercial">Pintura Comercial</option>
                  <option value="mantenimiento">Mantenimiento de Pintura</option>
                  <option value="otro">Otro</option>
                </select>
                {errors.tipoServicio && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.tipoServicio}
                  </p>
                )}
              </div>

              {/* Cotizaciones PDF - Campo Opcional */}
              <div className="mt-6">
                <label htmlFor="cotizacionesArchivos" className="block text-gray-700 font-semibold mb-2">
                  Cotizaciones actuales (opcional) 📋
                  <span className="text-sm font-normal text-gray-500 block mt-1">
                    Adjunta cotizaciones de otros proveedores para garantizar una mejor oferta
                  </span>
                </label>
                <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed border-gray-200' : 'border-gray-300 hover:border-[#7ED957]'
                }`}>
                  <input
                    type="file"
                    id="cotizacionesArchivos"
                    name="cotizacionesArchivos"
                    onChange={handleChange}
                    multiple
                    accept=".pdf"
                    disabled={isSubmitting}
                    className="hidden"
                  />
                  <label 
                    htmlFor="cotizacionesArchivos" 
                    className={`cursor-pointer flex flex-col items-center ${isSubmitting ? 'cursor-not-allowed' : ''}`}
                  >
                    <div className="text-4xl text-gray-400 mb-2">📄</div>
                    <p className="text-gray-600 font-medium">Haz clic para seleccionar archivos PDF</p>
                    <p className="text-sm text-gray-500 mt-1">Máximo 10MB por archivo</p>
                  </label>
                  
                  {formData.cotizacionesArchivos.length > 0 && (
                    <div className="mt-4 text-left">
                      <p className="text-sm text-gray-700 font-medium mb-2">Archivos seleccionados:</p>
                      {formData.cotizacionesArchivos.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded mb-1">
                          <span className="text-sm text-gray-700 truncate">📄 {file.name}</span>
                          <span className="text-xs text-gray-500">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  💡 <strong>Tip:</strong> Enviar cotizaciones existentes nos ayuda a ofrecerte un mejor precio y servicio
                </div>
              </div>

              {/* Mensaje */}
              <div className="mt-6">
                <label htmlFor="mensaje" className="block text-gray-700 font-semibold mb-2">
                  Detalles del proyecto *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  rows="5"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED957] resize-none bg-white text-gray-800 transition-colors ${
                    errors.mensaje ? 'border-red-500' : 'border-gray-300'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder="Describe tu proyecto: tamaño de la casa/oficina, colores preferidos, fechas estimadas, etc."
                ></textarea>
                {errors.mensaje && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.mensaje}
                  </p>
                )}
              </div>

              {/* Términos */}
              <div className="mt-6">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    name="aceptaTerminos"
                    checked={formData.aceptaTerminos}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`mt-1 mr-3 h-4 w-4 text-[#7ED957] transition-colors ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  />
                  <span className="text-sm text-gray-700">
                    Acepto los términos y condiciones y autorizo el tratamiento de mis datos para recibir información sobre servicios de pintura *
                  </span>
                </label>
                {errors.aceptaTerminos && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.aceptaTerminos}
                  </p>
                )}
              </div>

              {/* Error general */}
              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mt-6 flex items-center">
                  <span className="mr-2">⌘</span>
                  {errors.general}
                </div>
              )}

              {/* Botón de envío */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#082A37] hover:bg-opacity-90 hover:shadow-lg transform hover:-translate-y-1'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando solicitud...
                    </span>
                  ) : (
                    'Solicitar cotización gratuita'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section id="servicios" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Nuestros Servicios de Pintura
            </h2>
            <p className="text-xl text-gray-600">
              Ofrecemos servicios completos de pintura para transformar cualquier espacio
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group">
              <div className="bg-[#7ED957]/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#7ED957]/20 transition-colors">
                <span className="text-[#082A37] text-3xl font-bold">🏠</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Pintura Interior</h3>
              <p className="text-gray-600 leading-relaxed">Transformamos tus espacios interiores con colores que reflejan tu personalidad y estilo de vida</p>
            </div>
            
            <div className="text-center p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group">
              <div className="bg-[#7ED957]/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#7ED957]/20 transition-colors">
                <span className="text-[#082A37] text-3xl font-bold">🏢</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Pintura Exterior</h3>
              <p className="text-gray-600 leading-relaxed">Protegemos y embellecemos el exterior de tu propiedad con pinturas de alta resistencia</p>
            </div>
            
            <div className="text-center p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group">
              <div className="bg-[#7ED957]/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#7ED957]/20 transition-colors">
                <span className="text-[#082A37] text-3xl font-bold">🔧</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Mantenimiento</h3>
              <p className="text-gray-600 leading-relaxed">Servicios de mantenimiento preventivo y correctivo para mantener tu propiedad como nueva</p>
            </div>
          </div>

          {/* Características adicionales */}
          <div className="bg-gray-50 rounded-2xl p-12">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">¿Por qué elegir The Pro Paint Group?</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-[#7ED957] text-4xl mb-4">✓</div>
                <h4 className="font-semibold text-gray-900 text-lg mb-2">Garantía de Calidad</h4>
                <p className="text-gray-600">Todos nuestros trabajos incluyen garantía</p>
              </div>
              <div className="text-center">
                <div className="text-[#7ED957] text-4xl mb-4">⭐</div>
                <h4 className="font-semibold text-gray-900 text-lg mb-2">Experiencia</h4>
                <p className="text-gray-600">Años de experiencia en el mercado</p>
              </div>
              <div className="text-center">
                <div className="text-[#7ED957] text-4xl mb-4">🎨</div>
                <h4 className="font-semibold text-gray-900 text-lg mb-2">Materiales Premium</h4>
                <p className="text-gray-600">Utilizamos las mejores pinturas del mercado</p>
              </div>
              <div className="text-center">
                <div className="text-[#7ED957] text-4xl mb-4">💰</div>
                <h4 className="font-semibold text-gray-900 text-lg mb-2">Precios Justos</h4>
                <p className="text-gray-600">Cotización gratuita y precios competitivos</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}