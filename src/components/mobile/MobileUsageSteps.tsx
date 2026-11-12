import { usage } from "@/content/site";
import { Stagger, StaggerItem } from "@/components/shared/Reveal";

/** Вертикальная «лента» шагов — естественно читается на узком экране. */
export function MobileUsageSteps() {
  return (
    <Stagger as="ol" className="relative mx-auto flex max-w-xl flex-col gap-3">
      <span aria-hidden="true" className="absolute bottom-8 left-[31px] top-8 w-px bg-[linear-gradient(180deg,rgb(86_214_209/0.7),rgb(54_120_246/0.5))]" />
      {usage.steps.map((s) => (
        <StaggerItem as="li" key={s.num} className="relative flex items-center gap-4">
          <span className="relative z-10 grid size-16 shrink-0 place-items-center rounded-full bg-[#0b1f52] text-[22px] font-extrabold tracking-tight text-white ring-1 ring-white/20">
            {s.num}
          </span>
          <div className="min-w-0 flex-1 rounded-[22px] bg-white/[0.06] px-5 py-4 ring-1 ring-white/10">
            <h3 className="text-[19px] font-bold leading-tight">{s.title}</h3>
            <p className="mt-1 text-[15px] text-white/70">{s.text}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
