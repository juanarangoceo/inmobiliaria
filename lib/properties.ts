export type PropertyStatus = "ai-verified" | "premium" | "new" | "exclusive"
export type VipTier = "signature" | "private-collection" | "off-market"

export type Property = {
  id: string // slug
  code: string
  title: string
  location: string
  city: string
  region?: string
  price: number
  currency: "COP" | "USD"
  type: string
  operation: "sale"
  bedrooms: number
  bathrooms: number
  area: number // m²
  image: string
  status: PropertyStatus
  badge?: string
  isVip?: boolean
  vipTier?: VipTier
  has360?: boolean
  offMarket?: boolean
  priceOnRequest?: boolean
  featuredFromTikTok?: boolean
  isSimulated?: boolean
  year: number
  parking: number
  tagline: string
  description: string[]
  features: string[]
  amenities: string[]
  gallery: string[]
  coordinates: string
  geo?: { lat: number; lng: number }
  updatedAt?: string
  seoTitle?: string
  seoDescription?: string
  agent: {
    name: string
    role: string
    initials: string
    phone?: string
    email?: string
  }
}

/** Formatea un precio en COP/USD con convención colombiana. */
export function formatPrice(value: number, currency: Property["currency"]) {
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  })
  return formatter.format(value)
}

/** Conversión aproximada COP→USD para visitantes internacionales. */
export const COP_PER_USD = 4000

export function toUsdApprox(copValue: number) {
  return Math.round(copValue / COP_PER_USD)
}
