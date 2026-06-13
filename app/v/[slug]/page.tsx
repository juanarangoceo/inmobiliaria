import Image from "next/image"
import { notFound } from "next/navigation"
import { BedDouble, Bath, Maximize2, Car, MapPin, Phone, Mail } from "lucide-react"
import { formatPrice } from "@/lib/properties"
import {
  getVipLandingBySlug,
  getVipLandingSlugs,
} from "@/lib/sanity/queries"
import { ChatWindow } from "@/components/chat/chat-window"

type Params = { slug: string }

export async function generateStaticParams() {
  const slugs = await getVipLandingSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const landing = await getVipLandingBySlug(slug)
  if (!landing?.property)
    return { title: "Propiedad", robots: { index: false, follow: false } }
  const brand = landing.clientName ?? landing.property.title
  return {
    title: `${landing.property.title} · ${brand}`,
    description: landing.heroSubcopy ?? landing.property.tagline,
    // Landing privada white-label: no se indexa (contenido duplicado + privado)
    robots: { index: false, follow: false },
  }
}

export default async function VipLandingPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const landing = await getVipLandingBySlug(slug)
  if (!landing?.property) notFound()

  const p = landing.property
  const accent = landing.brandColor || "#0F5132"
  const priceLabel = p.priceOnRequest
    ? "Precio a consultar"
    : formatPrice(p.price, p.currency)

  return (
    <main className="min-h-dvh bg-background text-foreground">
      {/* Barra de marca del cliente */}
      <header className="flex items-center justify-between px-6 py-5 md:px-10">
        <div className="flex items-center gap-3">
          {landing.clientLogo ? (
            <Image
              src={landing.clientLogo}
              alt={landing.clientName ?? "Logo"}
              width={120}
              height={40}
              className="h-9 w-auto object-contain"
            />
          ) : (
            <span className="font-display text-lg tracking-tight">
              {landing.clientName ?? p.agent.name}
            </span>
          )}
        </div>
        {(landing.contactPhone || landing.contactWhatsapp) && (
          <a
            href={`tel:${landing.contactPhone ?? landing.contactWhatsapp}`}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white"
            style={{ backgroundColor: accent }}
          >
            <Phone className="size-4" strokeWidth={1.6} />
            Contactar
          </a>
        )}
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[21/9]">
          <Image
            src={p.image}
            alt={p.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-8 md:px-10 md:pb-12">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.28em]"
              style={{ color: accent }}
            >
              {landing.clientName ?? "Propiedad exclusiva"}
            </p>
            <h1 className="font-display mt-3 max-w-3xl text-balance text-4xl leading-[1.02] tracking-tight text-white md:text-6xl">
              {landing.heroHeadline ?? p.title}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-sm text-white/80">
              <MapPin className="size-4" strokeWidth={1.5} />
              {p.location} · {p.city}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-12 md:grid-cols-[1.6fr_1fr] md:px-10 md:py-16">
        {/* Columna principal */}
        <div>
          {landing.heroSubcopy && (
            <p className="font-display text-2xl leading-snug tracking-tight text-balance md:text-3xl">
              {landing.heroSubcopy}
            </p>
          )}

          {/* Specs */}
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-foreground/10 bg-foreground/10 sm:grid-cols-4">
            {[
              { icon: BedDouble, k: "Habitaciones", v: p.bedrooms },
              { icon: Bath, k: "Baños", v: p.bathrooms },
              { icon: Maximize2, k: "Área", v: `${p.area} m²` },
              { icon: Car, k: "Parqueaderos", v: p.parking },
            ].map((s) => {
              const Icon = s.icon
              return (
                <div key={s.k} className="bg-background px-4 py-5">
                  <Icon className="size-5 text-muted-foreground" strokeWidth={1.25} />
                  <dd className="font-display mt-3 text-xl tracking-tight">{s.v}</dd>
                  <dt className="font-mono mt-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {s.k}
                  </dt>
                </div>
              )
            })}
          </dl>

          {/* Precio */}
          <div className="mt-8 flex items-baseline justify-between border-y border-foreground/10 py-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Valor
            </span>
            <span className="font-display text-3xl tracking-tight md:text-4xl">
              {priceLabel}
            </span>
          </div>

          {/* Descripción */}
          {p.description.length > 0 && (
            <div className="mt-10 space-y-5">
              {p.description.map((para, i) => (
                <p key={i} className="text-base leading-relaxed text-foreground/80">
                  {para}
                </p>
              ))}
            </div>
          )}

          {/* Características */}
          {p.features.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-2">
              {p.features.map((f) => (
                <li
                  key={f}
                  className="rounded-full border border-foreground/15 px-4 py-2 text-xs font-medium"
                >
                  {f}
                </li>
              ))}
            </ul>
          )}

          {/* Galería */}
          {p.gallery.length > 1 && (
            <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">
              {p.gallery.slice(1).map((src, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={src}
                    alt={`${p.title} ${i + 2}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Columna lateral: chat + contacto (sticky) */}
        <aside className="md:sticky md:top-8 md:self-start">
          <div className="h-[520px] overflow-hidden rounded-2xl border border-foreground/10 bg-card shadow-sm">
            <ChatWindow
              landingSlug={slug}
              accent={accent}
              assistantName={landing.chatbotName || "Asistente"}
              assistantTagline="Pregúntame sobre esta propiedad"
              greeting={`Hola, soy el asistente de esta propiedad. Puedo contarte todo sobre ${p.title}: características, precio, ubicación y el proceso de compra. ¿Qué te gustaría saber?`}
              suggestions={[
                "¿Cuál es el precio?",
                "¿Qué incluye la propiedad?",
                "¿Cómo agendo una visita?",
              ]}
            />
          </div>

          {(landing.contactName ||
            landing.contactPhone ||
            landing.contactEmail) && (
            <div className="mt-4 rounded-2xl border border-foreground/10 bg-background p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Contacto directo
              </p>
              {landing.contactName && (
                <p className="font-display mt-2 text-lg tracking-tight">
                  {landing.contactName}
                </p>
              )}
              <div className="mt-3 space-y-2 text-sm">
                {landing.contactPhone && (
                  <a
                    href={`tel:${landing.contactPhone}`}
                    className="flex items-center gap-2 text-foreground/80 hover:text-foreground"
                  >
                    <Phone className="size-4" strokeWidth={1.5} />
                    {landing.contactPhone}
                  </a>
                )}
                {landing.contactEmail && (
                  <a
                    href={`mailto:${landing.contactEmail}`}
                    className="flex items-center gap-2 text-foreground/80 hover:text-foreground"
                  >
                    <Mail className="size-4" strokeWidth={1.5} />
                    {landing.contactEmail}
                  </a>
                )}
              </div>
            </div>
          )}
        </aside>
      </div>

      <footer className="border-t border-foreground/10 px-6 py-8 text-center md:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {landing.clientName ?? p.agent.name}
        </p>
      </footer>
    </main>
  )
}
