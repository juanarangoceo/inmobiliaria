import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MobileTabBar } from "@/components/mobile-tab-bar"
import { PropertyCard } from "@/components/property-card"
import { WaitlistForm } from "@/components/waitlist-form"
import { getProperties } from "@/lib/sanity/queries"

export const metadata = {
  title: "La colección",
  description:
    "La colección completa de propiedades en venta curadas por Vision Estate Colombia.",
  alternates: { canonical: "/coleccion" },
}

export default async function ColeccionPage() {
  const properties = await getProperties()

  return (
    <main className="relative min-h-screen bg-background">
      <SiteHeader />

      <section className="mx-auto max-w-[1400px] px-6 pt-28 pb-10 md:pt-36">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-[color:var(--luxe-ink)]" aria-hidden />
          <span className="font-mono text-[11px] tracking-[0.3em] text-[color:var(--luxe-ink)] uppercase">
            Colección · {properties.length}{" "}
            {properties.length === 1 ? "pieza" : "piezas"}
          </span>
        </div>
        <h1 className="mt-6 font-display text-balance text-4xl leading-[1.05] tracking-tight md:text-6xl">
          La colección
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
          Propiedades en venta curadas, una a una. Admisión por curaduría.
        </p>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-16">
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((p, i) => (
              <PropertyCard key={p.id} property={p} priority={i < 2} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Pronto publicaremos las primeras piezas de la colección.
          </p>
        )}
      </section>

      {/* Captura de demanda */}
      <section className="border-t border-foreground/10 bg-secondary/30">
        <div className="mx-auto max-w-[820px] px-6 py-16 text-center md:py-20">
          <h2 className="font-display text-balance text-3xl leading-tight tracking-tight md:text-4xl">
            ¿No ves lo que buscas todavía?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
            Déjanos tu correo y te avisamos cuando entre a la colección una
            propiedad similar a lo que buscas.
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <WaitlistForm
              source="coleccion"
              cta="Recibir propiedades similares"
              compact
            />
          </div>
        </div>
      </section>

      <SiteFooter />
      <div className="h-24 md:h-0" aria-hidden />
      <MobileTabBar />
    </main>
  )
}
