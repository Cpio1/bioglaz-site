import { why } from "@/content/site";
import { Stagger, StaggerItem } from "@/components/shared/Reveal";
import { CapsuleCalendar, RegistrationChip, ingredientChips, whyIcons } from "@/components/shared/WhyParts";

const [pack, formula, origin, registration] = why.items;

export function DesktopWhy() {
  const FIcon = whyIcons.formula;
  const OIcon = whyIcons.origin;
  const RIcon = whyIcons.registration;
  return (
    <Stagger className="grid grid-cols-12 gap-5">
      {/* 90 капсул — крупная инфографика */}
      <StaggerItem as="article" className="col-span-5 row-span-2 flex flex-col rounded-[36px] bg-[linear-gradient(160deg,#ffffff,#eaf3ff)] p-9 ring-1 ring-line">
        <div className="flex items-end gap-3">
          <span className="text-gradient text-[128px] font-extrabold leading-[0.8] tracking-[-0.06em]">90</span>
          <span className="pb-2 text-[22px] font-bold text-navy">капсул</span>
        </div>
        <h3 className="mt-6 text-[24px] font-extrabold tracking-tight text-navy">{pack.title}</h3>
        <p className="mt-2 max-w-sm text-[16px] leading-relaxed text-muted">{pack.text}</p>
        <CapsuleCalendar className="mt-auto pt-8" />
      </StaggerItem>

      {/* Лютеин и витамины */}
      <StaggerItem as="article" className="relative col-span-7 overflow-hidden rounded-[36px] bg-white p-9 ring-1 ring-line transition-shadow duration-500 hover:shadow-lift">
        <div aria-hidden="true" className="absolute -right-20 -top-20 size-64 rounded-full border border-electric/15" />
        <div aria-hidden="true" className="absolute -right-8 -top-8 size-40 rounded-full border border-electric/10" />
        <span className="grid size-12 place-items-center rounded-2xl bg-ice text-brand">
          <FIcon aria-hidden="true" className="size-6" />
        </span>
        <h3 className="mt-5 text-[24px] font-extrabold tracking-tight text-navy">{formula.title}</h3>
        <p className="mt-2 max-w-lg text-[16px] leading-relaxed text-muted">{formula.text}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Компоненты состава">
          {ingredientChips.map((c, i) => (
            <li
              key={c}
              className={
                i === 0
                  ? "rounded-full bg-gradient-to-r from-turq to-electric px-4 py-1.5 text-[14px] font-bold text-white"
                  : "rounded-full bg-soft px-3.5 py-1.5 text-[14px] font-semibold text-brand ring-1 ring-line"
              }
            >
              {c}
            </li>
          ))}
        </ul>
      </StaggerItem>

      {/* Производство в Казахстане — тёмная карточка с кругом */}
      <StaggerItem as="article" className="on-dark relative col-span-3 overflow-hidden rounded-[36px] bg-navy p-8 text-white">
        <div aria-hidden="true" className="absolute -bottom-24 -right-24 size-64 rounded-full bg-[radial-gradient(circle,rgb(54_120_246/0.55),transparent_70%)]" />
        <span className="relative grid size-12 place-items-center rounded-full bg-white/10 ring-1 ring-white/15">
          <OIcon aria-hidden="true" className="size-6 text-turq" />
        </span>
        <h3 className="relative mt-5 text-[21px] font-extrabold leading-tight tracking-tight">{origin.title}</h3>
        <p className="relative mt-2 text-[15px] leading-relaxed text-white/70">{origin.text}</p>
      </StaggerItem>

      {/* Документированная регистрация */}
      <StaggerItem as="article" className="relative col-span-4 overflow-hidden rounded-[36px] bg-[linear-gradient(140deg,rgb(86_214_209/0.35),rgb(234_243_255)_70%)] p-8 ring-1 ring-turq/30">
        <span className="grid size-12 place-items-center rounded-2xl bg-white/80 text-[#0f6f6b]">
          <RIcon aria-hidden="true" className="size-6" />
        </span>
        <h3 className="mt-5 text-[21px] font-extrabold leading-tight tracking-tight text-navy">{registration.title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{registration.text}</p>
        <div className="mt-5">
          <RegistrationChip />
        </div>
      </StaggerItem>
    </Stagger>
  );
}
