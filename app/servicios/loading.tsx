import { SiteHeader } from "@/components/site-header"
import { MobileTabBar } from "@/components/mobile-tab-bar"

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-background">
      <SiteHeader />

      {/* Hero skeleton */}
      <div className="relative h-[55svh] min-h-[420px] animate-pulse bg-muted" />

      {/* Services grid skeleton */}
      <section className="mx-auto max-w-[1400px] px-6 py-16 md:py-24">
        <div className="mb-12 space-y-4 md:mb-16">
          <div className="h-2 w-24 animate-pulse rounded-full bg-muted" />
          <div className="h-12 w-2/3 animate-pulse rounded-lg bg-muted" />
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      </section>

      {/* Stats skeleton */}
      <section className="border-y border-foreground/10">
        <div className="mx-auto max-w-[1400px] px-6 py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-10 w-20 animate-pulse rounded-lg bg-muted" />
                <div className="h-3 w-28 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-24 md:h-0" aria-hidden />
      <MobileTabBar />
    </div>
  )
}
