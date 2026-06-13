import Image from "next/image"
import { getTikTokFeatured } from "@/lib/sanity/queries"
import { WaitlistForm } from "@/components/waitlist-form"

export async function TikTokBridge() {
  const p = await getTikTokFeatured()
  if (!p) return null

  return (
    <section className="relative border-t border-foreground/10 bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Imagen de la propiedad del último carrusel */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted md:aspect-[4/3]">
            <Image
              src={p.image || "/placeholder.svg"}
              alt={p.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="scrim-card pointer-events-none absolute inset-0" aria-hidden />
            <span className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.2em] text-white/85 uppercase">
              {p.code}
            </span>
          </div>

          {/* Gancho + captura */}
          <div>
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8 bg-[color:var(--luxe-ink)]" aria-hidden />
              <span className="font-mono text-[11px] tracking-[0.24em] text-[color:var(--luxe-ink)] uppercase">
                Visto en @visionestatecolombia
              </span>
            </div>
            <h2 className="font-display text-balance text-3xl leading-[1.08] tracking-tight md:text-5xl">
              La ubicación que no revelamos{" "}
              <span className="italic text-muted-foreground">en el video.</span>
            </h2>
            <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
              {p.tagline ||
                "Déjanos tu correo y te enviamos la ficha completa de esta propiedad, con ubicación y detalles."}
            </p>

            <div className="mt-8 max-w-md">
              <WaitlistForm
                source="tiktok"
                propertyRef={p.id}
                cta="Recibir la ficha"
                compact
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
