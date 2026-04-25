import { SiteHeader } from "@/components/site-header"
import { MobileTabBar } from "@/components/mobile-tab-bar"

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-background">
      <SiteHeader />

      {/* Breadcrumb skeleton */}
      <div className="mx-auto max-w-[1400px] px-6 pt-24 md:pt-32">
        <div className="h-3 w-32 animate-pulse rounded-full bg-muted" />
      </div>

      {/* Title block skeleton */}
      <section className="mx-auto max-w-[1400px] px-6 pt-6 pb-8 md:pt-10 md:pb-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="h-5 w-24 animate-pulse rounded-full bg-muted" />
            <div className="h-16 w-3/4 animate-pulse rounded-lg bg-muted md:h-24" />
            <div className="h-4 w-48 animate-pulse rounded bg-muted" />
          </div>
          <div className="space-y-3 md:items-end">
            <div className="h-3 w-24 animate-pulse rounded bg-muted" />
            <div className="h-12 w-48 animate-pulse rounded-lg bg-muted" />
            <div className="flex gap-2">
              <div className="h-10 w-24 animate-pulse rounded-full bg-muted" />
              <div className="h-10 w-28 animate-pulse rounded-full bg-muted" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery skeleton */}
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-[2fr_1fr] md:grid-rows-1">
          <div className="aspect-[4/3] animate-pulse rounded-lg bg-muted" />
          <div className="hidden md:grid md:grid-rows-2 md:gap-2">
            <div className="animate-pulse rounded-lg bg-muted" />
            <div className="animate-pulse rounded-lg bg-muted" />
          </div>
        </div>
      </div>

      {/* Specs strip skeleton */}
      <section className="mx-auto max-w-[1400px] px-6 pt-12 md:pt-16">
        <div className="grid grid-cols-2 divide-x divide-foreground/10 border-y border-foreground/10 md:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="px-4 py-5 md:py-6">
              <div className="h-2 w-16 animate-pulse rounded bg-muted" />
              <div className="mt-3 h-7 w-10 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </section>

      {/* Body + sidebar skeleton */}
      <section className="mx-auto max-w-[1400px] px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-[1.5fr_1fr] md:gap-20">
          <div className="space-y-6">
            <div className="h-2 w-20 animate-pulse rounded-full bg-muted" />
            <div className="h-10 w-2/3 animate-pulse rounded-lg bg-muted" />
            <div className="mt-10 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-4 animate-pulse rounded bg-muted ${
                    i === 3 ? "w-4/5" : "w-full"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-72 animate-pulse rounded-2xl bg-muted" />
            <div className="h-36 animate-pulse rounded-2xl bg-muted" />
            <div className="h-40 animate-pulse rounded-2xl bg-muted" />
          </div>
        </div>
      </section>

      <div className="h-24 md:h-0" aria-hidden />
      <MobileTabBar />
    </div>
  )
}
