import { type Property, toUsdApprox } from "@/lib/properties"

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://visionestatecolombia.com"

const ORG_NAME = "Vision Estate Colombia"

/** Organization global (con sameAs → TikTok). Inyectar una vez en el layout. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: ORG_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/icon.svg`,
    areaServed: "CO",
    sameAs: ["https://www.tiktok.com/@visionestatecolombia"],
  }
}

/** RealEstateListing por ficha de propiedad. */
export function propertyToJsonLd(p: Property) {
  const url = `${SITE_URL}/propiedades/${p.id}`
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: p.title,
    description: p.seoDescription || p.tagline || p.description[0],
    url,
    image: p.gallery?.length ? p.gallery : p.image ? [p.image] : undefined,
    datePosted: p.updatedAt,
    address: {
      "@type": "PostalAddress",
      addressLocality: p.city,
      addressRegion: p.region,
      addressCountry: "CO",
    },
  }

  if (p.geo) {
    data.geo = {
      "@type": "GeoCoordinates",
      latitude: p.geo.lat,
      longitude: p.geo.lng,
    }
  }

  if (!p.priceOnRequest && p.price > 0) {
    data.offers = {
      "@type": "Offer",
      price: p.price,
      priceCurrency: p.currency,
      availability: "https://schema.org/InStock",
    }
  }

  // Detalles del inmueble como propiedades adicionales legibles por motores.
  data.additionalProperty = [
    p.bedrooms ? { "@type": "PropertyValue", name: "Habitaciones", value: p.bedrooms } : null,
    p.bathrooms ? { "@type": "PropertyValue", name: "Baños", value: p.bathrooms } : null,
    p.area ? { "@type": "PropertyValue", name: "Área", value: p.area, unitCode: "MTK" } : null,
    p.parking ? { "@type": "PropertyValue", name: "Parqueaderos", value: p.parking } : null,
    !p.priceOnRequest && p.price > 0
      ? { "@type": "PropertyValue", name: "Precio aproximado (USD)", value: toUsdApprox(p.price) }
      : null,
  ].filter(Boolean)

  return data
}

/** BreadcrumbList para la ficha. */
export function breadcrumbJsonLd(p: Property) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: p.region || p.city,
        item: `${SITE_URL}/#destacadas`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: p.title,
        item: `${SITE_URL}/propiedades/${p.id}`,
      },
    ],
  }
}

/** Helper para serializar JSON-LD de forma segura en un <script>. */
export function jsonLdScript(data: unknown) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  }
}
