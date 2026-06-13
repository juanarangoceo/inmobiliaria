import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MobileTabBar } from "@/components/mobile-tab-bar"

export function LegalShell({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string
  title: string
  updated: string
  children: React.ReactNode
}) {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="mx-auto max-w-[820px] px-6 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-[color:var(--luxe)]" aria-hidden />
          <span className="font-mono text-[11px] tracking-[0.3em] text-[color:var(--luxe-ink)] uppercase">
            {eyebrow}
          </span>
        </div>
        <h1 className="mt-6 font-display text-balance text-4xl leading-[1.05] tracking-tight md:text-6xl">
          {title}
        </h1>
        <p className="mt-4 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
          Última actualización · {updated}
        </p>

        <div className="legal-prose mt-12 space-y-8 text-[15px] leading-relaxed text-foreground/85">
          {children}
        </div>
      </section>

      <SiteFooter />
      <div className="h-24 md:h-0" aria-hidden />
      <MobileTabBar />
    </main>
  )
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string
  children: React.ReactNode
}) {
  return (
    <section className="border-t border-foreground/10 pt-8">
      <h2 className="font-display text-2xl leading-tight tracking-tight md:text-3xl">
        {heading}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  )
}
