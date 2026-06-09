import type { MetadataRoute } from "next"
import { getPropertySlugs } from "@/lib/sanity/queries"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://visionestatecolombia.com"

  const slugs = await getPropertySlugs()
  const properties: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/propiedades/${slug}`,
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
