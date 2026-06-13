import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { getProperties } from "@/lib/sanity/queries"

export async function HeroSection() {
  const properties = await getProperties()
  const count = properties.length
  const cover = properties[0] ?? null

  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-36 md:pb-28">
      {/* Ambient background (fallback) */}
      {!cover && (
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80" />
          <div className="absolute top-0 right-0 hidden h-[580px] w-[52%] overflow-hidden opacity-90 md:block">
            <Image
              src="/properties/hero-ambient.jpg"
              alt=""
              fill
              priority
              sizes="52vw"
              className="object-cover grayscale-[20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/40 to-background" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16">
          {/* Editorial copy */}
          <div className="md:col-span-6">
            {/* Eyebrow */}
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-8 bg-foreground/30" aria-hidden />
              <span className="font-mono text-[11px] tracking-[0.24em] text-muted-foreground uppercase">
                Ed. {new Date().getFullYear()} · Vol. IV
              </span>
            </div>

            <h1 className="font-display text-balance text-5xl leading-[1.02] tracking-tight text-foreground md:text-7xl lg:text-[84px]">
              Propiedades que merecen{" "}
              <span className="italic text-muted-foreground">contarse.</span>
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Una colección curada de inmuebles en venta en Colombia, presentados
              con criterio editorial. Acceso libre; admisión a la colección por
              curaduría.
            </p>

            {/* CTA dual */}
            <div className="mt-10 flex flex-wrap items-center gap-4 md:mt-12">
              <Link
                href="#destacadas"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Ver propiedades
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </Link>
              <Link
                href="/publicar"
                className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase">
                  Publicar la mía
                </span>
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            </div>

            {/* Honest collection line */}
            <p className="mt-10 border-t border-foreground/10 pt-8 font-mono text-[12px] leading-relaxed tracking-[0.18em] text-muted-foreground uppercase md:mt-12">
              Colección curada · {count}{" "}
              {count === 1 ? "pieza activa" : "piezas activas"} · Admisión por
              curaduría
            </p>
          </div>

          {/* Cover property — full editorial portrait */}
          {cover && (
            <div className="md:col-span-6">
              <Link
                href={`/propiedades/${cover.id}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-lg bg-muted"
              >
                <Image
                  src={cover.image || "/placeholder.svg"}
                  alt={`${cover.title} · ${cover.location}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                />
                {/* Standard hero scrim */}
                <div
                  className="scrim-hero pointer-events-none absolute inset-0"
                  aria-hidden
                />
                {cover.code && (
                  <span className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.2em] text-white/80 uppercase">
                    {cover.code}
                  </span>
                )}
                <div className="absolute inset-x-5 bottom-5">
                  <h2 className="font-display text-2xl leading-tight tracking-tight text-white md:text-3xl">
                    {cover.title}
                  </h2>
                  {cover.tagline && (
                    <p className="mt-1.5 max-w-md text-sm leading-relaxed text-white/90">
                      {cover.tagline}
                    </p>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.18em] text-white/90 uppercase">
                    {cover.location}
                    <ArrowUpRight
                      className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.5}
                    />
                  </span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
