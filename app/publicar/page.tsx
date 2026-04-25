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
  title: "Publicar en VIP · Habitar",
  description:
    "Producción editorial, recorrido 360° profesional, concierge IA y distribución privada. Publicación reservada a inmuebles de alto valor.",
}

const PLANS = [
  {
    id: "signature",
    name: "Signature",
    kicker: "Entrada a la colección",
    price: "USD 2,400",
    period: "por 90 días",
    tagline:
      "Producción editorial y distribución privada. Para inmuebles que merecen contarse bien, sin ruido.",
    included: [
      "Sesión editorial · 1 día",
      "Recorrido 360° completo",
      "Narrativa escrita por asesor",
      "Distribución en colección privada",
      "Reportes quincenales",
    ],
    excluded: ["Concierge IA dedicado", "Videollamada instantánea 24/7"],
  },
  {
    id: "private-collection",
    name: "Private Collection",
    kicker: "Recomendado",
    price: "USD 6,800",
    period: "por 180 días",
    tagline:
      "El estándar para propiedades desde USD 2M. Una presentación completa, con concierge IA dedicado y soporte humano 1:1.",
    included: [
      "Sesión editorial · 2 días",
      "Recorrido 360° cinemático",
      "Concierge IA Aster · dedicado",
      "Videollamada IA al instante 24/7",
      "Asesor humano dedicado 1:1",
      "Distribución privada + 2 eventos",
      "Dossier impreso · 24 piezas",
    ],
    excluded: [],
    featured: true,
  },
  {
    id: "off-market",
    name: "Off-market",
    kicker: "Sólo por invitación",
    price: "A consultar",
    period: "contrato a medida",
    tagline:
      "Propiedades fuera de mercado presentadas a una red cerrada. Confidencialidad absoluta, proceso silencioso.",
    included: [
      "Proceso completamente privado",
      "NDAs con todas las visitas",
      "Casting de compradores verificados",
      "Cierre con equipo legal propio",
      "Absoluta discreción",
    ],
    excluded: [],
  },
]

const PRODUCTION = [
  {
    icon: Camera,
    t: "Producción editorial",
    d: "Un director de arte, un fotógrafo arquitectónico y un escritor visitan la propiedad durante 1 o 2 días. Todo se produce al nivel de una revista, no de un portal.",
  },
  {
    icon: RotateCw,
    t: "Recorrido 360° cinemático",
    d: "Capturamos la propiedad con estaciones esféricas de alta resolución. El comprador recorre el inmueble desde su escritorio con medidas y anotaciones.",
  },
  {
    icon: Sparkles,
    t: "Concierge IA dedicado",
    d: "Entrenamos a Aster —nuestra agente IA— en los detalles exactos de su propiedad. Atiende consultas 24/7 con la misma precisión que un asesor humano.",
  },
  {
    icon: Phone,
    t: "Videollamada al instante",
    d: "Cualquier comprador verificado puede iniciar una videollamada con un agente IA en menos de 5 segundos. Sin agendar, sin fricción, sin pérdida de tiempo.",
  },
  {
    icon: ShieldCheck,
    t: "Verificación legal",
    d: "Antes de publicar revisamos títulos, gravámenes, uso de suelo y cumplimiento fiscal. Cada listado lleva el sello Habitar Verified.",
  },
  {
    icon: FileSignature,
    t: "Cierre acompañado",
    d: "Desde la oferta hasta la escritura. Coordinamos notaría, abogados y fondo de garantía. Usted sólo firma cuando tiene toda la información.",
  },
]

