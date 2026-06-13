import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "https://visionestatecolombia.com"
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/studio",
        "/cuenta",
        "/ingresar",
        "/auth/",
        "/api/",
        "/publicar/propiedad",
        "/v/", // landings VIP privadas (se comparten por WhatsApp, no se indexan)
      ],
    },
    sitemap: `${base}/sitemap.xml`,
  }
}
