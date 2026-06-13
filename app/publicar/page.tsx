import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRight,
  Check,
  Camera,
  RotateCw,
  Sparkles,
  ShieldCheck,
  Phone,
  FileSignature,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MobileTabBar } from "@/components/mobile-tab-bar"

export const metadata = {
  title: "Publica tu propiedad",
  description:
    "Publica gratis tras curaduría, o accede al tier VIP: landing privada propia, chatbot que conoce el inmueble y producción editorial. Solo venta, Colombia.",
}

type Tier = {
  id: string
  name: string
  kicker: string
  price: string
  priceStrike?: string
  priceNote?: string
  tagline: string
  included: string[]
  excluded: string[]
  featured?: boolean
  cta: { label: string; href: string }
}

const TIERS: Tier[] = [
  {
    id: "gratuito",
    name: "Gratuito",
    kicker: "Publica tu propiedad",
    price: "Sin costo",
    priceNote: "siempre",
    tagline:
      "Sube tu inmueble desde la web. Nuestro equipo lo revisa y, si encaja con la colección, lo publica. Sin intermediarios.",
    included: [
      "Publicación en el portal tras curaduría",
      "Ficha editorial con tus fotografías",
      "Contacto directo de compradores",
      "Revisión y aprobación manual por nuestro equipo",
    ],
    excluded: [
      "Landing privada white-label",
      "Chatbot IA dedicado",
      "Producción editorial",
    ],
    cta: { label: "Publicar gratis", href: "/publicar/propiedad" },
  },
  {
    id: "vip",
    name: "VIP",
    kicker: "Colección inaugural",
    price: "Sin costo durante la colección inaugural",
    priceStrike: "$180.000 COP",
    priceNote: "por publicación",
    tagline:
      "Una presentación a la altura del inmueble: una URL privada propia (sin nuestra marca), un chatbot que conoce la propiedad y distribución dirigida.",
    included: [
      "Todo lo del plan Gratuito",
      "Landing privada white-label · URL propia",
      "Chatbot IA que conoce el inmueble · 24/7",
      "Producción y narrativa editorial",
      "Distribución dirigida a compradores",
    ],
    excluded: [],
    featured: true,
    cta: { label: "Solicitar acceso VIP", href: "#solicitud" },
  },
]

const PRODUCTION = [
  {
    icon: Camera,
    t: "Producción editorial",
    d: "Tratamos cada inmueble como una pieza editorial: fotografía cuidada y una narrativa que cuenta la historia de la propiedad, no una ficha clasificada.",
  },
  {
    icon: RotateCw,
    t: "Recorrido 360°",
    d: "Capturamos la propiedad en alta resolución para que el comprador la recorra desde su pantalla, con medidas y anotaciones.",
  },
  {
    icon: Sparkles,
    t: "Concierge IA dedicado",
    d: "El chatbot de tu landing conoce los detalles exactos del inmueble y responde consultas 24/7 con precisión.",
  },
  {
    icon: Phone,
    t: "Landing privada propia",
    d: "Una URL white-label sin nuestra marca, pensada para compartir por WhatsApp con compradores y aliados.",
  },
  {
    icon: ShieldCheck,
    t: "Verificación previa",
    d: "Antes de publicar revisamos la información del inmueble. Cada listado lleva el sello de curaduría de Vision Estate.",
  },
  {
    icon: FileSignature,
    t: "Acompañamiento de venta",
    d: "La operación se gestiona con nuestra agencia aliada, Colombia Inmobiliaria, que acompaña el proceso hasta el cierre.",
  },
]

