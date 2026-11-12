import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  id?: string;
  className?: string;
};

export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em]",
        dark ? "bg-white/10 text-turq ring-1 ring-white/15" : "bg-ice text-brand ring-1 ring-electric/15",
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", dark ? "bg-turq" : "bg-electric")} />
      {children}
    </span>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, align = "left", dark = false, id, className }: Props) {
  return (
    <Reveal className={cn("flex flex-col gap-4", align === "center" && "items-center text-center", className)}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className={cn(
          "max-w-3xl text-[32px] font-extrabold leading-[1.08] tracking-[-0.025em] sm:text-[40px] lg:text-[52px]",
          dark ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("max-w-2xl text-[17px] leading-relaxed lg:text-lg", dark ? "text-white/70" : "text-muted")}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
