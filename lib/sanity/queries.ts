import { sanityClient } from "./client"
import { formatPrice, type Property, type PropertyStatus, type VipTier } from "@/lib/properties"

const REVALIDATE = 60

type SanityProp = {
  id: string
  updatedAt?: string
  seoTitle?: string
  seoDescription?: string
  code?: string
  title: string
  titleEn?: string
  location?: string
  city: string
  region?: string
  price?: number
  currency?: "COP" | "USD"
  propertyType: string
  bedrooms?: number
  bathrooms?: number
  area?: number
  parking?: number
  year?: number
  image?: string
  gallery?: string[]
  isVip?: boolean
  vipTier?: VipTier
  has360?: boolean
  priceOnRequest?: boolean
  featured?: boolean
  tagline?: string
  taglineEn?: string
  description?: Array<{ children?: Array<{ text?: string }> }>
  features?: string[]
  amenities?: string[]
  geo?: { lat?: number; lng?: number }
  agent?: { name?: string; role?: string; phone?: string; email?: string }
}

const FIELDS = /* groq */ `
  "id": slug.current,
  "updatedAt": _updatedAt,
  "seoTitle": seo.metaTitle,
  "seoDescription": seo.metaDescription,
  code, title, titleEn, location, city, region,
  price, currency, propertyType,
  bedrooms, bathrooms, area, parking, year,
  isVip, vipTier, has360, priceOnRequest, featured,
  tagline, taglineEn, features, amenities, geo, agent,
  description,
  "image": mainImage.asset->url,
  "gallery": gallery[].asset->url
`

function initialsOf(name?: string) {
  if (!name) return "VE"
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")
}

function deriveStatus(p: SanityProp): { status: PropertyStatus; badge: string } {
  if (p.isVip) {
    if (p.vipTier === "private-collection")
      return { status: "exclusive", badge: "Exclusiva" }
    if (p.vipTier === "off-market")
      return { status: "exclusive", badge: "Off-market" }
    return { status: "premium", badge: "Signature" }
  }
  if (p.featured) return { status: "new", badge: "Destacada" }
  return { status: "ai-verified", badge: "Verificado IA" }
}

function blocksToText(blocks?: SanityProp["description"]): string[] {
  if (!blocks) return []
  return blocks
    .map((b) => (b.children ?? []).map((c) => c.text ?? "").join(""))
    .filter((t) => t.trim().length > 0)
}

function toProperty(p: SanityProp): Property {
  const { status, badge } = deriveStatus(p)
  return {
    id: p.id,
    code: p.code ?? "",
    title: p.title,
    location: p.location ?? p.city,
    city: p.city,
    region: p.region,
    price: p.price ?? 0,
    currency: p.currency ?? "COP",
    type: p.propertyType,
    operation: "sale",
    bedrooms: p.bedrooms ?? 0,
    bathrooms: p.bathrooms ?? 0,
    area: p.area ?? 0,
    parking: p.parking ?? 0,
    year: p.year ?? new Date().getFullYear(),
    image: p.image ?? "/placeholder.jpg",
    status,
    badge,
    isVip: p.isVip,
    vipTier: p.vipTier,
    has360: p.has360,
    offMarket: p.vipTier === "off-market",
    priceOnRequest: p.priceOnRequest,
    tagline: p.tagline ?? "",
    description: blocksToText(p.description),
    features: p.features ?? [],
    amenities: p.amenities ?? [],
    gallery: p.gallery?.length ? p.gallery : p.image ? [p.image] : [],
    coordinates:
      p.geo?.lat != null && p.geo?.lng != null
        ? `${p.geo.lat.toFixed(4)}° N · ${Math.abs(p.geo.lng).toFixed(4)}° W`
        : (p.location ?? p.city),
    geo:
      p.geo?.lat != null && p.geo?.lng != null
        ? { lat: p.geo.lat, lng: p.geo.lng }
        : undefined,
    updatedAt: p.updatedAt,
    seoTitle: p.seoTitle,
    seoDescription: p.seoDescription,
    agent: {
      name: p.agent?.name ?? "Equipo Vision Estate",
      role: p.agent?.role ?? "Asesoría premium",
      initials: initialsOf(p.agent?.name),
      phone: p.agent?.phone,
      email: p.agent?.email,
    },
  }
}

const PUBLISHED = `_type == "propiedad" && status == "published"`

export async function getProperties(): Promise<Property[]> {
  const docs = await sanityClient.fetch<SanityProp[]>(
    `*[${PUBLISHED}] | order(featured desc, _createdAt desc){${FIELDS}}`,
    {},
    { next: { revalidate: REVALIDATE } },
  )
  return docs.map(toProperty)
}

export async function getFeaturedProperties(): Promise<Property[]> {
  const docs = await sanityClient.fetch<SanityProp[]>(
    `*[${PUBLISHED}] | order(featured desc, _createdAt desc){${FIELDS}}`,
    {},
    { next: { revalidate: REVALIDATE } },
  )
  return docs.map(toProperty)
}

