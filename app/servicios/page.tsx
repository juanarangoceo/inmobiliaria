import Image from "next/image"
import Link from "next/link"
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  Gavel,
  Handshake,
  Sparkles,
  Camera,
  Scale,
  Building2,
  CheckCircle2,
  Quote,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MobileTabBar } from "@/components/mobile-tab-bar"

export const metadata = {
  title: "Servicios · Asesoría Inmobiliaria — Vision Estate",
  description:
    "Una boutique inmobiliaria para operaciones de alto valor. Representación de venta y compra, valuación patrimonial, producción editorial, asesoría legal y gestión patrimonial.",
}

const services = [
  {
    index: "01",
    icon: Gavel,
    anchor: "intermediacion",
    eyebrow: "Representación de venta",
    title: "Intermediación discreta",
    description:
      "Comercialización privada, off-market o publicada con curaduría, por admisión selectiva. Distribución a una red de compradores verificados, sin banners, sin ruido.",
    bullets: [
      "Mandato exclusivo con objetivos firmados",
      "Producción editorial y tour 360 incluidos",
      "Reportes mensuales con data de señales reales",
    ],
  },
  {
    index: "02",
    icon: Handshake,
    anchor: "representacion",
    eyebrow: "Buyer's advocate",
    title: "Representación de compra",
    description:
      "Trabajamos exclusivamente para el comprador. Identificamos inmuebles dentro y fuera de mercado, negociamos a su favor y coordinamos due diligence técnica y legal.",
    bullets: [
      "Búsqueda activa en red privada",
      "Acceso a inventario fuera de portales",
      "Negociación anónima con el vendedor",
    ],
  },
  {
    index: "03",
    icon: Sparkles,
    anchor: "valuacion",
    eyebrow: "Diagnóstico patrimonial",
    title: "Valuación IA + comparables",
    description:
      "Cruzamos inteligencia artificial con nuestra base de comparables privados para entregar un rango de valor defendible ante fiduciarios, bancos o contrapartes.",
    bullets: [
      "Dossier de 28 páginas con fundamentación",
      "Revisión por comité de dos asesores senior",
      "Actualización trimestral durante el mandato",
    ],
  },
  {
    index: "04",
    icon: Camera,
    anchor: "produccion",
    eyebrow: "Estudio de producción",
    title: "Marketing editorial",
    description:
      "Fotografía arquitectónica, video cinematográfico, recorrido 360, home staging y dossier impreso. La presentación es parte del activo, y la tratamos como tal.",
    bullets: [
      "Director creativo dedicado por proyecto",
      "Locaciones cerradas, sin equipos visibles",
      "Publicación privada o abierta, su decisión",
    ],
  },
  {
    index: "05",
    icon: Scale,
    anchor: "legal",
    eyebrow: "Asesoría jurídica y fiscal",
    title: "Red legal internacional",
    description:
      "Coordinamos con despachos aliados en Colombia y para compradores en Estados Unidos, Canadá y Europa. Estructuración, fiducia, residencia fiscal y compliance patrimonial.",
    bullets: [
      "Due diligence en 12 días calendario",
      "Estructuras transfronterizas revisadas",
      "Acompañamiento en notaría o cierre remoto",
    ],
  },
  {
    index: "06",
    icon: Building2,
    anchor: "patrimonial",
    eyebrow: "Gestión de largo plazo",
    title: "Operación patrimonial",
    description:
      "Cuando la propiedad ya es suya, la mantenemos productiva. Renta premium, remodelación, servicio de concierge residencial y planeación sucesoria.",
    bullets: [
      "Rental premium con ingreso garantizado",
      "Dirección de obra de remodelación",
      "Planeación sucesoria con abogado aliado",
    ],
  },
]

const process = [
  {
    step: "01",
    title: "Briefing privado",
    copy: "Una conversación a puerta cerrada para entender su patrimonio, su horizonte y lo que no está dispuesto a negociar.",
  },
  {
    step: "02",
    title: "Curaduría & diagnóstico",
    copy: "Su asesor senior presenta un dossier con diagnóstico, estrategia, honorarios y cronograma. Sin compromisos hasta aquí.",
  },
  {
    step: "03",
    title: "Ejecución discreta",
    copy: "Producción, distribución privada y negociación en su nombre. Usted recibe reportes mensuales, no interrupciones.",
  },
  {
    step: "04",
    title: "Cierre & continuidad",
    copy: "Firma coordinada con nuestro notario aliado y plan de seguimiento patrimonial a 36 meses, sin costo adicional.",
  },
]

