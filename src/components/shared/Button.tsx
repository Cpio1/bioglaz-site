import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "whatsapp" | "light" | "ghost-dark";
type Size = "md" | "lg";

const base =
  "group relative inline-flex select-none items-center justify-center gap-2.5 rounded-full font-semibold transition-[transform,box-shadow,background-color,color,border-color] duration-300 ease-out active:scale-[0.98] motion-reduce:transform-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-brand to-electric text-white shadow-glow hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_rgb(54_120_246/0.75)]",
  secondary:
    "border border-line bg-white/80 text-navy backdrop-blur hover:-translate-y-0.5 hover:border-electric/40 hover:bg-white hover:shadow-soft",
  whatsapp:
    "bg-[#1FAF5A] text-white shadow-[0_12px_32px_-12px_rgb(31_175_90/0.8)] hover:-translate-y-0.5 hover:bg-[#1a9e51]",
  light: "bg-white text-navy hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_rgb(255_255_255/0.4)]",
  "ghost-dark": "border border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[15px]",
  lg: "h-14 px-7 text-base",
};

export function buttonClass(variant: Variant = "primary", size: Size = "lg", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
  external?: boolean;
};

export function ButtonLink({ variant, size, external, className, children, ...rest }: ButtonLinkProps) {
  return (
    <a
      className={buttonClass(variant, size, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