export async function getVipProperties(): Promise<Property[]> {
  const docs = await sanityClient.fetch<SanityProp[]>(
    `*[${PUBLISHED} && isVip == true] | order(_createdAt desc){${FIELDS}}`,
    {},
    { next: { revalidate: REVALIDATE } },
  )
  return docs.map(toProperty)
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const doc = await sanityClient.fetch<SanityProp | null>(
    `*[${PUBLISHED} && slug.current == $slug][0]{${FIELDS}}`,
    { slug },
    { next: { revalidate: REVALIDATE } },
  )
  return doc ? toProperty(doc) : null
}

export async function getPropertySlugs(): Promise<string[]> {
  return sanityClient.fetch<string[]>(
    `*[${PUBLISHED}].slug.current`,
    {},
    { next: { revalidate: REVALIDATE } },
  )
}

// ── Landings VIP (white-label) ───────────────────────────────────────────────

export type VipLanding = {
  slug: string
  clientName?: string
  brandColor?: string
  clientLogo?: string
  heroHeadline?: string
  heroSubcopy?: string
  chatbotName?: string
  chatbotContext?: string
  contactName?: string
  contactPhone?: string
  contactWhatsapp?: string
  contactEmail?: string
  property: Property | null
}

const LANDING_FIELDS = /* groq */ `
  "slug": slug.current,
  clientName, brandColor, heroHeadline, heroSubcopy,
  chatbotName, chatbotContext,
  contactName, contactPhone, contactWhatsapp, contactEmail,
  "clientLogo": clientLogo.asset->url,
  "property": property->{${FIELDS}}
`

function mapLanding(doc: Record<string, unknown> | null): VipLanding | null {
  if (!doc) return null
  const property = doc.property ? toProperty(doc.property as SanityProp) : null
  return { ...(doc as Omit<VipLanding, "property">), property }
}

export async function getVipLandingBySlug(
  slug: string,
): Promise<VipLanding | null> {
  const doc = await sanityClient.fetch<Record<string, unknown> | null>(
    `*[_type == "vipLanding" && published == true && slug.current == $slug][0]{${LANDING_FIELDS}}`,
    { slug },
    { next: { revalidate: REVALIDATE } },
  )
  return mapLanding(doc)
}

export async function getVipLandingSlugs(): Promise<string[]> {
  return sanityClient.fetch<string[]>(
    `*[_type == "vipLanding" && published == true].slug.current`,
    {},
    { next: { revalidate: REVALIDATE } },
  )
}

// ── Contexto para el chatbot ─────────────────────────────────────────────────

function propertyToContext(p: Property, extra?: string) {
  const price = p.priceOnRequest
    ? "A consultar"
    : `${formatPrice(p.price, p.currency)} (aprox. USD ${Math.round(
        p.price / 4000,
      ).toLocaleString("en-US")})`
  return [
    `Propiedad: ${p.title}`,
    `Tipo: ${p.type}`,
    `Ubicación: ${p.location}, ${p.city}${p.region ? `, ${p.region}` : ""}, Colombia`,
    `Precio: ${price}`,
    `Habitaciones: ${p.bedrooms} · Baños: ${p.bathrooms} · Área: ${p.area} m² · Parqueaderos: ${p.parking} · Año: ${p.year}`,
    p.features.length ? `Características: ${p.features.join(", ")}` : "",
    p.amenities.length ? `Amenidades: ${p.amenities.join(", ")}` : "",
    p.description.length ? `Descripción: ${p.description.join(" ")}` : "",
    p.agent?.phone ? `Contacto: ${p.agent.name} (${p.agent.phone})` : "",
    extra ? `Información adicional del propietario: ${extra}` : "",
  ]
    .filter(Boolean)
    .join("\n")
}

export type ChatContext = { context: string; assistantName: string }

export async function getChatContext(opts: {
  propertyId?: string
  landingSlug?: string
}): Promise<ChatContext | null> {
  if (opts.landingSlug) {
    const landing = await getVipLandingBySlug(opts.landingSlug)
    if (!landing?.property) return null
    return {
      assistantName: landing.chatbotName || "Asistente",
      context: propertyToContext(landing.property, landing.chatbotContext),
    }
  }
  if (opts.propertyId) {
    const property = await getPropertyBySlug(opts.propertyId)
    if (!property) return null
    return { assistantName: "Asistente", context: propertyToContext(property) }
  }
  // Sin contexto específico: catálogo general
  const all = await getProperties()
  if (all.length === 0) return null
  return {
    assistantName: "Concierge",
    context:
      "Catálogo Vision Estate Colombia (resumen):\n" +
      all
        .map(
          (p) =>
            `- ${p.title} · ${p.city} · ${
              p.priceOnRequest ? "A consultar" : formatPrice(p.price, p.currency)
            } · ${p.bedrooms} hab · ${p.area} m²`,
        )
        .join("\n"),
  }
}
