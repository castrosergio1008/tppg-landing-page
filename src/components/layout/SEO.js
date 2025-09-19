import Head from 'next/head';

const SEO = ({ title, description, keywords, canonical, ogImage, children }) => {
  const siteTitle = 'The Pro Paint Group';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultOgImage = '/logotppg.png'; // Imagen por defecto para Open Graph
  const imageUrl = `https://www.tu-dominio.com${ogImage || defaultOgImage}`; // ¡Reemplaza con tu dominio!

  return (
    <Head>
      {/* SEO Estándar */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph (para Facebook, LinkedIn, etc.) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:url" content={canonical || 'https://www.tu-dominio.com'} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter Cards (para Twitter) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {children}
    </Head>
  );
};

export default SEO;