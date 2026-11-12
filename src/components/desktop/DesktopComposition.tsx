import { bVitamins, coreVitamins, lutein } from "@/content/site";
import { Stagger, StaggerItem } from "@/components/shared/Reveal";
import { LuteinMark } from "@/components/shared/LuteinMark";
import { cn } from "@/lib/cn";

const coreStyles = [
  "bg-white",
  "bg-[linear-gradient(150deg,#ffffff,#eaf3ff)]",
  "bg-[linear-gradient(150deg,#eaf3ff,#ffffff)]",
  "bg-white",
];

export function DesktopComposition() {
  return (
    <Stagger className="grid grid-cols-12 gap-4 xl:gap-5">
      {/* Лютеин — главная карточка */}
      <StaggerItem
        as="article"
        className="relative col-span-5 flex min-h-[460px] flex-col overflow-hidden rounded-[36px] bg-[linear-gradient(160deg,#0e2560_0%,#091b45_55%,#06122f_100%)] p-9 text-white"
      >
        <LuteinMark className="pointer-events-none absolute -right-16 -top-16 size-[340px] opacity-90" />
        <span className="relative inline-flex w-fit rounded-full bg-white/10 px-3 py-1 text-[12px] font-bold uppercase tracking-[0.16em] text-turq ring-1 ring-white/15">
          Ключевой компонент
        </span>
        <div className="relative mt-auto">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/50">{lutein.alias}</p>
          <h3 className="mt-2 text-[64px] font-extrabold leading-none tracking-[-0.04em]">
            <span className="text-gradient-light">{lutein.name}</span>
          </h3>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/75">{lutein.text}</p>
        </div>
      </StaggerItem>

      {/* A, C, E, D3 — сетка 2×2 справа от лютеина */}
      <div className="col-span-7 grid grid-cols-2 gap-4 xl:gap-5">
        {coreVitamins.map((v, i) => (
          <StaggerItem
            as="article"
            key={v.key}
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-[30px] border border-line/80 p-6 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift xl:p-7",
              coreStyles[i],
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <span
                aria-hidden="true"
                className="text-[56px] font-extrabold leading-[0.85] tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.5px_#3678f6] transition-colors duration-500 group-hover:text-electric/15 xl:text-[64px]"
              >
                {v.short}
              </span>
              <span className="rounded-full bg-ice px-2.5 py-1 text-[12px] font-semibold text-brand">{v.alias}</span>
            </div>
            <h3 className="mt-5 text-[19px] font-bold tracking-tight text-navy">{v.name}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{v.text}</p>
          </StaggerItem>
        ))}
      </div>

      {/* Группа B */}
      <StaggerItem
        as="article"
        className="relative col-span-12 overflow-hidden rounded-[36px] border border-line/80 bg-white p-9 xl:p-10"
      >
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-[360px] rounded-full bg-[radial-gradient(circle,rgb(86_214_209/0.18),transparent_70%)]" />
        <div className="relative flex items-end justify-between gap-8">
          <div>
            <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-electric">8 компонентов</p>
            <h3 className="mt-2 text-[36px] font-extrabold leading-tight tracking-[-0.03em] text-navy">
              Витамины группы B и биотин
            </h3>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-muted">
            Водорастворимые витамины, которые участвуют в энергетическом обмене и работе нервной системы.
          </p>
        </div>
        <ul className="relative mt-8 grid grid-cols-4 gap-px overflow-hidden rounded-[24px] bg-line/80 ring-1 ring-line/80">
          {bVitamins.map((v) => (
            <li key={v.key} className="bg-white p-5 transition-colors duration-300 hover:bg-soft xl:p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-9 min-w-9 place-items-center rounded-full bg-gradient-to-br from-brand to-electric px-2 text-[13px] font-bold text-white">
                  {v.short}
                </span>
                <span className="leading-tight">
                  <span className="block text-[15px] font-bold text-navy">{v.name}</span>
                  <span className="text-[13px] text-muted">{v.alias}</span>
                </span>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">{v.text}</p>
            </li>
          ))}
        </ul>
      </StaggerItem>
    </Stagger>
  );
}
