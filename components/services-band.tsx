import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export function ServicesBand() {
  return (
    <section className="relative border-t border-foreground/10 bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:py-32">
        <div className="relative isolate overflow-hidden bg-foreground text-background">
          <Image
            src="/servicios/home-band.jpg"
            alt="Estudio de asesoría Habitar"
            fill
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/15"
          />

          <div className="relative z-10 grid grid-cols-1 gap-10 px-8 py-16 md:grid-cols-12 md:gap-12 md:px-14 md:py-24 lg:px-20 lg:py-28">
            <div className="md:col-span-7">
              <div className="flex items-center gap-3">
                <span
                  className="h-px w-10 bg-[color:var(--luxe)]"
                  aria-hidden
                />
                <span className="font-mono text-[11px] tracking-[0.32em] text-[color:var(--luxe)] uppercase">
                  Habitar · Asesoría
                </span>
              </div>

              <h2 className="font-display mt-6 max-w-2xl text-balance text-4xl leading-[1.02] tracking-tight md:text-[64px] lg:text-[72px]">
                Más allá del listado.{" "}
                <span className="italic text-[color:var(--luxe)]">
                  Una casa
                </span>{" "}
                de representación.
              </h2>

              <p className="mt-8 max-w-lg text-pretty text-[15px] leading-relaxed text-white/80 md:text-base">
                Intermediación discreta, representación de compra, valuación
                patrimonial y producción editorial. Una boutique inmobiliaria
                para operaciones donde el silencio vale tanto como el inmueble.
              </p>
            </div>

            <div className="flex flex-col justify-end md:col-span-5 md:items-end">
              <ul className="grid grid-cols-2 gap-8 border-y border-white/15 py-8 md:w-full">
                <li>
                  <p className="font-display text-2xl tracking-tight tabular md:text-3xl">
                    USD 420M
                  </p>
                  <p className="font-mono mt-2 text-[10px] tracking-[0.22em] text-white/55 uppercase">
                    Asesorados · 2025
                  </p>
                </li>
                <li>
                  <p className="font-display text-2xl tracking-tight tabular md:text-3xl">
                    94<span className="text-lg">%</span>
                  </p>
                  <p className="font-mono mt-2 text-[10px] tracking-[0.22em] text-white/55 uppercase">
                    Cierre sobre mandato
                  </p>
                </li>
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-4 md:justify-end">
                <Link
                  href="/servicios"
                  className="group inline-flex h-12 items-center gap-3 rounded-full bg-[color:var(--luxe)] px-6 text-sm font-medium text-[color:var(--luxe-foreground)] transition-opacity hover:opacity-90"
                >
                  Conocer la asesoría
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.75}
                  />
                </Link>
                <Link
                  href="/servicios#contacto"
                  className="group inline-flex items-center gap-2 text-sm text-white/85 hover:text-white"
                >
                  <span className="font-mono text-[11px] tracking-[0.22em] uppercase">
                    Agendar consultoría
                  </span>
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.5}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
