import { Helmet } from "react-helmet-async";
import shareImage from "../assets/zingerr_Transparent.png";

export function useSEO({
  title = "Awadh Info Solution | Website, Web App & Mobile App Development",
  description = "Awadh Info Solution provides end-to-end website, web application, mobile app, API development and maintenance services for businesses in India.",
  keywords = "Awadh Info Solution, software development company, website development, web application development, mobile app development, API development",
  image = shareImage,
  url = "https://www.awadhinfosolution.in/",
  type = "website",
  author = "Awadh Info Solution",
} = {}) {
  const canonicalUrl = new URL(url, "https://www.awadhinfosolution.in/");
  canonicalUrl.hash = "";
  const absoluteImage = new URL(image, "https://www.awadhinfosolution.in/").href;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl.href} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:site_name" content="Awadh Info Solution" />
      
      {/* Twitter Card */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl.href} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={absoluteImage} />
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl.href} />
    </Helmet>
  );
}

// Schema.org JSON-LD helper
export function useSchemaMarkup(schema) {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
