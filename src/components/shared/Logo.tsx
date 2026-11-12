import { cn } from "@/lib/cn";

/** Текстовый бренд с абстрактным знаком (без копирования логотипа упаковки). */
export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span aria-hidden="true" className="relative grid size-8 place-items-center rounded-full bg-gradient-to-br from-electric to-navy shadow-glow">
        <span className="size-3.5 rounded-full bg-white/95 ring-[3px] ring-turq/80" />
        <span className="absolute right-[7px] top-[7px] size-1.5 rounded-full bg-white" />
      </span>
      <span
        className={cn(
          "text-[19px] font-extrabold uppercase tracking-[0.08em]",
          dark ? "text-white" : "text-navy",
        )}
      >
        Био<span className={dark ? "text-turq" : "text-electric"}>глаз</span>
      </span>
    </span>
  );
}
