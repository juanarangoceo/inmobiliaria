import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MobileTabBar } from "@/components/mobile-tab-bar"

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-background">
      <SiteHeader />

      <section className="mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center px-6">
        <div className="max-w-2xl">
          <span className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground uppercase">
            404
          </span>
          <h1 className="font-display mt-4 text-balance text-[64px] leading-[0.96] tracking-tight md:text-[108px]">
            No{" "}
            <span className="italic text-muted-foreground">encontrado</span>
          </h1>
          <p className="mt-8 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
            Esta pieza ha sido retirada de la colección o nunca existió en el
            catálogo. Explore las propiedades disponibles.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Volver al catálogo
              <ArrowUpRight className="size-4" strokeWidth={1.5} />
            </Link>
            <Link
              href="/vip"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-foreground/20 px-6 text-sm font-medium transition-colors hover:border-foreground/60"
            >
              Colección VIP
            </Link>
          </div>
        </div>
      </section>

      {/* Decorative grid */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,var(--foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--foreground)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.025]"
      />

      <SiteFooter />
      <div className="h-24 md:h-0" aria-hidden />
      <MobileTabBar />
    </main>
  )
}
