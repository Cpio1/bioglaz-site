import type { ProductPhoto } from "@/lib/media";
import { DesktopHero } from "@/components/desktop/DesktopHero";
import { MobileHero } from "@/components/mobile/MobileHero";

export function HeroSection({ photo }: { photo: ProductPhoto | null }) {
  return (
    <section id="home" data-anchor aria-label="БИОГЛАЗ — главный экран" className="relative overflow-hidden bg-soft">
      <div className="hidden lg:block">
        <DesktopHero photo={photo} />
      </div>
      <div className="lg:hidden">
        <MobileHero photo={photo} />
      </div>
    </section>
  );
}
