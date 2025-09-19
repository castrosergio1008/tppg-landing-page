// pages/gracias.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SEO from '../components/layout/SEO';
import Image from 'next/image';

export default function Gracias() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(15);

  // Auto-redirect después de 15 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleCallNow = () => {
    window.location.href = 'tel:+1234567890'; // Cambiar por tu número
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('¡Hola! Acabo de enviar mi solicitud de cotización a través de su página web. Me gustaría más información sobre mis opciones de pintura.');
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank'); // Cambiar por tu número
  };

  return (
    <>
            <SEO
        title="¡Solicitud Enviada!"
        description="Tu solicitud de cotización ha sido enviada exitosamente. Te contactaremos pronto."
      >
        <meta name="robots" content="noindex" />
      </SEO>

      <div className="min-h-screen bg-gradient-to-br from-[#7ED957]/10 via-white to-[#082A37]/5">
        {/* Header simplificado */}
        <header className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center cursor-pointer" onClick={() => router.push('/')}>
                                <Image 
                  src="/logotppg.png" 
                  alt="The Pro Paint Group Logo" 
                  width={200}
                  height={80}
                  className="h-20 w-auto"
                />
              </div>
              <button
                onClick={() => router.push('/')}
                className="text-gray-600 hover:text-[#7ED957] transition-colors font-medium"
              >
                Volver al inicio
              </button>
            </div>
          </div>
        </header>

        {/* Contenido principal */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Mensaje de éxito principal */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-[#7ED957] to-[#82e95d] rounded-full mb-8 shadow-lg">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ¡Solicitud Enviada <span className="text-[#7ED957]">Exitosamente!</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Gracias por confiar en The Pro Paint Group. Hemos recibido tu solicitud de cotización y 
              <strong className="text-[#082A37]"> te contactaremos dentro de las próximas 24 horas</strong> para programar tu visita gratuita.
            </p>

            {/* Información de confirmación por email */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-3">
                <svg className="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <h3 className="text-lg font-semibold text-blue-900">📧 Email de confirmación enviado</h3>
              </div>
              <p className="text-blue-800">
                Revisa tu bandeja de entrada (y spam) para ver todos los detalles de tu solicitud y nuestro proceso de cotización.
              </p>
            </div>
          </div>

          {/* Sección de acción inmediata */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ¿Necesitas una respuesta <span className="text-[#7ED957]">más rápida?</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Si tu proyecto es urgente o tienes preguntas específicas, puedes contactarnos directamente ahora mismo
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <button
                onClick={handleCallNow}
                className="bg-[#082A37] text-white px-8 py-6 rounded-2xl font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 hover:shadow-lg group"
              >
                <div className="flex flex-col items-center">
                  <svg className="w-8 h-8 mb-3 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span className="text-lg">Llamar Ahora</span>
                  <span className="text-sm opacity-75">(123) 456-7890</span>
                </div>
              </button>

              <button
                onClick={handleWhatsApp}
                className="bg-[#25D366] text-white px-8 py-6 rounded-2xl font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 hover:shadow-lg group"
              >
                <div className="flex flex-col items-center">
                  <svg className="w-8 h-8 mb-3 group-hover:animate-bounce" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.786"></path>
                  </svg>
                  <span className="text-lg">WhatsApp</span>
                  <span className="text-sm opacity-75">Chat directo</span>
                </div>
              </button>
            </div>
          </div>

          {/* Información sobre el proceso */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-12">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">¿Qué sigue ahora?</h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-[#7ED957]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#082A37] font-bold text-xl">1</span>
                </div>
                <h4 className="font-semibold text-lg text-gray-900 mb-2">Revisión (2-6 horas)</h4>
                <p className="text-gray-600">Nuestro equipo revisará tu proyecto y las cotizaciones que enviaste</p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#7ED957]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#082A37] font-bold text-xl">2</span>
                </div>
                <h4 className="font-semibold text-lg text-gray-900 mb-2">Contacto (24 horas)</h4>
                <p className="text-gray-600">Te llamaremos para programar una visita gratuita en el horario que prefieras</p>
              </div>
              
              <div className="text-center">
                <div className="bg-[#7ED957]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#082A37] font-bold text-xl">3</span>
                </div>
                <h4 className="font-semibold text-lg text-gray-900 mb-2">Cotización (48 horas)</h4>
                <p className="text-gray-600">Visitaremos tu propiedad y te entregaremos una cotización detallada</p>
              </div>
            </div>
          </div>

          {/* Recordatorio especial si enviaron cotizaciones */}
          <div className="bg-gradient-to-r from-[#7ED957]/10 to-[#082A37]/5 border-2 border-[#7ED957] rounded-2xl p-8 mb-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#082A37] mb-4">
                🎯 Recordatorio de nuestra garantía
              </h3>
              <p className="text-lg text-[#082A37] leading-relaxed">
                Como empresa, <strong>garantizamos mejorar cualquier cotización</strong> que tengas de otros proveedores, 
                manteniendo o superando la calidad del servicio. Si enviaste cotizaciones, nuestro equipo las revisará 
                cuidadosamente para ofrecerte la mejor propuesta posible.
              </p>
            </div>
          </div>

          {/* Testimonios rápidos */}
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Lo que dicen nuestros clientes</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex text-yellow-400">
                    {'⭐'.repeat(5)}
                  </div>
                </div>
                <p className="text-gray-600 italic mb-4">Excelente servicio, cumplieron con todo lo prometido y el precio fue mejor que todas las otras cotizaciones.</p>
                <p className="font-semibold text-gray-900">- María González</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex text-yellow-400">
                    {'⭐'.repeat(5)}
                  </div>
                </div>
                <p className="text-gray-600 italic mb-4">Profesionales de principio a fin. La calidad del trabajo superó mis expectativas y fueron muy puntuales.</p>
                <p className="font-semibold text-gray-900">- Carlos Rodríguez</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex text-yellow-400">
                    {'⭐'.repeat(5)}
                  </div>
                </div>
                <p className="text-gray-600 italic mb-4">Respondieron súper rápido y me ayudaron a ahorrar mucho comparado con otras empresas. ¡Muy recomendados!</p>
                <p className="font-semibold text-gray-900">- Ana Martín</p>
              </div>
            </div>
          </div>

          {/* Auto-redirect notice */}
          <div className="text-center bg-white rounded-2xl p-6 border border-gray-200">
            <p className="text-gray-600">
              Serás redirigido automáticamente a la página principal en{' '}
              <span className="font-bold text-[#7ED957]">{timeLeft}</span> segundos
            </p>
            <button
              onClick={() => router.push('/')}
              className="mt-3 text-[#082A37] hover:text-[#7ED957] font-medium underline"
            >
              O haz clic aquí para regresar ahora
            </button>
          </div>
        </div>

        {/* Footer simplificado */}
        <footer className="bg-[#F0F0F0] py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Image 
                  src="/logotppg.png" 
                  alt="The Pro Paint Group Logo" 
                  width={120}
                  height={48}
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-gray-500 text-sm">
                © 2024 The Pro Paint Group. Transformando espacios con calidad garantizada.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
              