const STATS = [
  { k: "37 días", l: "Tiempo medio al cierre" },
  { k: "+12%", l: "Premium vs. mercado abierto" },
  { k: "94%", l: "Satisfacción del vendedor" },
  { k: "840+", l: "Compradores verificados" },
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
              <span className="font-mono text-[11px] tracking-[0.32em] text-[color:var(--luxe)] uppercase">
                Publicar en la Colección Privada
              </span>
            </div>

            <h1 className="mt-6 font-display text-balance text-[44px] leading-[0.98] tracking-tight md:text-[84px] lg:text-[96px]">
              Publique con la misma{" "}
              <span className="italic text-muted-foreground">sobriedad</span>{" "}
              con la que construyó.
            </h1>

            <p className="mt-8 max-w-lg text-pretty text-[15px] leading-relaxed text-muted-foreground md:text-base">
              La publicación en Habitar VIP es un servicio curado y de pago.
              Producimos su inmueble al nivel de una obra editorial y lo
              distribuimos en privado a una red verificada de compradores.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="#planes"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Ver planes de publicación
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </Link>
              <Link
                href="/vip"
                className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase">
                  Ver la colección
                </span>
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-foreground/10 pt-10 md:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.l}>
                  <p className="font-display text-2xl leading-none tracking-tight tabular md:text-3xl">
                    {s.k}
                  </p>
                  <p className="font-mono mt-2 text-[10px] leading-relaxed tracking-[0.2em] text-muted-foreground uppercase">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative md:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/landings/publicar-vip.jpg"
                alt="Oficina privada · Habitar"
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
                  Sesión en curso
                </span>
                <span>Valle de Bravo · 14:22</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRODUCTION INCLUDED ============ */}
      <section className="relative border-y border-foreground/10 bg-secondary/30">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:py-28">
          <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="h-px w-8 bg-[color:var(--luxe)]/70"
                  aria-hidden
                />
                <span className="font-mono text-[11px] tracking-[0.24em] text-[color:var(--luxe)] uppercase">
                  Qué incluye publicar · 01
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
              No somos un portal. Somos un estudio editorial especializado en
              activos de alto valor. Nuestro trabajo se juzga en el detalle.
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
                        className="size-4 text-[color:var(--luxe)]"
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

      {/* ============ PLANS ============ */}
      <section id="planes" className="relative bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:py-28">
          <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="h-px w-8 bg-[color:var(--luxe)]/70"
                  aria-hidden
                />
                <span className="font-mono text-[11px] tracking-[0.24em] text-[color:var(--luxe)] uppercase">
                  Planes de publicación · 02
                </span>
              </div>
              <h2 className="font-display max-w-2xl text-balance text-4xl leading-[1.05] tracking-tight md:text-[56px]">
                Tres formas de presentar una propiedad excepcional.
              </h2>
            </div>
            <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground md:text-right">
              Todos los planes incluyen recorrido 360°, verificación legal y
              distribución privada. La diferencia está en la escala de la
              producción editorial.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden border border-foreground/10 bg-foreground/10 md:grid-cols-3">
            {PLANS.map((plan) => (
              <article
                key={plan.id}
                className={
                  plan.featured
                    ? "relative flex flex-col bg-foreground p-8 text-background md:p-10"
                    : "relative flex flex-col bg-background p-8 md:p-10"
                }
              >
                <div className="flex items-center justify-between">
                  <span
                    className={
                      plan.featured
                        ? "font-mono text-[10px] tracking-[0.22em] text-[color:var(--luxe)] uppercase"
                        : "font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase"
                    }
                  >
                    {plan.kicker}
                  </span>
                  {plan.featured && (
                    <span className="flex size-6 items-center justify-center rounded-full bg-[color:var(--luxe)]/15 ring-1 ring-[color:var(--luxe)]/40">
                      <Sparkles
                        className="size-3 text-[color:var(--luxe)]"
                        strokeWidth={1.75}
                      />
                    </span>
                  )}
                </div>

                <h3
                  className={
                    plan.featured
                      ? "font-display mt-6 text-3xl leading-tight tracking-tight md:text-[38px]"
                      : "font-display mt-6 text-3xl leading-tight tracking-tight md:text-[38px]"
                  }
                >
                  {plan.name}
                </h3>

                <p
                  className={
                    plan.featured
                      ? "mt-4 text-sm leading-relaxed text-background/70"
                      : "mt-4 text-sm leading-relaxed text-muted-foreground"
                  }
                >
                  {plan.tagline}
                </p>

                <div
                  className={
                    plan.featured
                      ? "mt-8 flex items-baseline gap-2 border-t border-white/15 pt-6"
                      : "mt-8 flex items-baseline gap-2 border-t border-foreground/10 pt-6"
                  }
                >
                  <span className="font-display text-3xl tracking-tight tabular md:text-4xl">
                    {plan.price}
                  </span>
                  <span
                    className={
                      plan.featured
                        ? "font-mono text-[10px] tracking-[0.2em] text-background/60 uppercase"
                        : "font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase"
                    }
                  >
                    {plan.period}
                  </span>
                </div>

                <ul className="mt-8 space-y-3 text-sm">
                  {plan.included.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check
                        className={
                          plan.featured
                            ? "mt-0.5 size-3.5 flex-shrink-0 text-[color:var(--luxe)]"
                            : "mt-0.5 size-3.5 flex-shrink-0 text-[color:var(--luxe)]"
                        }
                        strokeWidth={2}
                      />
                      <span
                        className={
                          plan.featured
                            ? "text-background/90"
                            : "text-foreground/80"
                        }
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                  {plan.excluded.map((f) => (
                    <li
                      key={f}
                      className={
                        plan.featured
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
                  href="#solicitud"
                  className={
                    plan.featured
                      ? "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[color:var(--luxe)] px-5 text-sm font-medium text-[color:var(--luxe-foreground)] transition-opacity hover:opacity-90"
                      : "inline-flex h-12 items-center justify-center gap-2 rounded-full border border-foreground/20 px-5 text-sm text-foreground transition-colors hover:border-foreground/40 hover:bg-foreground/5"
                  }
                >
                  {plan.id === "off-market"
                    ? "Solicitar invitación"
                    : `Elegir ${plan.name}`}
                  <ArrowUpRight className="size-4" strokeWidth={1.5} />
                </Link>
              </article>
            ))}
          </div>

          <p className="mt-8 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            Todos los precios excluyen IVA · Publicación sujeta a curaduría del
            comité editorial · Mínimo USD 1M de valor de propiedad
          </p>
        </div>
      </section>

      {/* ============ APPLICATION FORM ============ */}
      <section
        id="solicitud"
        className="relative border-t border-foreground/10 bg-secondary/30"
      >
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-6 py-20 md:grid-cols-[1fr_1.1fr] md:gap-20 md:py-28">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span
                className="h-px w-8 bg-[color:var(--luxe)]/70"
                aria-hidden
              />
              <span className="font-mono text-[11px] tracking-[0.24em] text-[color:var(--luxe)] uppercase">
                Solicitud de publicación · 03
              </span>
            </div>
            <h2 className="font-display text-balance text-4xl leading-[1.05] tracking-tight md:text-[56px]">
              Cuéntenos del inmueble.{" "}
              <span className="italic text-muted-foreground">
                Respondemos en 48 horas.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
              Cada solicitud es revisada por nuestro comité editorial. Si hay
              encaje con la colección, coordinamos una visita previa y
              acordamos el calendario de producción.
            </p>

            <dl className="mt-10 space-y-5">
              <div className="flex items-baseline justify-between gap-6 border-b border-foreground/10 pb-4">
                <dt className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                  Inmuebles publicados
                </dt>
                <dd className="font-mono text-sm tabular">127 al año</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 border-b border-foreground/10 pb-4">
                <dt className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                  Valor mínimo aceptado
                </dt>
                <dd className="font-mono text-sm tabular">USD 1,000,000</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 border-b border-foreground/10 pb-4">
                <dt className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                  Tasa de aceptación
                </dt>
                <dd className="font-mono text-sm tabular">22%</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6">
                <dt className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                  Tiempo medio al cierre
                </dt>
                <dd className="font-mono text-sm tabular">37 días</dd>
              </div>
            </dl>
          </div>

          <form className="flex flex-col gap-4 border border-foreground/10 bg-background p-6 md:p-10">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
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
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                  Email privado
                </span>
                <input
                  type="email"
                  required
                  placeholder="usted@privado.com"
                  className="h-11 border border-foreground/15 bg-transparent px-3 text-sm focus:border-[color:var(--luxe)] focus:outline-none"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                  Ciudad del inmueble
                </span>
                <input
                  type="text"
                  placeholder="CDMX, Valle, Careyes…"
                  className="h-11 border border-foreground/15 bg-transparent px-3 text-sm focus:border-[color:var(--luxe)] focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                  Valor estimado (USD)
                </span>
                <select
                  className="h-11 border border-foreground/15 bg-transparent px-3 text-sm focus:border-[color:var(--luxe)] focus:outline-none"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Seleccione rango
                  </option>
                  <option>USD 1M — 3M</option>
                  <option>USD 3M — 8M</option>
                  <option>USD 8M — 20M</option>
                  <option>USD 20M+</option>
                </select>
              </label>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                Plan de interés
              </span>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {PLANS.map((p) => (
                  <label
                    key={p.id}
                    className="flex cursor-pointer items-center gap-3 border border-foreground/15 px-4 py-3 text-sm transition-colors hover:border-[color:var(--luxe)]/40"
                  >
                    <input
                      type="radio"
                      name="plan"
                      value={p.id}
                      className="accent-[color:var(--luxe)]"
                    />
                    <span>{p.name}</span>
                  </label>
                ))}
              </div>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                Cuéntenos del inmueble
              </span>
              <textarea
                rows={4}
                placeholder="Arquitecto, materialidad, superficie, razones de venta…"
                className="border border-foreground/15 bg-transparent p-3 text-sm focus:border-[color:var(--luxe)] focus:outline-none"
              />
            </label>

            <button
              type="submit"
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              <FileSignature className="size-4" strokeWidth={1.5} />
              Enviar solicitud privada
            </button>
            <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
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
