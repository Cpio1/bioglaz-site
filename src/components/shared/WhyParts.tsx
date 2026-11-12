import { BadgeCheck, Factory, FlaskConical } from "lucide-react";
import { registration } from "@/content/site";

/** Инфографика: 3 капсулы × 30 дней = 90 капсул. */
export function CapsuleCalendar({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="grid grid-cols-10 gap-1.5">
        {Array.from({ length: 30 }, (_, d) => (
          <div key={d} className="flex aspect-square flex-col items-center justify-center gap-[2px] rounded-md bg-white/80 ring-1 ring-electric/10">
            {[0, 1, 2].map((k) => (
              <span key={k} className="h-[3px] w-[55%] rounded-full bg-gradient-to-r from-brand to-electric" />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between text-[12px] font-semibold text-muted">
        <span>День 1</span>
        <span>3 капсулы в день</span>
        <span>День 30</span>
      </div>
    </div>
  );
}

export const whyIcons = { formula: FlaskConical, origin: Factory, registration: BadgeCheck } as const;

export function RegistrationChip() {
  return (
    <span className="inline-flex max-w-full flex-col rounded-2xl bg-white/70 px-4 py-2.5 ring-1 ring-white">
      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f6f6b]">Свидетельство от {registration.dateDisplay}</span>
      <span className="break-all font-mono text-[13px] font-semibold text-navy">№ {registration.number}</span>
    </span>
  );
}

export const ingredientChips = ["Лютеин", "A", "C", "E", "D3", "B1", "B2", "B3", "B5", "B6", "B9", "B12", "Биотин"];
