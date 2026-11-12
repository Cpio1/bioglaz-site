import { siteMedia as media } from "@/lib/media";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { FloatingWhatsApp } from "@/components/shared/FloatingWhatsApp";
import { JsonLd } from "@/components/shared/JsonLd";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { CompositionSection } from "@/components/sections/CompositionSection";
import { UsageSection } from "@/components/sections/UsageSection";
import { DocumentsSection } from "@/components/sections/DocumentsSection";
import { WhySection } from "@/components/sections/WhySection";
import { OrderSection } from "@/components/sections/OrderSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactsSection } from "@/components/sections/ContactsSection";

export default function Home() {
  return (
    <>
      <JsonLd />
      <SiteHeader />
      <main id="main">
        <HeroSection photo={media.product} />
        <AboutSection photo={media.product} />
        <CompositionSection />
        <UsageSection />
        <DocumentsSection certificate={media.certificate} />
        <WhySection />
        <OrderSection photo={media.product} />
        <FaqSection />
        <ContactsSection />
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
