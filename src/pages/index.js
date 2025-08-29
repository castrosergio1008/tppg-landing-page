
import Head from "next/head";
import Layout from "../components/layout/Layout";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";

export default function Home() {

  return (
    <>
      {/* 2. Añadir el bloque Head con todas las etiquetas SEO */}
      <Head>
        <title>
          Pintores Profesionales | Garantizamos Mejorar tu Cotización - The Pro
          Paint Group
        </title>
        <meta
          name="description"
          content="Servicios de pintura interior, exterior y comercial. Envíanos tu cotización actual y te garantizamos un mejor precio con acabados de alta calidad. ¡Solicita tu visita gratuita!"
        />
        <meta
          name="keywords"
          content="pintores, pintura de casas, pintura comercial, cotización de pintura, mejorar cotización pintura, servicios de pintura"
        />
        <link rel="canonical" href="https://www.tu-dominio.com" />{" "}
        {/* Reemplaza con tu dominio */}
        {/* Schema Markup para Negocio Local */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PaintingService",
              name: "The Pro Paint Group",
              image: "https://www.tu-dominio.com/logotppg.png", // Reemplaza con la URL completa de tu logo
              url: "https://www.tu-dominio.com", // Reemplaza con tu dominio
              telephone: "+1234567890", // Reemplaza con tu teléfono
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Main St",
                addressLocality: "City",
                addressRegion: "State",
                postalCode: "12345",
                addressCountry: "US", // Reemplaza con tu información
              },
              description:
                "Servicios profesionales de pintura interior, exterior y comercial. Garantizamos mejorar cualquier cotización existente.",
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                opens: "09:00",
                closes: "17:00",
              },
            }),
          }}
        />
      </Head>
      <div className="min-h-screen bg-white">
        <Layout>
          <HeroSection />  
          {/* Formulario de Contacto */}
          <AboutSection />
          {/* Servicios Section */}
          <section id="servicios" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Nuestros Servicios de Pintura
                </h2>
                <p className="text-xl text-gray-600">
                  Ofrecemos servicios completos de pintura para transformar
                  cualquier espacio
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="text-center p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group">
                  <div className="bg-[#7ED957]/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#7ED957]/20 transition-colors">
                    <span className="text-[#082A37] text-3xl font-bold">
                      🏠
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Pintura Interior
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Transformamos tus espacios interiores con colores que
                    reflejan tu personalidad y estilo de vida
                  </p>
                </div>

                <div className="text-center p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group">
                  <div className="bg-[#7ED957]/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#7ED957]/20 transition-colors">
                    <span className="text-[#082A37] text-3xl font-bold">
                      🏢
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Pintura Exterior
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Protegemos y embellecemos el exterior de tu propiedad con
                    pinturas de alta resistencia
                  </p>
                </div>

                <div className="text-center p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors group">
                  <div className="bg-[#7ED957]/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#7ED957]/20 transition-colors">
                    <span className="text-[#082A37] text-3xl font-bold">
                      🔧
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    Mantenimiento
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Servicios de mantenimiento preventivo y correctivo para
                    mantener tu propiedad como nueva
                  </p>
                </div>
              </div>

              {/* Características adicionales */}
              <div className="bg-gray-50 rounded-2xl p-12">
                <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
                  ¿Por qué elegir The Pro Paint Group?
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-[#7ED957] text-4xl mb-4">✓</div>
                    <h4 className="font-semibold text-gray-900 text-lg mb-2">
                      Garantía de Calidad
                    </h4>
                    <p className="text-gray-600">
                      Todos nuestros trabajos incluyen garantía
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-[#7ED957] text-4xl mb-4">⭐</div>
                    <h4 className="font-semibold text-gray-900 text-lg mb-2">
                      Experiencia
                    </h4>
                    <p className="text-gray-600">
                      Años de experiencia en el mercado
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-[#7ED957] text-4xl mb-4">🎨</div>
                    <h4 className="font-semibold text-gray-900 text-lg mb-2">
                      Materiales Premium
                    </h4>
                    <p className="text-gray-600">
                      Utilizamos las mejores pinturas del mercado
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-[#7ED957] text-4xl mb-4">💰</div>
                    <h4 className="font-semibold text-gray-900 text-lg mb-2">
                      Precios Justos
                    </h4>
                    <p className="text-gray-600">
                      Cotización gratuita y precios competitivos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Layout>
      </div>
    </>
  );
}
