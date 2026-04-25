import type { MetadataRoute } from "next"
import { PROPERTIES } from "@/lib/properties"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "https://habitar.mx"

  const properties: MetadataRoute.Sitemap = PROPERTIES.map((p) => ({
    url: `${base}/propiedades/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/vip`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/servicios`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/publicar`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...properties,
  ]
}
