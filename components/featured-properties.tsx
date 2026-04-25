import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { PROPERTIES } from "@/lib/properties"
import { PropertyCard } from "@/components/property-card"

export function FeaturedProperties() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Header */}
        <div className="flex flex-col gap-6 border-b border-foreground/10 pb-8 md:flex-row md:items-end md:justify-between md:pb-10">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-foreground/30" aria-hidden />
              <span className="font-mono text-[11px] tracking-[0.24em] text-muted-foreground uppercase">
                Selección editorial · 01
              </span>
            </div>
            <h2 className="font-display text-balance text-4xl leading-[1.05] tracking-tight md:text-5xl">
              Propiedades destacadas{" "}
              <span className="italic text-muted-foreground">
                de la semana
              </span>
            </h2>
          </div>
          <Link
            href="/vip"
            className="group inline-flex items-center gap-2 self-start text-sm text-foreground transition-colors hover:text-[color:var(--luxe)] md:self-end"
          >
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase">
              Ver Colección VIP
            </span>
            <ArrowUpRight
              className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.5}
            />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 pt-10 sm:grid-cols-2 lg:grid-cols-3 md:pt-14">
          {PROPERTIES.slice(0, 3).map((p, i) => (
            <PropertyCard key={p.id} property={p} priority={i === 0} />
          ))}
        </div>

        {/* Editorial footer row */}
        <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 md:mt-20 md:grid-cols-2">
          <div className="lg:col-span-1">
            <PropertyCard property={PROPERTIES[3]} />
          </div>
          <div className="flex flex-col justify-end">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-[color:var(--luxe)]/60" aria-hidden />
              <span className="font-mono text-[11px] tracking-[0.24em] text-[color:var(--luxe)] uppercase">
                Colección Privada · VIP
              </span>
            </div>
            <p className="font-display text-balance text-3xl leading-tight tracking-tight md:text-4xl">
              Propiedades fuera de mercado, recorridos 360° y concierge IA
              disponible al instante.
            </p>
            <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              Visitar la colección es gratuito. La publicación es privada y
              sujeta a curaduría, reservada a propietarios dispuestos a invertir
              en una presentación a la altura del inmueble.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Link
                href="/vip"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Entrar a la colección
                <ArrowUpRight className="size-4" strokeWidth={1.5} />
              </Link>
              <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                Acceso libre
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
