import { why } from "@/content/site";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { CapsuleCalendar, RegistrationChip, ingredientChips, whyIcons } from "@/components/shared/WhyParts";

const [pack, formula, origin, registration] = why.items;

export function MobileWhy() {
  const FIcon = whyIcons.formula;
  const OIcon = whyIcons.origin;
  const RIcon = whyIcons.registration;
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4">
      <Reveal className="rounded-[30px] bg-[linear-gradient(160deg,#ffffff,#eaf3ff)] p-6 ring-1 ring-line">
        <div className="flex items-end gap-2">
          <span className="text-gradient text-[88px] font-extrabold leading-[0.8] tracking-[-0.06em]">90</span>
          <span className="pb-1 text-[18px] font-bold text-navy">капсул</span>
        </div>
        <h3 className="mt-4 text-[20px] font-extrabold tracking-tight text-navy">{pack.title}</h3>
        <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{pack.text}</p>
        <CapsuleCalendar className="mt-6" />
      </Reveal>

      <Stagger className="flex flex-col gap-4">
        <StaggerItem as="article" className="rounded-[28px] bg-white p-6 ring-1 ring-line">
          <div className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-ice text-brand">
              <FIcon aria-hidden="true" className="size-5" />
            </span>
            <h3 className="text-[19px] font-extrabold leading-tight tracking-tight text-navy">{formula.title}</h3>
          </div>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{formula.text}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Компоненты состава">
            {ingredientChips.map((c, i) => (
              <li
                key={c}
                className={
                  i === 0
                    ? "rounded-full bg-gradient-to-r from-turq to-electric px-3 py-1 text-[13px] font-bold text-white"
                    : "rounded-full bg-soft px-2.5 py-1 text-[13px] font-semibold text-brand ring-1 ring-line"
                }
              >
                {c}
              </li>
            ))}
          </ul>
        </StaggerItem>

        <StaggerItem as="article" className="on-dark relative overflow-hidden rounded-[28px] bg-navy p-6 text-white">
          <div aria-hidden="true" className="absolute -bottom-20 -right-16 size-52 rounded-full bg-[radial-gradient(circle,rgb(54_120_246/0.55),transparent_70%)]" />
          <div className="relative flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 ring-1 ring-white/15">
              <OIcon aria-hidden="true" className="size-5 text-turq" />
            </span>
            <h3 className="text-[19px] font-extrabold leading-tight tracking-tight">{origin.title}</h3>
          </div>
          <p className="relative mt-3 text-[15px] leading-relaxed text-white/70">{origin.text}</p>
        </StaggerItem>

        <StaggerItem as="article" className="rounded-[28px] bg-[linear-gradient(140deg,rgb(86_214_209/0.35),rgb(234_243_255)_70%)] p-6 ring-1 ring-turq/30">
          <div className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/80 text-[#0f6f6b]">
              <RIcon aria-hidden="true" className="size-5" />
            </span>
            <h3 className="text-[19px] font-extrabold leading-tight tracking-tight text-navy">{registration.title}</h3>
          </div>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">{registration.text}</p>
          <div className="mt-4">
            <RegistrationChip />
          </div>
        </StaggerItem>
      </Stagger>
    </div>
  );
}
