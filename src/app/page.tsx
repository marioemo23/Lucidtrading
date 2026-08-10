import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { PartnersMarquee } from "@/components/PartnersMarquee";
import { StepsSection } from "@/components/StepsSection";
import { PricingTabs } from "@/components/PricingTabs";
import { TrustFaqSection } from "@/components/TrustFaqSection";
import { CtaDiscordSection } from "@/components/CtaDiscordSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <div className="mx-auto max-w-[1200px] px-6 py-16 lg:px-10">
          <PartnersMarquee />
        </div>
        <div className="mx-auto max-w-[1200px] px-6 pb-16 lg:px-10">
          <StepsSection />
        </div>
        <div className="mx-auto max-w-[1200px] px-6 pb-16 lg:px-10">
          <PricingTabs />
        </div>
        <TrustFaqSection />
        <CtaDiscordSection />
      </main>
      <SiteFooter />
    </>
  );
}
