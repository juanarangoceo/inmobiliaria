"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { BedDouble, Bath, Maximize2, Heart, ShieldCheck, Sparkles, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatPrice, type Property } from "@/lib/properties"

function StatusChip({ status, label }: { status: Property["status"]; label?: string }) {
  const styles: Record<Property["status"], string> = {
    "ai-verified":
      "bg-background/70 text-foreground border-foreground/10",
    premium:
      "bg-foreground text-background border-transparent",
    exclusive:
      "bg-primary text-primary-foreground border-transparent",
    new: "bg-background/70 text-foreground border-foreground/10",
  }

  const Icon =
    status === "ai-verified"
      ? ShieldCheck
      : status === "premium" || status === "exclusive"
        ? Sparkles
        : null

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] uppercase backdrop-blur-md",
        styles[status],
      )}
    >
      {Icon ? <Icon className="size-3" strokeWidth={1.75} /> : null}
      {label ?? status}
    </span>
  )
}

export function PropertyCard({
  property,
  priority,
}: {
  property: Property
  priority?: boolean
}) {
  const [liked, setLiked] = useState(false)

  return (
    <article className="group relative flex flex-col">
      <Link
        href={`/propiedades/${property.id}`}
        className="relative block aspect-[4/5] overflow-hidden rounded-lg bg-muted md:aspect-[4/3]"
      >
        <Image
          src={property.image || "/placeholder.svg"}
          alt={`${property.title} en ${property.location}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
        />

        {/* Scrim estándar de card (legibilidad de chip y código) */}
        <div
          className="scrim-card pointer-events-none absolute inset-0"
          aria-hidden
        />

        {/* Top-left chip */}
        <div className="absolute top-3 left-3">
          <StatusChip status={property.status} label={property.badge} />
        </div>

        {/* Top-right favorite */}
        <button
          type="button"
          aria-label={liked ? "Quitar de favoritos" : "Agregar a favoritos"}
          aria-pressed={liked}
          onClick={(e) => {
            e.preventDefault()
            setLiked((v) => !v)
          }}
          className="glass absolute top-3 right-3 flex size-9 items-center justify-center rounded-full border border-white/20 text-white transition-transform hover:scale-105"
        >
          <Heart
            className={cn("size-4 transition-all", liked && "fill-current")}
            strokeWidth={1.5}
          />
        </button>

        {/* Code bottom-right */}
        <div className="absolute right-3 bottom-3 font-mono text-[10px] tracking-[0.2em] text-white/80 uppercase">
          {property.code}
        </div>
      </Link>

      {/* Content */}
      <div className="mt-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-display text-xl leading-tight tracking-tight text-balance">
              {property.title}
            </h3>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="size-3" strokeWidth={1.5} />
              <span className="truncate">
                {property.location} · {property.city}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="tabular font-mono text-sm font-medium tracking-tight text-foreground">
              {property.priceOnRequest
                ? "A consultar"
                : formatPrice(property.price, property.currency)}
            </div>
            <div className="text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
              venta
            </div>
          </div>
        </div>

        {/* Specs */}
        <dl className="flex items-center gap-5 border-t border-foreground/10 pt-3 font-mono text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <BedDouble className="size-3.5" strokeWidth={1.5} />
            <dt className="sr-only">Habitaciones</dt>
            <dd className="tabular">{property.bedrooms}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="size-3.5" strokeWidth={1.5} />
            <dt className="sr-only">Baños</dt>
            <dd className="tabular">{property.bathrooms}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 className="size-3.5" strokeWidth={1.5} />
            <dt className="sr-only">Área</dt>
            <dd className="tabular">{property.area} m²</dd>
          </div>
          <div className="ml-auto font-mono text-[10px] tracking-[0.14em] uppercase">
            {property.type}
          </div>
        </dl>
      </div>
    </article>
  )
}
