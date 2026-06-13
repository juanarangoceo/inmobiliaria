import type { MetadataRoute } from "next"
import { getProperties } from "@/lib/sanity/queries"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://visionestatecolombia.com"

  const all = await getProperties()
  const properties: MetadataRoute.Sitemap = all.map((p) => ({
    url: `${base}/propiedades/${p.id}`,
    // Frescura real desde Sanity (_updatedAt), no la hora del build.
    lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
    // Google Imágenes es canal real en inmobiliario.
    images: p.image ? [p.image] : undefined,
  }))

  const lastCollection = all[0]?.updatedAt
    ? new Date(all[0].updatedAt)
    : new Date()

  return [
    { url: base, lastModified: lastCollection, changeFrequency: "daily", priority: 1 },
    { url: `${base}/vip`, lastModified: lastCollection, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/servicios`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/publicar`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/privacidad`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terminos`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/cookies`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    ...properties,
  ]
}
