"use client"

import Head from "next/head"
import { usePathname } from "next/navigation"

interface SEOProps {
  title?: string
  description?: string
  image?: string
  keywords?: string[]
}

export default function SEOOptimization({
  title = "Ouarzazate Tourism - La Porte du Désert",
  description = "Découvrez Ouarzazate, capitale du cinéma africain. Réservez vos visites des studios, kasbahs et excursions désert. Guide complet du tourisme à Ouarzazate.",
  image = "/images/beauty.jpg",
  keywords = [
    "Ouarzazate",
    "Maroc",
    "tourisme",
    "Atlas Studios",
    "Kasbah",
    "désert",
    "Sahara",
    "cinéma",
    "Ait Ben Haddou",
  ],
}: SEOProps) {
  const pathname = usePathname()
  const currentUrl = `https://ouarzazate-tourism.vercel.app${pathname}`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="author" content="Ouarzazate Tourism" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="fr" />
      <meta name="geo.region" content="MA" />
      <meta name="geo.placename" content="Ouarzazate" />
      <meta name="geo.position" content="30.9335;-6.937" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Ouarzazate Tourism" />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristAttraction",
            name: "Ouarzazate Tourism",
            description: description,
            url: currentUrl,
            image: image,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Ouarzazate",
              addressCountry: "MA",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 30.9335,
              longitude: -6.937,
            },
            telephone: "+212615048842",
            email: "info@ouarzazate-tourism.ma",
          }),
        }}
      />
    </Head>
  )
}
