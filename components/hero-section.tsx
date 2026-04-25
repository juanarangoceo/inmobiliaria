import Image from "next/image"
import { HeroSearch } from "@/components/hero-search"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-36 md:pb-28">
      {/* Ambient background */}
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

      <div className="mx-auto max-w-[1400px] px-6">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-foreground/30" aria-hidden />
            <span className="font-mono text-[11px] tracking-[0.24em] text-muted-foreground uppercase">
              Ed. {new Date().getFullYear()} · Vol. IV
            </span>
          </div>

          <h1 className="font-display text-balance text-5xl leading-[1.02] tracking-tight text-foreground md:text-7xl lg:text-[88px]">
            El inmueble correcto,{" "}
            <span className="italic text-muted-foreground">sin fricción.</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Inteligencia artificial que precalifica cada lead, verifica cada
            inmueble y te conecta sólo con lo que realmente importa. Curaduría
            editorial para arrendatarios y arrendadores exigentes.
          </p>

          {/* Search */}
          <div className="mt-10 md:mt-14">
            <HeroSearch />
          </div>

          {/* Trust metrics */}
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-foreground/10 pt-8 md:mt-14 md:max-w-xl md:gap-10">
            <div>
              <dt className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                Inmuebles
              </dt>
              <dd className="mt-1 font-display text-2xl tracking-tight text-foreground tabular md:text-3xl">
                12,480
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                Verificados IA
              </dt>
              <dd className="mt-1 font-display text-2xl tracking-tight text-foreground tabular md:text-3xl">
                98.2%
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                Tiempo de match
              </dt>
              <dd className="mt-1 font-display text-2xl tracking-tight text-foreground tabular md:text-3xl">
                4.8 min
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
