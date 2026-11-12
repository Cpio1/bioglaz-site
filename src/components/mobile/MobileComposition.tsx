import { ChevronDown } from "lucide-react";
import { bVitamins, coreVitamins, lutein } from "@/content/site";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { LuteinMark } from "@/components/shared/LuteinMark";

/**
 * Мобильная структура состава: крупная карточка лютеина, компактный список
 * A/C/E/D3 и раскрывающиеся пункты группы B (native <details> — доступно без JS).
 */
export function MobileComposition() {
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4">
      <Reveal className="relative overflow-hidden rounded-[30px] bg-[linear-gradient(160deg,#0e2560,#091b45_60%,#06122f)] p-6 text-white sm:p-8">
        <LuteinMark className="pointer-events-none absolute -right-12 -top-12 size-52 opacity-90" />
        <span className="relative inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-turq ring-1 ring-white/15">
          Ключевой компонент
        </span>
        <h3 className="relative mt-16 text-[44px] font-extrabold leading-none tracking-[-0.04em]">
          <span className="text-gradient-light">{lutein.name}</span>
        </h3>
        <p className="relative mt-1 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/50">{lutein.alias}</p>
        <p className="relative mt-4 text-[15px] leading-relaxed text-white/75">{lutein.text}</p>
      </Reveal>

      <Stagger as="ul" className="flex flex-col gap-3">
        {coreVitamins.map((v) => (
          <StaggerItem as="li" key={v.key} className="flex gap-4 rounded-[24px] border border-line/80 bg-white p-4 sm:p-5">
            <span
              aria-hidden="true"
              className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(150deg,#eaf3ff,#ffffff)] text-[22px] font-extrabold tracking-tight text-brand ring-1 ring-line"
            >
              {v.short}
            </span>
            <div className="min-w-0">
              <h3 className="text-[17px] font-bold leading-tight text-navy">{v.name}</h3>
              <p className="text-[13px] text-electric">{v.alias}</p>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{v.text}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="overflow-hidden rounded-[28px] border border-line/80 bg-white">
        <div className="bg-[linear-gradient(150deg,#eaf3ff,#ffffff)] p-5 sm:p-6">
          <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-electric">8 компонентов</p>
          <h3 className="mt-1.5 text-[24px] font-extrabold leading-tight tracking-[-0.02em] text-navy">Витамины группы B и биотин</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">Нажмите на витамин, чтобы прочитать о нём.</p>
        </div>
        <ul className="divide-y divide-line/80">
          {bVitamins.map((v) => (
            <li key={v.key}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-3.5 [&::-webkit-details-marker]:hidden">
                  <span className="grid h-9 min-w-9 place-items-center rounded-full bg-gradient-to-br from-brand to-electric px-2 text-[13px] font-bold text-white">
                    {v.short}
                  </span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block text-[15px] font-bold text-navy">{v.name}</span>
                    <span className="text-[13px] text-muted">{v.alias}</span>
                  </span>
                  <ChevronDown aria-hidden="true" className="size-5 shrink-0 text-electric transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="px-5 pb-4 pl-[68px] text-[14.5px] leading-relaxed text-muted">{v.text}</p>
              </details>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
