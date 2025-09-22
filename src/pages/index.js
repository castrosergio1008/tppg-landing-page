import SEO from "../components/layout/SEO";
import Layout from "../components/layout/Layout";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import LayoutInfo from "../components/layout/LayoutInfo";
import ServiciosSection from "../components/sections/ServiciosSection";
import InfoSection from "../components/sections/InfoSection";

export default function Home() {
  return (
    <>
            <SEO
        title="Professional Painters | We Guarantee to Beat Your Quote"
        description="Interior, exterior, and commercial painting services. Send us your current quote, and we guarantee a better price with high-quality finishes. Request your free visit!"
        keywords="painters, house painting, commercial painting, painting quote, beat painting quote, painting services"
        canonical="https://www.tu-dominio.com" // Replace with your domain
      >
        {/* Schema Markup for Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PaintingService",
              name: "The Pro Paint Group",
              image: "https://www.tu-dominio.com/logotppg.png", // Replace with your logo's full URL
              url: "https://www.tu-dominio.com", // Replace with your domain
              telephone: "+1234567890", // Replace with your phone number
              priceRange: "$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Main St",
                addressLocality: "City",
                addressRegion: "State",
                postalCode: "12345",
                addressCountry: "US", // Replace with your information
              },
              description:
                "Professional interior, exterior, and commercial painting services. We guarantee to beat any existing quote.",
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
      </SEO>
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
