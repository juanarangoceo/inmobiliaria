import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProperties } from "@/components/featured-properties"
import { TerritoriosSection } from "@/components/territorios-section"
import { TikTokBridge } from "@/components/tiktok-bridge"
import { ServicesBand } from "@/components/services-band"
import { MobileTabBar } from "@/components/mobile-tab-bar"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="relative min-h-screen bg-background">
      <SiteHeader />
      <HeroSection />
      <FeaturedProperties />
      <TerritoriosSection />
      <TikTokBridge />
      <ServicesBand />
      <SiteFooter />

      {/* Footer spacer for mobile tab bar */}
      <div className="h-24 md:h-0" aria-hidden />

      <MobileTabBar />
    </main>
  )
}
