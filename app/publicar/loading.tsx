import { SiteHeader } from "@/components/site-header"
import { MobileTabBar } from "@/components/mobile-tab-bar"

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-background">
      <SiteHeader />

      <section className="mx-auto max-w-[1400px] px-6 pt-24 pb-16 md:pt-36 md:pb-24">
        {/* Header skeleton */}
        <div className="mb-16 space-y-4 text-center md:mb-20">
          <div className="mx-auto h-2 w-24 animate-pulse rounded-full bg-muted" />
          <div className="mx-auto h-16 w-2/3 animate-pulse rounded-lg bg-muted md:h-20" />
          <div className="mx-auto h-4 w-1/2 animate-pulse rounded bg-muted" />
        </div>

        {/* Plans grid skeleton */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`animate-pulse rounded-2xl bg-muted ${
                i === 1 ? "h-[560px]" : "h-[480px]"
              }`}
            />
          ))}
        </div>

        {/* Form skeleton */}
        <div className="mt-20 grid grid-cols-1 gap-16 md:grid-cols-2">
          <div className="space-y-4">
            <div className="h-10 w-2/3 animate-pulse rounded-lg bg-muted" />
            <div className="h-4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-11 animate-pulse rounded-lg bg-muted" />
            ))}
            <div className="h-12 animate-pulse rounded-full bg-muted" />
          </div>
        </div>
      </section>

      <div className="h-24 md:h-0" aria-hidden />
      <MobileTabBar />
    </div>
  )
}