export default function PublicarPage() {
  return (
    <main className="relative bg-background text-foreground">
      <SiteHeader />

      {/* ============ HERO ============ */}
      <section className="relative min-h-[92vh] overflow-hidden pt-28 md:min-h-screen md:pt-36">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 pb-20 md:grid-cols-12 md:gap-16 md:pb-28">
          <div className="flex flex-col justify-center md:col-span-6">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[color:var(--luxe)]" aria-hidden />
              <span className="font-mono text-[11px] tracking-[0.32em] text-[color:var(--luxe-ink)] uppercase">
                Publica en Vision Estate Colombia
              </span>
            </div>

            <h1 className="mt-6 font-display text-balance text-[44px] leading-[0.98] tracking-tight md:text-[84px] lg:text-[96px]">
              Publique con la misma{" "}
              <span className="italic text-muted-foreground">sobriedad</span>{" "}
              con la que construyó.
            </h1>

            <p className="mt-8 max-w-lg text-pretty text-[15px] leading-relaxed text-muted-foreground md:text-base">
              Sube tu propiedad gratis y, tras curaduría, la publicamos. Si quieres
              una presentación a otro nivel, el tier VIP te da una landing privada
              propia y un chatbot que conoce el inmueble.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/publicar/propiedad"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Publicar gratis
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </Link>
              <Link
                href="#planes"
                className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase">
                  Comparar Gratuito y VIP
                </span>
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            </div>

            <p className="mt-14 border-t border-foreground/10 pt-10 font-mono text-[11px] leading-relaxed tracking-[0.2em] text-muted-foreground uppercase">
              Solo venta · Admisión por curaduría · La aprobación es siempre
              manual
            </p>
          </div>

          <div className="relative md:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/landings/publicar-vip.jpg"
                alt="Propiedad presentada por Vision Estate"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute left-4 top-4 size-4 border-l border-t border-[color:var(--luxe)]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute right-4 top-4 size-4 border-r border-t border-[color:var(--luxe)]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-4 left-4 size-4 border-b border-l border-[color:var(--luxe)]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-4 right-4 size-4 border-b border-r border-[color:var(--luxe)]"
              />

              <div className="absolute inset-x-6 bottom-6 flex items-center justify-between bg-black/35 px-4 py-3 font-mono text-[10px] tracking-[0.22em] text-white uppercase backdrop-blur-md">
                <span className="inline-flex items-center gap-2">
                  <span
                    className="size-1.5 rounded-full bg-[color:var(--luxe)]"
                    aria-hidden
                  />
                  Colección inaugural
                </span>
                <span>Colombia · 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TIERS ============ */}
      <section id="planes" className="relative bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:py-28">
          <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="h-px w-8 bg-[color:var(--luxe)]/70"
                  aria-hidden
                />
                <span className="font-mono text-[11px] tracking-[0.24em] text-[color:var(--luxe-ink)] uppercase">
                  Dos formas de publicar · 01
                </span>
              </div>
              <h2 className="font-display max-w-2xl text-balance text-4xl leading-[1.05] tracking-tight md:text-[56px]">
                Gratuito o VIP. Tú eliges la escala.
              </h2>
            </div>
            <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground md:text-right">
              Ambos pasan por curaduría y aprobación manual. La diferencia está en
              la presentación: el VIP suma landing privada propia, chatbot
              dedicado y producción editorial.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden border border-foreground/10 bg-foreground/10 md:grid-cols-2">
            {TIERS.map((tier) => (
              <article
                key={tier.id}
                className={
                  tier.featured
                    ? "relative flex flex-col bg-foreground p-8 text-background md:p-10"
                    : "relative flex flex-col bg-background p-8 md:p-10"
                }
              >
                <div className="flex items-center justify-between">
                  <span
                    className={
                      tier.featured
                        ? "font-mono text-[10px] tracking-[0.22em] text-[color:var(--luxe)] uppercase"
                        : "font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase"
                    }
                  >
                    {tier.kicker}
                  </span>
                  {tier.featured && (
                    <span className="flex size-6 items-center justify-center rounded-full bg-[color:var(--luxe)]/15 ring-1 ring-[color:var(--luxe)]/40">
                      <Sparkles
                        className="size-3 text-[color:var(--luxe)]"
                        strokeWidth={1.75}
                      />
                    </span>
                  )}
                </div>

                <h3 className="font-display mt-6 text-3xl leading-tight tracking-tight md:text-[38px]">
                  {tier.name}
                </h3>

                <p
                  className={
                    tier.featured
                      ? "mt-4 text-sm leading-relaxed text-background/70"
                      : "mt-4 text-sm leading-relaxed text-muted-foreground"
                  }
                >
                  {tier.tagline}
                </p>

                <div
                  className={
                    tier.featured
                      ? "mt-8 border-t border-white/15 pt-6"
                      : "mt-8 border-t border-foreground/10 pt-6"
                  }
                >
                  {tier.priceStrike && (
                    <span
                      className={
                        tier.featured
                          ? "font-display text-xl tracking-tight tabular text-background/40 line-through"
                          : "font-display text-xl tracking-tight tabular text-muted-foreground line-through"
                      }
                    >
                      {tier.priceStrike}
                    </span>
                  )}
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-display text-2xl tracking-tight md:text-3xl">
                      {tier.price}
                    </span>
                  </div>
                  {tier.priceNote && (
                    <span
                      className={
                        tier.featured
                          ? "font-mono mt-2 inline-block text-[10px] tracking-[0.2em] text-background/60 uppercase"
                          : "font-mono mt-2 inline-block text-[10px] tracking-[0.2em] text-muted-foreground uppercase"
                      }
                    >
                      {tier.priceNote}
                    </span>
                  )}
                </div>

                <ul className="mt-8 space-y-3 text-sm">
                  {tier.included.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check
                        className="mt-0.5 size-3.5 flex-shrink-0 text-[color:var(--luxe)]"
                        strokeWidth={2}
                      />
                      <span
                        className={
                          tier.featured
                            ? "text-background/90"
                            : "text-foreground/80"
                        }
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                  {tier.excluded.map((f) => (
                    <li
                      key={f}
                      className={
                        tier.featured
                          ? "flex items-start gap-3 text-background/40 line-through"
                          : "flex items-start gap-3 text-muted-foreground/60 line-through"
                      }
                    >
                      <span
                        className="mt-0.5 size-3.5 flex-shrink-0"
                        aria-hidden
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex-1" />
                <Link
                  href={tier.cta.href}
                  className={
                    tier.featured
                      ? "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[color:var(--luxe)] px-5 text-sm font-medium text-[color:var(--luxe-foreground)] transition-opacity hover:opacity-90"
                      : "inline-flex h-12 items-center justify-center gap-2 rounded-full border border-foreground/20 px-5 text-sm text-foreground transition-colors hover:border-foreground/40 hover:bg-foreground/5"
                  }
                >
                  {tier.cta.label}
                  <ArrowUpRight className="size-4" strokeWidth={1.5} />
                </Link>
              </article>
            ))}
          </div>

          <p className="mt-8 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            Solo venta · Publicación sujeta a curaduría · Admisión por curaduría
          </p>
        </div>
      </section>

      {/* ============ WHAT VIP INCLUDES ============ */}
      <section className="relative border-y border-foreground/10 bg-secondary/30">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:py-28">
          <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="h-px w-8 bg-[color:var(--luxe)]/70"
                  aria-hidden
                />
                <span className="font-mono text-[11px] tracking-[0.24em] text-[color:var(--luxe-ink)] uppercase">
                  Qué incluye el VIP · 02
                </span>
              </div>
              <h2 className="font-display max-w-3xl text-balance text-4xl leading-[1.05] tracking-tight md:text-[56px]">
                Un equipo editorial{" "}
                <span className="italic text-muted-foreground">
                  a disposición
                </span>{" "}
                de su propiedad.
              </h2>
            </div>
            <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground md:text-right">
              No somos un portal masivo. Tratamos cada inmueble del tier VIP como
              una pieza editorial. Nuestro trabajo se juzga en el detalle.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {PRODUCTION.map((p, i) => {
              const Icon = p.icon
              return (
                <article
                  key={p.t}
                  className="flex flex-col border-t border-foreground/15 pt-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex size-10 items-center justify-center rounded-full border border-[color:var(--luxe)]/30 bg-[color:var(--luxe)]/5">
                      <Icon
                        className="size-4 text-[color:var(--luxe-ink)]"
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display mt-6 text-2xl leading-tight tracking-tight">
                    {p.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p.d}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ APPLICATION FORM ============ */}
      <section
        id="solicitud"
        className="relative scroll-mt-24 border-t border-foreground/10 bg-secondary/30"
      >
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 py-20 md:grid-cols-[1fr_1.1fr] md:gap-20 md:py-28">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span
                className="h-px w-8 bg-[color:var(--luxe)]/70"
                aria-hidden
              />
              <span className="font-mono text-[11px] tracking-[0.24em] text-[color:var(--luxe-ink)] uppercase">
                Solicitud de acceso VIP · 03
              </span>
            </div>
            <h2 className="font-display text-balance text-4xl leading-[1.05] tracking-tight md:text-[56px]">
              Cuéntenos del inmueble.{" "}
              <span className="italic text-muted-foreground">
                Respondemos en 48 horas.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              Cada solicitud la revisa nuestro equipo. Si hay encaje con la
              colección, coordinamos una visita previa y el calendario de
              producción. ¿Solo quieres publicar gratis?{" "}
              <Link
                href="/publicar/propiedad"
                className="text-foreground underline underline-offset-4 hover:text-[color:var(--luxe-ink)]"
              >
                Sube tu propiedad aquí
              </Link>
              .
            </p>

            <dl className="mt-10 space-y-5">
              <div className="flex items-baseline justify-between gap-6 border-b border-foreground/10 pb-4">
                <dt className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
                  Modelo
                </dt>
                <dd className="font-mono text-sm">Solo venta</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 border-b border-foreground/10 pb-4">
                <dt className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
                  Admisión
                </dt>
                <dd className="font-mono text-sm">Por curaduría</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 border-b border-foreground/10 pb-4">
                <dt className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
                  Aprobación
                </dt>
                <dd className="font-mono text-sm">Manual, siempre</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6">
                <dt className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
                  Respuesta
                </dt>
                <dd className="font-mono text-sm">En 48 horas</dd>
              </div>
            </dl>
          </div>

          <form className="flex flex-col gap-4 border border-foreground/10 bg-background p-6 md:p-10">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                  Nombre del propietario
                </span>
                <input
                  type="text"
                  required
                  placeholder="Nombre completo"
                  className="h-11 border border-foreground/15 bg-transparent px-3 text-sm focus:border-[color:var(--luxe)] focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                  Email
                </span>
                <input
                  type="email"
                  required
                  placeholder="usted@correo.com"
                  className="h-11 border border-foreground/15 bg-transparent px-3 text-sm focus:border-[color:var(--luxe)] focus:outline-none"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                  Ciudad del inmueble
                </span>
                <input
                  type="text"
                  placeholder="Medellín, Cartagena, Bogotá…"
                  className="h-11 border border-foreground/15 bg-transparent px-3 text-sm focus:border-[color:var(--luxe)] focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                  Valor estimado (COP)
                </span>
                <select
                  className="h-11 border border-foreground/15 bg-transparent px-3 text-sm focus:border-[color:var(--luxe)] focus:outline-none"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Seleccione rango
                  </option>
                  <option>Hasta $1.000M COP</option>
                  <option>$1.000M — $3.000M COP</option>
                  <option>$3.000M — $8.000M COP</option>
                  <option>$8.000M+ COP</option>
                </select>
              </label>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                Cuéntenos del inmueble
              </span>
              <textarea
                rows={4}
                placeholder="Tipo, ubicación, superficie, razones de venta…"
                className="border border-foreground/15 bg-transparent p-3 text-sm focus:border-[color:var(--luxe)] focus:outline-none"
              />
            </label>

            <button
              type="submit"
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              <FileSignature className="size-4" strokeWidth={1.5} />
              Enviar solicitud
            </button>
            <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              Sus datos nunca se comparten · Revisión manual en 48h
            </p>
          </form>
        </div>
      </section>

      <SiteFooter />
      <div className="h-28 md:h-0" aria-hidden />
      <MobileTabBar />
    </main>
  )
}
