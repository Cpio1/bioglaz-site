import { cn } from "@/lib/cn";

/**
 * Декоративные градиентные пятна. Всегда aria-hidden и pointer-events-none,
 * размещаются внутри секции с overflow-hidden — не выходят за композицию.
 */
export function Blob({
  className,
  color = "electric",
  animated = false,
}: {
  className?: string;
  color?: "electric" | "turq" | "brand" | "ice" | "white";
  animated?: boolean;
}) {
  const colors = {
    electric: "bg-[radial-gradient(circle_at_center,rgb(54_120_246/0.35),transparent_68%)]",
    turq: "bg-[radial-gradient(circle_at_center,rgb(86_214_209/0.32),transparent_68%)]",
    brand: "bg-[radial-gradient(circle_at_center,rgb(23_70_162/0.5),transparent_68%)]",
    ice: "bg-[radial-gradient(circle_at_center,rgb(234_243_255/1),transparent_70%)]",
    white: "bg-[radial-gradient(circle_at_center,rgb(255_255_255/0.18),transparent_68%)]",
  } as const;
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full",
        colors[color],
        animated && "animate-drift motion-reduce:animate-none",
        className,
      )}
    />
  );
}

/** Тонкое кольцо — декоративная линия. */
export function Ring({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute rounded-full border",
        dark ? "border-white/10" : "border-electric/15",
        className,
      )}
    />
  );
}
