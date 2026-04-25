import { SiteHeader } from "@/components/site-header"
import { MobileTabBar } from "@/components/mobile-tab-bar"

function PropertySkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-[4/3] animate-pulse rounded-lg bg-muted" />
      <div className="flex flex-col gap-2">
        <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
      </div>
      <div className="flex items-center gap-4 border-t border-foreground/10 pt-3">
        <div className="h-3 w-8 animate-pulse rounded bg-muted" />
        <div className="h-3 w-8 animate-pulse rounded bg-muted" />
        <div className="h-3 w-14 animate-pulse rounded bg-muted" />
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-background">
      <SiteHeader />

      {/* Hero skeleton */}
      <div className="relative h-[88svh] min-h-[600px] w-full animate-pulse bg-muted" />

      {/* Properties skeleton */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6">
          <div className="mb-10 flex flex-col gap-4 border-b border-foreground/10 pb-8 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <div className="h-2 w-32 animate-pulse rounded-full bg-muted" />
              <div className="h-10 w-72 animate-pulse rounded-lg bg-muted md:w-96" />
            </div>
            <div className="h-3 w-28 animate-pulse rounded bg-muted" />
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 pt-10 sm:grid-cols-2 lg:grid-cols-3 md:pt-14">
            <PropertySkeleton />
            <PropertySkeleton />
            <PropertySkeleton />
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 md:mt-20 md:grid-cols-2">
            <PropertySkeleton />
            <div className="flex flex-col justify-end gap-4">
              <div className="h-2 w-24 animate-pulse rounded-full bg-muted" />
              <div className="h-12 w-full animate-pulse rounded-lg bg-muted" />
              <div className="h-4 animate-pulse rounded bg-muted" />
              <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
              <div className="mt-2 h-11 w-44 animate-pulse rounded-full bg-muted" />
            </div>
          </div>
        </div>
      </section>

      <div className="h-24 md:h-0" aria-hidden />
      <MobileTabBar />
    </div>
  )
}
