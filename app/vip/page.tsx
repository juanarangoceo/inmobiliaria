import Image from "next/image"
import Link from "next/link"
import {
  ArrowDown,
  ArrowUpRight,
  MapPin,
  Phone,
  RotateCw,
  Sparkles,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MobileTabBar } from "@/components/mobile-tab-bar"
import { VipPropertyCard } from "@/components/vip-property-card"
import { VipChatbot } from "@/components/vip-chatbot"
import { formatPrice } from "@/lib/properties"
import { getVipProperties } from "@/lib/sanity/queries"

export const metadata = {
  title: "VIP · Colección Privada — Vision Estate Colombia",
  description:
    "Inmuebles off-market, recorrido 360° inmersivo, concierge IA y videollamada al instante con agente virtual. Publicación VIP para propietarios.",
}

export default async function VipPage() {
  const vipProperties = await getVipProperties()
  const featured = vipProperties[0]
  const rest = vipProperties.slice(1)

  return (
    <main className="relative bg-background text-foreground">
      <SiteHeader />

      {/* ============ HERO ============ */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <Image
          src="/landings/vip-collection.jpg"
          alt="Colección Privada Vision Estate VIP"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/20 to-black/85"
        />

        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-14 pt-28 md:pb-20 md:pt-32">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[color:var(--luxe)]" aria-hidden />
            <span className="font-mono text-[11px] tracking-[0.32em] text-[color:var(--luxe)] uppercase">
              Colección Privada · VIP
            </span>
          </div>

          <h1 className="mt-6 max-w-5xl font-display text-balance text-[46px] leading-[0.98] tracking-tight text-white md:text-[88px] lg:text-[108px]">
            Inmuebles que no{" "}
            <span className="italic text-[color:var(--luxe)]">existen</span>{" "}
            en ningún otro portal.
          </h1>

          <p className="mt-8 max-w-xl text-pretty text-[15px] leading-relaxed text-white/75 md:text-base">
            Una colección curada de residencias off-market, haciendas y obras
            de autor. Visitar es gratuito. Publicar está reservado a
            propietarios que entienden que la presentación es parte del activo.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[10px] tracking-[0.22em] text-white/70 uppercase">
            <span className="inline-flex items-center gap-2">
              <span
                className="size-1 rounded-full bg-[color:var(--luxe)]"
                aria-hidden
              />
              Recorrido 360° inmersivo
            </span>
            <span className="inline-flex items-center gap-2">
              <span
                className="size-1 rounded-full bg-[color:var(--luxe)]"
                aria-hidden
              />
              Concierge IA · Aster
            </span>
            <span className="inline-flex items-center gap-2">
              <span
                className="size-1 rounded-full bg-[color:var(--luxe)]"
                aria-hidden
              />
              Videollamada al instante
            </span>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-5">
            <Link
              href="#coleccion"
              className="group inline-flex h-12 items-center gap-3 rounded-full bg-[color:var(--luxe)] px-6 text-sm font-medium text-[color:var(--luxe-foreground)] transition-opacity hover:opacity-90"
            >
              Explorar la colección
              <ArrowDown
                className="size-4 transition-transform group-hover:translate-y-0.5"
                strokeWidth={1.75}
              />
            </Link>
            <Link
              href="/publicar"
              className="group inline-flex items-center gap-2 text-sm text-white/85 hover:text-white"
            >
              <span className="font-mono text-[11px] tracking-[0.22em] uppercase">
                Publicar en VIP
              </span>
              <ArrowUpRight
                className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between border-t border-white/15 px-6 py-4 font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase">
            <span>Vol. 01 — Primavera 2026</span>
            <span className="hidden md:inline">
              {vipProperties.length} inmuebles disponibles
            </span>
            <span>Publicar sólo por invitación</span>
          </div>
        </div>
      </section>

      {/* ============ EXCLUSIVE FEATURES ============ */}
      <section className="relative border-b border-foreground/10 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:py-28">
          <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="h-px w-8 bg-[color:var(--luxe)]/70"
                  aria-hidden
                />
                <span className="font-mono text-[11px] tracking-[0.24em] text-[color:var(--luxe)] uppercase">
                  Experiencia exclusiva · 01
                </span>
              </div>
              <h2 className="font-display max-w-3xl text-balance text-4xl leading-[1.05] tracking-tight md:text-[56px]">
                La propiedad se{" "}
                <span className="italic text-muted-foreground">recorre</span>{" "}
                antes de visitarla.
              </h2>
            </div>
            <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground md:text-right">
              Tres instrumentos reservados a la Colección Privada. Pensados
              para decisiones de alto valor, donde el tiempo y la confianza son
              el verdadero lujo.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden border border-foreground/10 bg-foreground/10 md:grid-cols-3">
            {/* 360 tour */}
            <div className="relative flex flex-col bg-background p-8 md:p-10">
              <div className="relative mb-8 aspect-[4/3] overflow-hidden">
                <Image
                  src="/vip/tour-360.jpg"
                  alt="Recorrido 360 inmersivo"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-3 top-3 size-3 border-l border-t border-[color:var(--luxe)]/70"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-3 top-3 size-3 border-r border-t border-[color:var(--luxe)]/70"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-3 left-3 size-3 border-b border-l border-[color:var(--luxe)]/70"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-3 right-3 size-3 border-b border-r border-[color:var(--luxe)]/70"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/35 px-4 py-3 font-mono text-[10px] tracking-[0.22em] text-white uppercase backdrop-blur-md">
                  <span className="inline-flex items-center gap-2">
                    <RotateCw className="size-3" strokeWidth={1.5} /> 360°
                  </span>
                  <span>6 estancias</span>
                </div>
              </div>
              <p className="font-mono text-[10px] tracking-[0.24em] text-muted-foreground uppercase">
                Tour inmersivo
              </p>
              <h3 className="font-display mt-2 text-2xl leading-tight tracking-tight md:text-[28px]">
                Camine el inmueble desde su escritorio
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Fotografía esférica captura cada estancia con resolución de
                escaneo arquitectónico. Medidas exactas, anotaciones del asesor
                y detalles de acabado integrados.
              </p>
            </div>

            {/* AI Concierge */}
            <div className="relative flex flex-col bg-background p-8 md:p-10">
              <div className="relative mb-8 aspect-[4/3] overflow-hidden">
                <Image
                  src="/vip/ai-agent.jpg"
                  alt="Concierge IA Aster"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.22em] text-white/85 uppercase">
                    <span className="inline-flex items-center gap-2">
                      <Sparkles className="size-3" strokeWidth={1.5} /> Aster
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="size-1.5 rounded-full bg-[color:var(--luxe)]"
                        aria-hidden
                      />
                      En línea
                    </span>
                  </div>
                  <div className="space-y-2">
                    <span className="inline-block max-w-[80%] rounded-2xl bg-white/15 px-3 py-2 text-[11px] text-white backdrop-blur-md">
                      ¿Disponibilidad en Valle de Bravo con caballerizas?
                    </span>
                    <span className="block max-w-[85%] rounded-2xl bg-[color:var(--luxe)]/90 px-3 py-2 text-[11px] text-[color:var(--luxe-foreground)]">
                      Tengo 2 opciones off-market. Le envío el dossier privado.
                    </span>
                  </div>
                </div>
              </div>
              <p className="font-mono text-[10px] tracking-[0.24em] text-muted-foreground uppercase">
                Concierge IA
              </p>
              <h3 className="font-display mt-2 text-2xl leading-tight tracking-tight md:text-[28px]">
                Aster. Disponible 24/7, sin agenda.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Entrenada con la totalidad del catálogo privado de Vision Estate.
                Comprende criterios sutiles —orientación, materialidad,
                privacidad— y filtra antes de que usted invierta tiempo.
              </p>
            </div>

            {/* Instant video call */}
            <div className="relative flex flex-col bg-background p-8 md:p-10">
              <div className="relative mb-8 aspect-[4/3] overflow-hidden bg-black">
                <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--luxe)]/30 via-black to-black" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <span
                      className="absolute inset-0 animate-ping rounded-full bg-[color:var(--luxe)]/40"
                      aria-hidden
                    />
                    <span className="relative flex size-16 items-center justify-center rounded-full bg-[color:var(--luxe)] text-[color:var(--luxe-foreground)] ring-4 ring-[color:var(--luxe)]/20">
                      <Phone className="size-6" strokeWidth={1.75} />
                    </span>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/60 px-4 py-3 font-mono text-[10px] tracking-[0.22em] text-white uppercase backdrop-blur-md">
                  <span>Conectando · 00:03</span>
                  <span>Agente IA · HD</span>
                </div>
              </div>
              <p className="font-mono text-[10px] tracking-[0.24em] text-muted-foreground uppercase">
                Llamada instantánea
              </p>
              <h3 className="font-display mt-2 text-2xl leading-tight tracking-tight md:text-[28px]">
                Un agente IA en menos de 5 segundos
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Videollamada al instante con un agente generado por IA,
                entrenado en la propiedad exacta que mira. Si necesita un
                asesor humano, lo escala en la misma llamada.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURED EDITORIAL ============ */}
      {featured && (
        <section className="relative bg-background">
          <div className="mx-auto max-w-[1400px] px-6 py-20 md:py-28">
            <div className="mb-10 flex items-center gap-3 md:mb-14">
              <span
                className="h-px w-8 bg-[color:var(--luxe)]/70"
                aria-hidden
              />
              <span className="font-mono text-[11px] tracking-[0.24em] text-[color:var(--luxe)] uppercase">
                Pieza destacada · {featured.code}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
              <div className="md:col-span-7">
                <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
                  <Image
                    src={featured.image || "/placeholder.svg"}
                    alt={featured.title}
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
                  <div className="absolute left-6 top-6 flex items-center gap-2 bg-black/30 px-3 py-1.5 text-[10px] font-medium tracking-[0.2em] text-white uppercase backdrop-blur-md">
                    <span
                      className="size-1 rounded-full bg-[color:var(--luxe)]"
                      aria-hidden
                    />
                    Off-market
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between md:col-span-5">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
                    <MapPin className="mr-2 inline size-3" strokeWidth={1.5} />
                    {featured.location} · {featured.city}
                  </p>
                  <h3 className="font-display mt-4 text-balance text-4xl leading-[1.05] tracking-tight md:text-[56px]">
                    {featured.title}
                  </h3>
                  <p className="mt-6 text-pretty text-base leading-relaxed text-muted-foreground">
                    {featured.tagline}
                  </p>

                  <div className="mt-10 grid grid-cols-3 gap-0 border-y border-foreground/10 py-6">
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                        Recámaras
                      </p>
                      <p className="font-display mt-2 text-2xl tabular">
                        {featured.bedrooms}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                        Superficie
                      </p>
                      <p className="font-display mt-2 text-2xl tabular">
                        {featured.area}
                        <span className="ml-1 text-sm font-normal text-muted-foreground">
                          m²
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                        Año
                      </p>
                      <p className="font-display mt-2 text-2xl tabular">
                        {featured.year}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
                      Valor estimado
                    </p>
                    <p className="font-display text-3xl tracking-tight tabular md:text-4xl">
                      {featured.priceOnRequest
                        ? "A consultar"
                        : formatPrice(featured.price, featured.currency)}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/propiedades/${featured.id}`}
                      className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                    >
                      Ver expediente completo
                      <ArrowUpRight
                        className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={1.5}
                      />
                    </Link>
                    <button
                      type="button"
                      className="inline-flex h-12 items-center gap-2 rounded-full border border-[color:var(--luxe)]/40 px-5 text-sm text-[color:var(--luxe)] transition-colors hover:bg-[color:var(--luxe)]/10"
                    >
                      <RotateCw className="size-4" strokeWidth={1.5} />
                      Iniciar tour 360°
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============ COLECCIÓN GRID ============ */}
      <section id="coleccion" className="relative bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:py-28">
          <div className="mb-12 flex flex-col gap-6 border-b border-foreground/10 pb-8 md:mb-16 md:flex-row md:items-end md:justify-between md:pb-10">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="h-px w-8 bg-[color:var(--luxe)]/70"
                  aria-hidden
                />
                <span className="font-mono text-[11px] tracking-[0.24em] text-[color:var(--luxe)] uppercase">
                  Catálogo privado · 02
                </span>
              </div>
              <h2 className="font-display max-w-2xl text-balance text-4xl leading-[1.05] tracking-tight md:text-[56px]">
                Cada inmueble se documenta como una obra.
              </h2>
            </div>
            <div className="flex items-center gap-6 font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
              <span>{vipProperties.length} piezas</span>
              <span>Actualizado hoy</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <VipPropertyCard key={p.id} property={p} priority={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ PUBLICAR CTA ============ */}
      <section className="relative border-t border-foreground/10 bg-foreground text-background">
        <div className="grain relative mx-auto max-w-[1400px] px-6 py-20 md:py-32">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-[color:var(--luxe)]" aria-hidden />
                <span className="font-mono text-[11px] tracking-[0.24em] text-[color:var(--luxe)] uppercase">
                  Publicar en la Colección Privada
                </span>
              </div>
              <h2 className="font-display text-balance text-4xl leading-[1.02] tracking-tight md:text-[64px]">
                Su propiedad{" "}
                <span className="italic text-[color:var(--luxe)]">
                  merece
                </span>{" "}
                más que un listado.
              </h2>
            </div>
            <div className="flex flex-col justify-between md:col-span-7">
              <p className="max-w-xl text-pretty text-base leading-relaxed text-background/75">
                Producción editorial, recorrido 360° profesional, concierge IA
                dedicado y distribución privada a una red de compradores
                verificados. Publicación reservada a inmuebles desde{" "}
                <span className="font-mono tabular text-background">
                  USD 1M
                </span>
                .
              </p>

              <div className="mt-10 grid grid-cols-2 gap-6 border-y border-white/15 py-8 md:grid-cols-4">
                <div>
                  <p className="font-display text-3xl tracking-tight tabular md:text-4xl">
                    48h
                  </p>
                  <p className="font-mono mt-2 text-[10px] tracking-[0.22em] text-background/60 uppercase">
                    Sesión editorial
                  </p>
                </div>
                <div>
                  <p className="font-display text-3xl tracking-tight tabular md:text-4xl">
                    360°
                  </p>
                  <p className="font-mono mt-2 text-[10px] tracking-[0.22em] text-background/60 uppercase">
                    Tour incluido
                  </p>
                </div>
                <div>
                  <p className="font-display text-3xl tracking-tight tabular md:text-4xl">
                    1:1
                  </p>
                  <p className="font-mono mt-2 text-[10px] tracking-[0.22em] text-background/60 uppercase">
                    Asesor dedicado
                  </p>
                </div>
                <div>
                  <p className="font-display text-3xl tracking-tight tabular md:text-4xl">
                    ∞
                  </p>
                  <p className="font-mono mt-2 text-[10px] tracking-[0.22em] text-background/60 uppercase">
                    IA 24/7
                  </p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/publicar"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-[color:var(--luxe)] px-6 text-sm font-medium text-[color:var(--luxe-foreground)] transition-opacity hover:opacity-90"
                >
                  Publicar en VIP
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.5}
                  />
                </Link>
                <span className="font-mono text-[10px] tracking-[0.22em] text-background/55 uppercase">
                  Sujeto a curaduría · Solicitar invitación
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICIOS — Alternative path ============ */}
      <section className="relative border-t border-foreground/10 bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:py-20">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-foreground/30" aria-hidden />
                <span className="font-mono text-[11px] tracking-[0.24em] text-muted-foreground uppercase">
                  ¿No va a publicar?
                </span>
              </div>
              <p className="font-display text-balance text-2xl leading-snug tracking-tight md:text-3xl">
                Si lo que necesita es{" "}
                <span className="italic text-muted-foreground">
                  asesoría patrimonial
                </span>
                , representación de compra o una valuación seria, hablemos
                fuera del contexto VIP.
              </p>
            </div>
            <Link
              href="/servicios"
              className="group inline-flex h-12 items-center gap-3 rounded-full border border-foreground/20 px-6 text-sm font-medium transition-colors hover:border-foreground/60"
            >
              Conocer la asesoría
              <ArrowUpRight
                className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <div className="h-28 md:h-0" aria-hidden />
      <MobileTabBar />
      <VipChatbot />
    </main>
  )
}