export default function ServiciosPage() {
  return (
    <main className="relative bg-background text-foreground">
      <SiteHeader />

      {/* ============ HERO ============ */}
      <section className="relative isolate h-[100svh] min-h-[680px] w-full overflow-hidden bg-foreground text-background">
        <Image
          src="/servicios/hero.jpg"
          alt="Estudio de asesoría inmobiliaria Vision Estate"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/90"
        />

        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-16 pt-28 md:pb-24 md:pt-32">
          <div className="flex items-center gap-3">
            <span
              className="h-px w-10 bg-[color:var(--luxe)]"
              aria-hidden
            />
            <span className="font-mono text-[11px] tracking-[0.32em] text-[color:var(--luxe)] uppercase">
              Vision Estate · Asesoría
            </span>
          </div>

          <h1 className="mt-6 max-w-5xl font-display text-balance text-[44px] leading-[0.98] tracking-tight text-white md:text-[92px] lg:text-[112px]">
            El arte discreto de comprar,{" "}
            <span className="italic text-[color:var(--luxe)]">vender</span> y
            preservar un patrimonio.
          </h1>

          <p className="mt-8 max-w-xl text-pretty text-[15px] leading-relaxed text-white/75 md:text-base">
            Una boutique inmobiliaria para operaciones de alto valor.
            Representamos con igual rigor al propietario y al comprador, en un
            mercado donde el tiempo, la reputación y el silencio valen tanto
            como el inmueble.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-5">
            <Link
              href="#contacto"
              className="group inline-flex h-12 items-center gap-3 rounded-full bg-[color:var(--luxe)] px-6 text-sm font-medium text-[color:var(--luxe-foreground)] transition-opacity hover:opacity-90"
            >
              Agendar consultoría privada
              <ArrowUpRight
                className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.75}
              />
            </Link>
            <Link
              href="#servicios"
              className="group inline-flex items-center gap-2 text-sm text-white/85 hover:text-white"
            >
              <ArrowDown
                className="size-4 transition-transform group-hover:translate-y-0.5"
                strokeWidth={1.5}
              />
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase">
                Conocer el método
              </span>
            </Link>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between border-t border-white/15 px-6 py-4 font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase">
            <span>Vol. 01 — Primavera 2026</span>
            <span className="hidden md:inline">
              Oficinas · Medellín · Cartagena · Bogotá
            </span>
            <span>Sólo por referencia</span>
          </div>
        </div>
      </section>

      {/* ============ CREDENCIALES STRIP ============ */}
      <section className="relative border-b border-foreground/10 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-14 md:py-16">
          <dl className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-12">
            {[
              { v: "Solo venta", u: "", l: "Sin arriendos" },
              { v: "Colombia", u: "", l: "Base · alcance global" },
              { v: "Curaduría", u: "", l: "Admisión selectiva" },
              { v: "24/7", u: "", l: "Concierge IA · VIP" },
            ].map((k) => (
              <div
                key={k.l}
                className="flex flex-col border-t border-foreground/15 pt-5"
              >
                <p className="font-display text-4xl leading-none tracking-tight tabular md:text-5xl">
                  {k.v}
                  <span className="ml-1 text-lg font-normal text-muted-foreground md:text-xl">
                    {k.u}
                  </span>
                </p>
                <p className="mt-4 font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                  {k.l}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ============ MANIFIESTO ============ */}
      <section className="relative bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/servicios/proceso.jpg"
                  alt="Dossier editorial Vision Estate"
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
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
              </div>
            </div>

            <div className="flex flex-col justify-center md:col-span-7">
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="h-px w-8 bg-[color:var(--luxe)]/70"
                  aria-hidden
                />
                <span className="font-mono text-[11px] tracking-[0.24em] text-[color:var(--luxe)] uppercase">
                  Manifiesto · 01
                </span>
              </div>

              <h2 className="font-display max-w-2xl text-balance text-4xl leading-[1.05] tracking-tight md:text-[64px]">
                No somos un portal.{" "}
                <span className="italic text-muted-foreground">
                  Somos un estudio
                </span>{" "}
                que opera como boutique.
              </h2>

              <div className="mt-10 max-w-xl space-y-5 text-pretty text-base leading-relaxed text-foreground/80 md:text-[17px]">
                <p>
                  Vision Estate nació para resolver un problema muy concreto: en el
                  mercado de inmuebles de alto valor, la confianza se rompe con
                  un detalle. Un anuncio fuera de lugar, un teléfono abierto,
                  una foto mal iluminada — y la operación se desploma.
                </p>
                <p>
                  Trabajamos como una casa de representación. Elegimos a
                  nuestros clientes con el mismo cuidado con el que ellos
                  eligen un inmueble. Cada mandato se acompaña por un asesor
                  senior, un director de producción y un aliado legal dedicado.
                </p>
                <p className="font-mono text-[13px] tracking-wide text-muted-foreground">
                  — Equipo Vision Estate
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICIOS GRID ============ */}
      <section
        id="servicios"
        className="relative border-t border-foreground/10 bg-background"
      >
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="h-px w-8 bg-[color:var(--luxe)]/70"
                  aria-hidden
                />
                <span className="font-mono text-[11px] tracking-[0.24em] text-[color:var(--luxe)] uppercase">
                  Portafolio · 02
                </span>
              </div>
              <h2 className="font-display max-w-3xl text-balance text-4xl leading-[1.02] tracking-tight md:text-[72px]">
                Seis prácticas.{" "}
                <span className="italic text-muted-foreground">
                  Un solo estándar.
                </span>
              </h2>
            </div>
            <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground md:text-right">
              Cada práctica está coordinada por un asesor senior con al menos
              diez años en operaciones de alto valor. El equipo nunca es
              sustituido durante el mandato.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden border border-foreground/10 bg-foreground/10 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = s.icon
              return (
                <article
                  key={s.index}
                  id={s.anchor}
                  className="group relative flex flex-col bg-background p-8 transition-colors hover:bg-secondary/40 md:p-10"
                >
                  <div className="flex items-start justify-between">
                    <Icon
                      className="size-6 text-foreground/70 transition-colors group-hover:text-[color:var(--luxe)]"
                      strokeWidth={1.25}
                    />
                    <span className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground tabular uppercase">
                      {s.index}
                    </span>
                  </div>

                  <p className="mt-10 font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                    {s.eyebrow}
                  </p>
                  <h3 className="font-display mt-3 text-balance text-3xl leading-tight tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>

                  <ul className="mt-8 space-y-2.5 border-t border-foreground/10 pt-6">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-3 text-[13px] leading-snug text-foreground/85"
                      >
                        <CheckCircle2
                          className="mt-0.5 size-3.5 flex-shrink-0 text-[color:var(--luxe)]"
                          strokeWidth={1.5}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="#contacto"
                    className="mt-8 inline-flex items-center gap-2 self-start font-mono text-[10px] tracking-[0.22em] text-foreground uppercase transition-colors hover:text-[color:var(--luxe)]"
                  >
                    Solicitar esta práctica
                    <ArrowRight
                      className="size-3.5 transition-transform group-hover:translate-x-0.5"
                      strokeWidth={1.5}
                    />
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ PROCESO ============ */}
      <section className="relative border-t border-foreground/10 bg-secondary/40">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="mb-14 max-w-3xl md:mb-20">
            <div className="mb-3 flex items-center gap-3">
              <span
                className="h-px w-8 bg-[color:var(--luxe)]/70"
                aria-hidden
              />
              <span className="font-mono text-[11px] tracking-[0.24em] text-[color:var(--luxe)] uppercase">
                Método · 03
              </span>
            </div>
            <h2 className="font-display text-balance text-4xl leading-[1.05] tracking-tight md:text-[64px]">
              Cuatro etapas.{" "}
              <span className="italic text-muted-foreground">
                Sin improvisación.
              </span>
            </h2>
            <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
              Un protocolo probado en más de 600 operaciones. Disciplinado en
              los plazos, flexible en lo humano. Usted siempre sabe dónde
              estamos parados.
            </p>
          </div>

          <ol className="relative grid grid-cols-1 gap-px overflow-hidden border border-foreground/15 bg-foreground/15 md:grid-cols-4">
            {process.map((p, i) => (
              <li key={p.step} className="relative flex flex-col bg-background p-8 md:p-10">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                    Etapa
                  </span>
                  <span className="font-display text-3xl tracking-tight tabular text-[color:var(--luxe)] md:text-4xl">
                    {p.step}
                  </span>
                </div>
                <h3 className="font-display mt-6 text-2xl leading-tight tracking-tight md:text-[28px]">
                  {p.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {p.copy}
                </p>

                {i < process.length - 1 && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-3 top-1/2 hidden size-6 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/15 bg-background text-[color:var(--luxe)] md:inline-flex"
                  >
                    <ArrowRight className="size-3" strokeWidth={1.75} />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ SALÓN / EQUIPO ============ */}
      <section className="relative bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <div className="relative aspect-[16/11] overflow-hidden">
                <Image
                  src="/servicios/equipo.jpg"
                  alt="Salón privado de asesoría Vision Estate"
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
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
                <div className="absolute left-6 top-6 inline-flex items-center gap-2 bg-black/30 px-3 py-1.5 text-[10px] font-medium tracking-[0.2em] text-white uppercase backdrop-blur-md">
                  <span
                    className="size-1 rounded-full bg-[color:var(--luxe)]"
                    aria-hidden
                  />
                  Salón privado · Medellín
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between md:col-span-5">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className="h-px w-8 bg-[color:var(--luxe)]/70"
                    aria-hidden
                  />
                  <span className="font-mono text-[11px] tracking-[0.24em] text-[color:var(--luxe)] uppercase">
                    El equipo · 04
                  </span>
                </div>
                <h2 className="font-display text-balance text-4xl leading-[1.02] tracking-tight md:text-[56px]">
                  Asesores senior.{" "}
                  <span className="italic text-muted-foreground">
                    Nunca rotan.
                  </span>
                </h2>
                <p className="mt-8 text-pretty text-base leading-relaxed text-muted-foreground">
                  Un equipo pequeño por decisión. Ocho asesores senior, tres
                  arquitectos asociados, una red legal de catorce despachos.
                  Cada cliente conoce por nombre a las personas que lo
                  representan.
                </p>
              </div>

              <dl className="mt-10 grid grid-cols-3 gap-6 border-y border-foreground/10 py-8">
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                    Senior
                  </dt>
                  <dd className="font-display mt-2 text-3xl tracking-tight tabular md:text-4xl">
                    08
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                    Arquitectos
                  </dt>
                  <dd className="font-display mt-2 text-3xl tracking-tight tabular md:text-4xl">
                    03
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                    Aliados
                  </dt>
                  <dd className="font-display mt-2 text-3xl tracking-tight tabular md:text-4xl">
                    14
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CASO DE ESTUDIO / QUOTE ============ */}
      <section className="relative border-t border-foreground/10 bg-foreground text-background">
        <div className="grain mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <Quote
                className="size-8 text-[color:var(--luxe)]"
                strokeWidth={1.25}
              />
              <blockquote className="font-display mt-8 max-w-2xl text-balance text-3xl leading-[1.15] tracking-tight md:text-[44px]">
                &ldquo;Vendimos la hacienda familiar en ciento cuarenta y dos
                días, sin salir a portales y sin un solo letrero en la reja.
                Vision Estate condujo la operación con la discreción que{" "}
                <span className="italic text-[color:var(--luxe)]">
                  exigía la historia
                </span>{" "}
                de la casa.&rdquo;
              </blockquote>
              <div className="mt-10 flex items-center gap-4">
                <div className="flex size-11 items-center justify-center rounded-full bg-[color:var(--luxe)]/15 font-display text-sm tracking-tight text-[color:var(--luxe)]">
                  MJ
                </div>
                <div>
                  <p className="text-sm">María J. Beltrán</p>
                  <p className="font-mono text-[10px] tracking-[0.22em] text-background/55 uppercase">
                    Family office · Colombia
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-5">
              <p className="font-mono text-[10px] tracking-[0.22em] text-background/55 uppercase">
                Caso · Hacienda del laurel
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-8 border-y border-white/15 py-10">
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.22em] text-background/60 uppercase">
                    Valor cerrado
                  </dt>
                  <dd className="font-display mt-2 text-3xl tracking-tight tabular md:text-4xl">
                    $9.500M COP
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.22em] text-background/60 uppercase">
                    Días en mandato
                  </dt>
                  <dd className="font-display mt-2 text-3xl tracking-tight tabular md:text-4xl">
                    142
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.22em] text-background/60 uppercase">
                    Visitas privadas
                  </dt>
                  <dd className="font-display mt-2 text-3xl tracking-tight tabular md:text-4xl">
                    09
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.22em] text-background/60 uppercase">
                    Ofertas
                  </dt>
                  <dd className="font-display mt-2 text-3xl tracking-tight tabular md:text-4xl">
                    03
                  </dd>
                </div>
              </dl>
              <p className="mt-6 text-sm leading-relaxed text-background/70">
                Mandato off-market con distribución a red privada de 38
                compradores verificados. Sin publicación abierta en ningún
                momento del proceso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA CONTACTO ============ */}
      <section id="contacto" className="relative bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="h-px w-8 bg-[color:var(--luxe)]/70"
                  aria-hidden
                />
                <span className="font-mono text-[11px] tracking-[0.24em] text-[color:var(--luxe)] uppercase">
                  Agendar · 05
                </span>
              </div>
              <h2 className="font-display text-balance text-4xl leading-[1.02] tracking-tight md:text-[64px]">
                Una conversación{" "}
                <span className="italic text-muted-foreground">
                  a puerta cerrada.
                </span>
              </h2>
              <p className="mt-8 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
                Confidencialidad firmada desde el primer contacto. Respondemos
                en menos de veinticuatro horas con una propuesta de agenda y
                el asesor asignado.
              </p>

              <dl className="mt-14 space-y-5 border-t border-foreground/10 pt-8">
                <div className="flex items-start justify-between gap-6">
                  <dt className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
                    Medellín
                  </dt>
                  <dd className="text-right text-sm">
                    El Poblado · Por cita
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-6">
                  <dt className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
                    Cartagena
                  </dt>
                  <dd className="text-right text-sm">Centro histórico · Por cita</dd>
                </div>
                <div className="flex items-start justify-between gap-6">
                  <dt className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
                    Bogotá
                  </dt>
                  <dd className="text-right text-sm">
                    Por cita
                  </dd>
                </div>
              </dl>
            </div>

            <form
              className="rounded-sm border border-foreground/10 bg-card p-8 md:col-span-7 md:p-12"
              aria-label="Agendar consultoría privada"
            >
              <p className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                Formulario privado · Encriptado
              </p>

              <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                    Nombre
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Nombre y apellido"
                    className="h-11 border-b border-foreground/20 bg-transparent px-0 text-sm focus:border-foreground focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                    Email
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="ud@dominio.com"
                    className="h-11 border-b border-foreground/20 bg-transparent px-0 text-sm focus:border-foreground focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                    Teléfono
                  </span>
                  <input
                    type="tel"
                    placeholder="+52 · Opcional"
                    className="h-11 border-b border-foreground/20 bg-transparent px-0 text-sm focus:border-foreground focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                    Servicio de interés
                  </span>
                  <select
                    defaultValue=""
                    className="h-11 border-b border-foreground/20 bg-transparent px-0 text-sm focus:border-foreground focus:outline-none"
                  >
                    <option value="" disabled>
                      Seleccione una práctica
                    </option>
                    <option value="intermediacion">
                      Intermediación de venta
                    </option>
                    <option value="representacion">
                      Representación de compra
                    </option>
                    <option value="valuacion">Valuación patrimonial</option>
                    <option value="produccion">Producción & marketing</option>
                    <option value="legal">Asesoría legal y fiscal</option>
                    <option value="patrimonial">Gestión patrimonial</option>
                  </select>
                </label>
              </div>

              <label className="mt-6 flex flex-col gap-1.5">
                <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                  Sobre su proyecto
                </span>
                <textarea
                  rows={4}
                  placeholder="Breve contexto — ubicación, valor estimado, horizonte…"
                  className="border-b border-foreground/20 bg-transparent px-0 pt-2 text-sm focus:border-foreground focus:outline-none"
                />
              </label>

              <div className="mt-10 flex flex-col-reverse items-start gap-4 border-t border-foreground/10 pt-8 md:flex-row md:items-center md:justify-between">
                <p className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                  Al enviar acepta nuestra política de confidencialidad
                </p>
                <button
                  type="submit"
                  className="group inline-flex h-12 items-center gap-3 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  Enviar solicitud
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.5}
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <SiteFooter />
      <div className="h-24 md:h-0" aria-hidden />
      <MobileTabBar />
    </main>
  )
}
