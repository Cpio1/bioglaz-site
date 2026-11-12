import Image from "next/image";
import type { ProductPhoto } from "@/lib/media";
import { cn } from "@/lib/cn";

type Props = {
  photo: ProductPhoto | null;
  /** Атрибут sizes для адаптивной загрузки. Одинаковый sizes в мобильной и десктопной версии = один запрос. */
  sizes: string;
  priority?: boolean;
  tone?: "light" | "dark";
  className?: string;
  alt?: string;
};

const DEFAULT_ALT = "Баночка БИОГЛАЗ — витаминный комплекс с лютеином, 90 капсул";

/**
 * Реальная фотография упаковки. Контейнер задаёт пропорции, изображение — object-contain:
 * баночка никогда не обрезается и не искажается.
 */
export function ProductVisual({ photo, sizes, priority, tone = "light", className, alt = DEFAULT_ALT }: Props) {
  if (!photo) return <ProductPlaceholder tone={tone} className={className} />;

  if (photo.transparent) {
    return (
      <div className={cn("relative aspect-[4/5] w-full", className)}>
        <Image
          src={photo.src}
          alt={alt}
          fill
          sizes={sizes}
          quality={90}
          {...(priority ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
          className={cn(
            "object-contain",
            tone === "dark"
              ? "drop-shadow-[0_40px_60px_rgb(0_0_0/0.45)]"
              : "drop-shadow-[0_40px_50px_rgb(9_27_69/0.28)]",
          )}
        />
      </div>
    );
  }

  // Фото с фоном — аккуратная «рамка», без обрезки
  return (
    <div
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden rounded-[32px] bg-white p-3 shadow-lift ring-1",
        tone === "dark" ? "ring-white/15" : "ring-line",
        className,
      )}
    >
      <div className="relative size-full">
        <Image
          src={photo.src}
          alt={alt}
          fill
          sizes={sizes}
          quality={90}
          {...(priority ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
          className="rounded-[24px] object-contain"
        />
      </div>
    </div>
  );
}

/**
 * Временное состояние, пока фото упаковки не добавлено в public/images.
 * Это абстрактная композиция из капсул — не имитация упаковки продукта.
 */
function ProductPlaceholder({ tone, className }: { tone: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  return (
    <div className={cn("relative grid aspect-[4/5] w-full place-items-center", className)} role="img" aria-label="Капсулы витаминного комплекса БИОГЛАЗ">
      <div
        className={cn(
          "relative grid aspect-square w-[78%] place-items-center rounded-full",
          dark
            ? "bg-[radial-gradient(circle_at_30%_25%,rgb(255_255_255/0.22),rgb(255_255_255/0.04)_60%)] ring-1 ring-white/15"
            : "bg-[radial-gradient(circle_at_30%_25%,#ffffff,#eaf3ff_65%)] shadow-lift ring-1 ring-white",
        )}
      >
        <Capsule className="left-[18%] top-[30%] w-[38%] -rotate-[28deg]" />
        <Capsule className="right-[16%] top-[22%] w-[30%] rotate-[38deg]" soft />
        <Capsule className="bottom-[22%] left-[34%] w-[42%] rotate-[12deg]" />
        <span
          className={cn(
            "absolute bottom-[9%] text-[11px] font-bold uppercase tracking-[0.3em]",
            dark ? "text-white/55" : "text-brand/60",
          )}
        >
          340 мг · 90 капсул
        </span>
      </div>
      {process.env.NODE_ENV !== "production" && (
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-amber-100 px-3 py-1 text-[11px] font-semibold text-amber-900">
          Добавьте фото: public/images/bioglaz-jar-transparent.png
        </span>
      )}
    </div>
  );
}

function Capsule({ className, soft = false }: { className?: string; soft?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute flex aspect-[2.6/1] overflow-hidden rounded-full shadow-[0_14px_30px_-10px_rgb(9_27_69/0.45)]",
        soft && "opacity-80",
        className,
      )}
    >
      <span className="h-full w-1/2 bg-gradient-to-b from-[#2f63d8] to-navy" />
      <span className="h-full w-1/2 bg-gradient-to-b from-white to-[#d7e6ff]" />
      <span className="absolute inset-x-[8%] top-[14%] h-[22%] rounded-full bg-white/45 blur-[1px]" />
    </span>
  );
}
