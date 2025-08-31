import Head from "next/head";
import Layout from "../components/layout/Layout";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import LayoutInfo from "../components/layout/LayoutInfo";
import ServiciosSection from "../components/sections/ServiciosSection";
import InfoSection from "../components/sections/InfoSection";

export default function Home() {
  return (
    <>
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
      <Layout>
        <HeroSection />
        {/* Formulario de Contacto */}
        <AboutSection />
        {/* Servicios Section */}
        <LayoutInfo>
          {/* Servicios Section */}
          <ServiciosSection />
          {/* información adicional */}
          <InfoSection />
        </LayoutInfo>
      </Layout>
    </>
  );
}
