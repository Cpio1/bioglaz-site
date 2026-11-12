import { usage } from "@/content/site";
import { Stagger, StaggerItem } from "@/components/shared/Reveal";

/** Горизонтальная инфографика: большие цифры, соединённые линией. */
export function DesktopUsageSteps() {
  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute left-[8%] right-[8%] top-[44px] h-px bg-[linear-gradient(90deg,transparent,rgb(86_214_209/0.6),rgb(54_120_246/0.6),transparent)]" />
      <Stagger as="ol" className="relative grid grid-cols-3 gap-5">
        {usage.steps.map((s) => (
          <StaggerItem as="li" key={s.num} className="group flex flex-col">
            <div className="flex justify-center">
              <span className="relative grid size-[88px] place-items-center rounded-full bg-[#0b1f52] ring-1 ring-white/15 transition-transform duration-500 group-hover:scale-105">
                <span className="absolute inset-2 rounded-full bg-[radial-gradient(circle,rgb(54_120_246/0.45),transparent_70%)]" />
                <span className="relative size-3 rounded-full bg-turq shadow-[0_0_20px_4px_rgb(86_214_209/0.6)]" />
              </span>
            </div>
            <div className="mt-6 flex-1 rounded-[30px] bg-white/[0.05] p-8 text-center ring-1 ring-white/10 backdrop-blur transition-colors duration-500 group-hover:bg-white/[0.08]">
              <span className="block text-[88px] font-extrabold leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.5px_rgb(255_255_255/0.45)]">
                {s.num}
              </span>
              <h3 className="mt-4 text-[26px] font-bold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-[16px] text-white/70">{s.text}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
