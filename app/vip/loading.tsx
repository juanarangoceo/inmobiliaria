import { SiteHeader } from "@/components/site-header"
import { MobileTabBar } from "@/components/mobile-tab-bar"

export default function Loading() {
  return (
    <div className="relative bg-background">
      <SiteHeader />

      {/* Hero skeleton */}
      <div className="relative h-[100svh] min-h-[640px] w-full animate-pulse bg-muted" />

      {/* Features skeleton */}
      <section className="border-b border-foreground/10">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:py-28">
          <div className="mb-12 space-y-4 md:mb-16">
            <div className="h-2 w-24 animate-pulse rounded-full bg-muted" />
            <div className="h-14 w-2/3 animate-pulse rounded-lg bg-muted" />
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-foreground/10 bg-foreground/10 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-background p-8 md:p-10">
                <div className="mb-8 aspect-[4/3] animate-pulse bg-muted" />
                <div className="h-2 w-20 animate-pulse rounded-full bg-muted" />
                <div className="mt-3 h-8 w-3/4 animate-pulse rounded-lg bg-muted" />
                <div className="mt-4 space-y-2">
                  <div className="h-3 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-4/5 animate-pulse rounded bg-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured editorial skeleton */}
      <section className="bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:py-28">
          <div className="mb-12 flex items-center gap-3 md:mb-14">
            <div className="h-px w-8 bg-muted" aria-hidden />
            <div className="h-2 w-32 animate-pulse rounded-full bg-muted" />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-7">
              <div className="aspect-[4/5] animate-pulse rounded-sm bg-muted md:aspect-[5/6]" />
            </div>
            <div className="flex flex-col gap-6 md:col-span-5">
              <div className="h-3 w-40 animate-pulse rounded-full bg-muted" />
              <div className="h-16 animate-pulse rounded-lg bg-muted" />
              <div className="space-y-2">
                <div className="h-3 animate-pulse rounded bg-muted" />
                <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
              </div>
              <div className="grid grid-cols-3 gap-0 border-y border-foreground/10 py-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-2 w-14 animate-pulse rounded bg-muted" />
                    <div className="h-8 w-10 animate-pulse rounded bg-muted" />
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <div className="h-12 w-44 animate-pulse rounded-full bg-muted" />
                <div className="h-12 w-36 animate-pulse rounded-full bg-muted" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collection grid skeleton */}
      <section className="bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-20 md:py-28">
          <div className="mb-12 space-y-4 border-b border-foreground/10 pb-8 md:mb-16 md:pb-10">
            <div className="h-2 w-24 animate-pulse rounded-full bg-muted" />
            <div className="h-12 w-2/3 animate-pulse rounded-lg bg-muted" />
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="aspect-[4/5] animate-pulse rounded-sm bg-muted" />
                <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-28 md:h-0" aria-hidden />
      <MobileTabBar />
    </div>
  )
}
