import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowUpRight,
  BedDouble,
  Bath,
  Maximize2,
  Car,
  CalendarDays,
  MapPin,
  Heart,
  Share2,
  Sparkles,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MobileTabBar } from "@/components/mobile-tab-bar"
import { PropertyGallery } from "@/components/property-gallery"
import { PropertyCard } from "@/components/property-card"
import { WaitlistForm } from "@/components/waitlist-form"
import { formatPrice } from "@/lib/properties"
import {
  getProperties,
  getPropertyBySlug,
  getPropertySlugs,
  getVipLandingSlugForPropertySlug,
} from "@/lib/sanity/queries"
import {
  propertyToJsonLd,
  breadcrumbJsonLd,
  jsonLdScript,
} from "@/lib/seo/jsonld"

type Params = { id: string }

export async function generateStaticParams() {
  const slugs = await getPropertySlugs()
  return slugs.map((id) => ({ id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}) {
  const { id } = await params
  const property = await getPropertyBySlug(id)
  if (!property) return { title: "Inmueble" }
  const title = property.seoTitle || `${property.title} · ${property.location}`
  const description =
    property.seoDescription || property.tagline || property.description[0]
  return {
    title,
    description,
    alternates: { canonical: `/propiedades/${property.id}` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `/propiedades/${property.id}`,
      images: property.image ? [property.image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: property.image ? [property.image] : undefined,
    },
  }
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { id } = await params
  const property = await getPropertyBySlug(id)
  if (!property) notFound()

  // Presentación privada (landing white-label) si la propiedad VIP tiene una.
  const vipLandingSlug = property.isVip
    ? await getVipLandingSlugForPropertySlug(id)
    : null

  const related = (await getProperties())
    .filter((p) => p.id !== property.id)
    .slice(0, 3)

  return (
    <main className="relative min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(propertyToJsonLd(property))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(property))}
      />
      <SiteHeader />

      {/* Breadcrumb / return */}
      <div className="mx-auto max-w-[1400px] px-6 pt-24 md:pt-32">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" strokeWidth={1.5} />
          <span className="font-mono tracking-[0.14em] uppercase">
            Volver al catálogo
          </span>
        </Link>
      </div>

      {/* Title block */}
      <section className="mx-auto max-w-[1400px] px-6 pt-6 pb-8 md:pt-10 md:pb-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-background px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] uppercase">
                {property.status === "ai-verified" ? (
                  <ShieldCheck className="size-3" strokeWidth={1.75} />
                ) : (
                  <Sparkles className="size-3" strokeWidth={1.75} />
                )}
                {property.badge}
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                {property.code} · {property.type}
              </span>
            </div>
            <h1 className="mt-5 font-display text-5xl leading-[1.02] tracking-tight text-balance md:text-7xl">
              {property.title}
            </h1>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4" strokeWidth={1.5} />
              <span>
                {property.location} · {property.city}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                Precio venta
              </p>
              <p className="tabular mt-1 font-display text-4xl tracking-tight md:text-5xl">
                {property.priceOnRequest
                  ? "A consultar"
                  : formatPrice(property.price, property.currency)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2.5 text-xs font-medium hover:border-foreground/40"
              >
                <Heart className="size-3.5" strokeWidth={1.5} />
                Guardar
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2.5 text-xs font-medium hover:border-foreground/40"
              >
                <Share2 className="size-3.5" strokeWidth={1.5} />
                Compartir
              </button>
            </div>
            {vipLandingSlug && (
              <a
                href={`/v/${vipLandingSlug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-[color:var(--luxe-ink)]"
              >
                <Sparkles className="size-3.5 text-[color:var(--luxe-ink)]" strokeWidth={1.5} />
                <span className="font-mono tracking-[0.18em] uppercase">
                  Ver presentación privada
                </span>
                <ArrowUpRight
                  className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <PropertyGallery images={property.gallery} alt={property.title} />

      {/* Specs strip */}
      <section className="mx-auto max-w-[1400px] px-6 pt-12 md:pt-16">
        <dl className="grid grid-cols-2 border-y border-foreground/10 md:grid-cols-5">
          {[
            { icon: BedDouble, k: "Recámaras", v: property.bedrooms },
            { icon: Bath, k: "Baños", v: property.bathrooms },
            { icon: Maximize2, k: "Superficie", v: `${property.area} m²` },
            { icon: Car, k: "Estac.", v: property.parking },
            { icon: CalendarDays, k: "Año", v: property.year },
          ].map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.k}
                className="flex items-center gap-4 border-r border-foreground/10 px-4 py-5 last:border-r-0 md:py-6"
              >
                <Icon
                  className="size-5 flex-shrink-0 text-muted-foreground"
                  strokeWidth={1.25}
                />
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                    {s.k}
                  </dt>
                  <dd className="tabular mt-1 font-display text-xl tracking-tight">
                    {s.v}
                  </dd>
                </div>
              </div>
            )
          })}
        </dl>
      </section>

      {/* Editorial body + Sidebar */}
      <section className="mx-auto max-w-[1400px] px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-[1.5fr_1fr] md:gap-20">
          {/* Narrative */}
          <article>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-foreground/30" aria-hidden />
              <span className="font-mono text-[11px] tracking-[0.24em] text-muted-foreground uppercase">
                Nota editorial
              </span>
            </div>
            <p className="font-display text-3xl leading-tight tracking-tight text-balance md:text-4xl">
              {property.tagline}
            </p>

            <div className="mt-10 space-y-6">
              {property.description.map((p, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-foreground/80"
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Features */}
            <div className="mt-16 border-t border-foreground/10 pt-10">
              <h2 className="font-mono text-[11px] tracking-[0.24em] text-muted-foreground uppercase">
                Características
              </h2>
              <ul className="mt-6 grid grid-cols-1 gap-0 sm:grid-cols-2">
                {property.features.map((f, i) => (
                  <li
                    key={f}
                    className={`flex items-center gap-3 py-3 text-sm border-foreground/10 ${
                      i % 2 === 0 ? "sm:border-r sm:pr-6" : "sm:pl-6"
                    } ${i >= 2 ? "border-t" : ""}`}
                  >
                    <span className="size-1 rounded-full bg-foreground/50" aria-hidden />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Amenities */}
            <div className="mt-16 border-t border-foreground/10 pt-10">
              <h2 className="font-mono text-[11px] tracking-[0.24em] text-muted-foreground uppercase">
                Amenidades
              </h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {property.amenities.map((a) => (
                  <li
                    key={a}
                    className="rounded-full border border-foreground/15 bg-background px-4 py-2 text-xs font-medium"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            {/* Location placeholder */}
            <div className="mt-16 border-t border-foreground/10 pt-10">
              <h2 className="font-mono text-[11px] tracking-[0.24em] text-muted-foreground uppercase">
                Ubicación
              </h2>
              <div className="relative mt-6 aspect-[21/9] overflow-hidden rounded-xl border border-foreground/10 bg-secondary/60">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--foreground)_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.04]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin
                      className="mx-auto size-6 text-foreground/60"
                      strokeWidth={1.25}
                    />
                    <p className="mt-3 font-display text-xl tracking-tight">
                      {property.location}
                    </p>
                    <p className="mt-1 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                      {property.coordinates}
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Ubicación aproximada. Coordenadas exactas disponibles tras
                agendar una visita.
              </p>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="md:sticky md:top-28 md:self-start">
            {/* Agent card */}
            <div className="rounded-2xl border border-foreground/10 bg-card p-6 md:p-8">
              <div className="flex items-center gap-4">
                <div className="flex size-14 items-center justify-center rounded-full bg-foreground font-display text-lg tracking-tight text-background">
                  {property.agent.initials}
                </div>
                <div>
                  <p className="font-display text-lg tracking-tight">
                    {property.agent.name}
                  </p>
                  <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                    {property.agent.role}
                  </p>
                </div>
              </div>

              {property.isSimulated ? (
                <div className="mt-8 scroll-mt-24" id="ficha-cta">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                    Acceso a la colección
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Déjanos tu correo y te damos acceso anticipado y
                    propiedades similares de la colección.
                  </p>
                  <div className="mt-5">
                    <WaitlistForm
                      source="ficha"
                      propertyRef={property.id}
                      cta="Solicitar acceso anticipado"
                    />
                  </div>
                </div>
              ) : (
                <form className="mt-8 space-y-3 scroll-mt-24" id="ficha-cta">
                  <label className="flex flex-col gap-1.5">
                    <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                      Nombre
                    </span>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      className="h-11 rounded-md border border-foreground/15 bg-background px-3 text-sm focus:border-foreground/40 focus:outline-none"
                    />
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex flex-col gap-1.5">
                      <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                        Email
                      </span>
                      <input
                        type="email"
                        placeholder="tu@email.com"
                        className="h-11 rounded-md border border-foreground/15 bg-background px-3 text-sm focus:border-foreground/40 focus:outline-none"
                      />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                        Teléfono
                      </span>
                      <input
                        type="tel"
                        placeholder="+57"
                        className="h-11 rounded-md border border-foreground/15 bg-background px-3 text-sm focus:border-foreground/40 focus:outline-none"
                      />
                    </label>
                  </div>
                  <label className="flex flex-col gap-1.5">
                    <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                      Mensaje
                    </span>
                    <textarea
                      rows={3}
                      defaultValue={`Hola, me interesa ${property.title} (${property.code}). ¿Podemos coordinar una visita?`}
                      className="rounded-md border border-foreground/15 bg-background p-3 text-sm focus:border-foreground/40 focus:outline-none"
                    />
                  </label>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background hover:opacity-90"
                  >
                    Agendar visita privada
                    <ArrowUpRight className="size-4" strokeWidth={1.5} />
                  </button>
                </form>
              )}
            </div>

            {/* Verificación por curaduría */}
            <div className="mt-6 rounded-2xl border border-foreground/10 bg-background p-6">
              <div className="flex items-center gap-2">
                <ShieldCheck
                  className="size-4 text-foreground/70"
                  strokeWidth={1.5}
                />
                <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                  Verificado por curaduría
                </p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Cada propiedad de la colección pasa por revisión y aprobación
                manual de nuestro equipo antes de publicarse. Solo venta, sin
                ruido.
              </p>
            </div>

            {/* Services cross-sell */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-[color:var(--luxe)]/25 bg-foreground text-background">
              <div className="p-6 md:p-7">
                <div className="flex items-center gap-3">
                  <span
                    className="h-px w-6 bg-[color:var(--luxe)]"
                    aria-hidden
                  />
                  <span className="font-mono text-[10px] tracking-[0.22em] text-[color:var(--luxe)] uppercase">
                    Vision Estate · Asesoría
                  </span>
                </div>
                <p className="font-display mt-4 text-balance text-[22px] leading-snug tracking-tight md:text-2xl">
                  ¿Considera{" "}
                  <span className="italic text-[color:var(--luxe)]">vender</span>{" "}
                  una propiedad similar?
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-background/70">
                  Nuestro equipo representa operaciones de alto valor bajo
                  mandato exclusivo. Intermediación discreta, producción
                  editorial y red privada de compradores verificados.
                </p>
                <Link
                  href="/servicios"
                  className="group mt-6 inline-flex items-center gap-2 text-xs text-[color:var(--luxe)] transition-colors hover:text-white"
                >
                  <span className="font-mono tracking-[0.22em] uppercase">
                    Conocer la asesoría
                  </span>
                  <ArrowUpRight
                    className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.5}
                  />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-[1400px] px-6 pb-16 md:pb-24">
        <div className="flex items-end justify-between gap-4 border-b border-foreground/10 pb-8">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-foreground/30" aria-hidden />
              <span className="font-mono text-[11px] tracking-[0.24em] text-muted-foreground uppercase">
                También podría gustarte
              </span>
            </div>
            <h2 className="font-display text-3xl leading-tight tracking-tight md:text-4xl">
              Piezas similares de la colección
            </h2>
          </div>
          <Link
            href="/"
            className="hidden items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            <span className="font-mono tracking-[0.2em] uppercase">
              Ver catálogo
            </span>
            <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>

      <SiteFooter />
      <div className="h-32 md:h-0" aria-hidden />

      {/* CTA sticky (solo móvil, sobre la tab bar): un único CTA primario */}
      <div className="fixed inset-x-0 bottom-[5.25rem] z-40 px-4 md:hidden">
        <a
          href="#ficha-cta"
          className="mx-auto flex max-w-sm items-center justify-between gap-3 rounded-full bg-foreground px-5 py-3.5 text-background shadow-2xl shadow-black/20"
        >
          <span className="min-w-0">
            <span className="block truncate font-display text-sm tracking-tight">
              {property.priceOnRequest
                ? "Precio a consultar"
                : formatPrice(property.price, property.currency)}
            </span>
          </span>
          <span className="inline-flex flex-shrink-0 items-center gap-1.5 text-xs font-medium">
            {property.isSimulated ? "Solicitar acceso" : "Agendar visita"}
            <ArrowUpRight className="size-4" strokeWidth={1.5} />
          </span>
        </a>
      </div>

      <MobileTabBar />
    </main>
  )
}
