import type { HeroPhoto, ProductPhoto } from "@/lib/media";
import { DesktopHero } from "@/components/desktop/DesktopHero";
import { MobileHero } from "@/components/mobile/MobileHero";

export function HeroSection({ hero, photo }: { hero: HeroPhoto | null; photo: ProductPhoto | null }) {
  return (
    <section id="home" data-anchor aria-label="БИОГЛАЗ — главный экран" className="relative overflow-hidden bg-soft">
      <div className="hidden lg:block">
        <DesktopHero hero={hero} photo={photo} />
      </div>
      <div className="lg:hidden">
        <MobileHero hero={hero} photo={photo} />
      </div>
    </section>
  );
}
