import Image from "next/image";
import type { HeroPhoto } from "@/lib/media";
import { cn } from "@/lib/cn";
import { HERO_IMAGE_SIZES } from "./heroShared";

const ALT = "БИОГЛАЗ — баночка витаминного комплекса с лютеином, 90 капсул";

/**
 * Главная фотография hero (public/images/main-page.*).
 * Контейнер повторяет пропорции файла (из манифеста) — фото не обрезается,
 * не растягивается, а место под него зарезервировано заранее (без layout shift).
 */
export function HeroImage({ photo, className }: { photo: HeroPhoto; className?: string }) {
  return (
    <figure
      className={cn(
        "relative w-full overflow-hidden rounded-[28px] bg-navy shadow-[0_40px_80px_-30px_rgb(9_27_69/0.55),0_18px_36px_-18px_rgb(23_70_162/0.35)] ring-1 ring-white/70 lg:rounded-[36px]",
        className,
      )}
      style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
    >
      <Image
        src={photo.src}
        alt={ALT}
        fill
        sizes={HERO_IMAGE_SIZES}
        quality={90}
        loading="eager"
        fetchPriority="high"
        className="object-contain"
      />
      {/* Тонкий световой блик по краю — «стеклянная» подача без вмешательства в фото */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_rgb(255_255_255/0.35),inset_0_0_0_1px_rgb(255_255_255/0.08)]"
      />
    </figure>
  );
}
