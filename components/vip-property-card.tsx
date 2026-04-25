import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRight,
  Bath,
  BedDouble,
  RotateCw,
  Ruler,
} from "lucide-react"
import type { Property } from "@/lib/properties"
import { formatPrice } from "@/lib/properties"
import { cn } from "@/lib/utils"

type Props = {
  property: Property
  size?: "default" | "tall"
  priority?: boolean
}

const tierLabel: Record<string, string> = {
  signature: "Signature",
  "private-collection": "Colección Privada",
  "off-market": "Off-market",
}

export function VipPropertyCard({ property, size = "default", priority }: Props) {
  const {
    id,
    title,
    location,
    code,
    price,
    currency,
    bedrooms,
    bathrooms,
    area,
    image,
    has360,
    offMarket,
    priceOnRequest,
    vipTier,
  } = property

  return (
    <Link
      href={`/propiedades/${id}`}
      className="group block focus-visible:outline-none"
    >
      <article className="flex flex-col gap-4">
        {/* Image frame */}
        <div
          className={cn(
            "relative overflow-hidden rounded-none ring-1 ring-foreground/10 transition-all duration-500 group-hover:ring-[color:var(--luxe)]/40",
            size === "tall" ? "aspect-[3/4]" : "aspect-[5/6]",
          )}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={`${title} — ${location}`}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />

          {/* Corner frame marks */}
          <span
            className="pointer-events-none absolute left-3 top-3 size-3 border-l border-t border-[color:var(--luxe)]/70"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute right-3 top-3 size-3 border-r border-t border-[color:var(--luxe)]/70"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute bottom-3 left-3 size-3 border-b border-l border-[color:var(--luxe)]/70"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute bottom-3 right-3 size-3 border-b border-r border-[color:var(--luxe)]/70"
            aria-hidden
          />

          {/* Tier badge */}
          {vipTier && (
            <div className="absolute left-4 top-4 flex items-center gap-2 bg-black/30 px-3 py-1.5 text-[10px] font-medium tracking-[0.2em] text-white uppercase backdrop-blur-md">
              <span
                className="size-1 rounded-full bg-[color:var(--luxe)]"
                aria-hidden
              />
              {tierLabel[vipTier]}
            </div>
          )}

          {/* 360 badge */}
          {has360 && (
            <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/40 px-3 py-1.5 text-[10px] font-mono tracking-[0.18em] text-white uppercase backdrop-blur-md">
              <RotateCw className="size-3" strokeWidth={1.5} />
              Tour 360°
            </div>
          )}

          {/* Hover gradient */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </div>

        {/* Meta */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                {location} · {code}
              </p>
              <h3 className="font-display mt-1 text-[22px] leading-tight tracking-tight md:text-[26px]">
                {title}
              </h3>
            </div>
            <ArrowUpRight
              className="mt-2 size-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--luxe)]"
              strokeWidth={1.5}
            />
          </div>

          <div className="mt-4 flex items-end justify-between gap-4 border-t border-foreground/10 pt-4">
            <div className="flex items-center gap-4 font-mono text-[11px] tracking-wide text-muted-foreground tabular">
              <span className="inline-flex items-center gap-1">
                <BedDouble className="size-3.5" strokeWidth={1.5} />
                {bedrooms}
              </span>
              <span className="inline-flex items-center gap-1">
                <Bath className="size-3.5" strokeWidth={1.5} />
                {bathrooms}
              </span>
              <span className="inline-flex items-center gap-1">
                <Ruler className="size-3.5" strokeWidth={1.5} />
                {area} m²
              </span>
            </div>
            <p className="font-mono text-sm tracking-tight tabular">
              {offMarket || priceOnRequest ? (
                <span className="text-[color:var(--luxe)]">
                  Precio a consultar
                </span>
              ) : (
                formatPrice(price, currency)
              )}
            </p>
          </div>
        </div>
      </article>
    </Link>
  )
}
