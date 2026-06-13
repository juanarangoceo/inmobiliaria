import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { getProperties } from "@/lib/sanity/queries"
import type { Property } from "@/lib/properties"

type Territory = {
  slug: string
  name: string
  blurb: string
  regions: string[]
}

// Territorios editoriales (navegación aspiracional, no filtros).
const TERRITORIES: Territory[] = [
  {
    slug: "caribe",
    name: "Caribe",
    blurb: "Mar, murallas y luz.",
    regions: ["Bolívar", "Atlántico", "Magdalena", "Sucre", "Córdoba", "La Guajira", "Cesar"],
  },
  {
    slug: "antioquia",
    name: "Antioquia",
    blurb: "Montaña, ciudad y campo.",
    regions: ["Antioquia"],
  },
  {
    slug: "eje-cafetero",
    name: "Eje Cafetero",
    blurb: "Paisaje cultural cafetero.",
    regions: ["Quindío", "Caldas", "Risaralda"],
  },
  {
    slug: "valle-del-cauca",
    name: "Valle del Cauca",
    blurb: "Haciendas y clima de jardín.",
    regions: ["Valle del Cauca"],
  },
  {
    slug: "bogota",
    name: "Bogotá",
    blurb: "Altura, poder y cultura.",
    regions: ["Cundinamarca", "Bogotá", "Bogotá D.C."],
  },
]

export async function TerritoriosSection() {
  const all = await getProperties()
  if (all.length === 0) return null

  const blocks = TERRITORIES.map((t) => {
    const props = all.filter((p) => t.regions.includes(p.region ?? ""))
    return { ...t, count: props.length, cover: props[0] as Property | undefined }
  }).filter((b) => b.count > 0)

  if (blocks.length === 0) return null

  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-10 flex flex-col gap-6 border-b border-foreground/10 pb-8 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-foreground/30" aria-hidden />
              <span className="font-mono text-[11px] tracking-[0.24em] text-muted-foreground uppercase">
                Territorios · 02
              </span>
            </div>
            <h2 className="font-display text-balance text-4xl leading-[1.05] tracking-tight md:text-5xl">
              Dónde está{" "}
              <span className="italic text-muted-foreground">la colección</span>
            </h2>
          </div>
          <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground md:text-right">
            Una geografía curada del país. Cada región, su carácter.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {blocks.map((b, i) => (
            <Link
              key={b.slug}
              href={b.cover ? `/propiedades/${b.cover.id}` : "/coleccion"}
              className="group relative block aspect-[3/4] overflow-hidden rounded-lg bg-muted sm:aspect-[4/5]"
            >
              {b.cover?.image && (
                <Image
                  src={b.cover.image}
                  alt={b.name}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
              )}
              <div className="scrim-hero pointer-events-none absolute inset-0" aria-hidden />

              <div className="absolute inset-x-5 bottom-5">
                <span className="font-mono text-[11px] tracking-[0.2em] text-white/85 uppercase">
                  {b.count} {b.count === 1 ? "pieza" : "piezas"}
                </span>
                <h3 className="font-display mt-1 text-3xl leading-tight tracking-tight text-white md:text-4xl">
                  {b.name}
                </h3>
                <span className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-white/90">
                  {b.blurb}
                  <ArrowUpRight
                    className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.5}
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
