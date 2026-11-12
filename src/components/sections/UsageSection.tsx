import { AlertTriangle, CalendarClock, RefreshCw, ShieldAlert, Thermometer } from "lucide-react";
import { legal, product, usage } from "@/content/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Blob, Ring } from "@/components/shared/Decor";
import { DesktopUsageSteps } from "@/components/desktop/DesktopUsageSteps";
import { MobileUsageSteps } from "@/components/mobile/MobileUsageSteps";

export function UsageSection() {
  return (
    <section
      id="usage"
      data-anchor
      aria-labelledby="usage-title"
      className="on-dark relative overflow-hidden bg-[linear-gradient(170deg,#0e2560_0%,#091b45_45%,#071434_100%)] py-20 text-white sm:py-24 lg:py-32"
    >
      <Blob color="electric" animated className="-right-40 -top-40 size-[620px] opacity-70" />
      <Blob color="turq" className="-left-60 bottom-20 size-[520px] opacity-40" />
      <Ring dark className="-right-32 top-1/3 size-[520px]" />

      <div className="container-x relative">
        <SectionHeading
          id="usage-title"
          dark
          eyebrow="Применение"
          title={
            <>
              Как принимать <span className="text-gradient-light">БИОГЛАЗ?</span>
            </>
          }
          subtitle={product.dose + "."}
        />

        <div className="mt-14 hidden lg:block">
          <DesktopUsageSteps />
        </div>
        <div className="mt-10 lg:hidden">
          <MobileUsageSteps />
        </div>

        <Reveal className="mt-8 flex items-center gap-3 text-[16px] font-medium text-white/80 lg:mt-10">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 ring-1 ring-white/15">
            <RefreshCw aria-hidden="true" className="size-[18px] text-turq" />
          </span>
          {usage.repeat}
        </Reveal>

        {/* Важная информация — читаемо, не мелким шрифтом */}
        <div className="mt-10 grid grid-cols-1 gap-4 lg:mt-14 lg:grid-cols-12 lg:gap-5">
          <Reveal className="flex flex-col rounded-[28px] bg-white p-6 text-navy sm:p-8 lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-[#fff1e6] text-[#b4530b]">
                <ShieldAlert aria-hidden="true" className="size-[22px]" />
              </span>
              <h3 className="text-[22px] font-extrabold tracking-tight">Противопоказания</h3>
            </div>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-3">
              {product.contraindications.map((c) => (
                <li key={c} className="rounded-2xl bg-soft px-4 py-3.5 text-[15.5px] font-semibold leading-snug ring-1 ring-line">
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-line pt-5 text-[15px] leading-relaxed text-muted lg:mt-auto">
              <strong className="font-semibold text-navy">{legal.supplement}</strong> {legal.info}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col gap-4 lg:col-span-5">
            <div role="note" className="flex items-start gap-4 rounded-[28px] bg-[linear-gradient(135deg,rgb(86_214_209/0.22),rgb(54_120_246/0.18))] p-6 ring-1 ring-turq/40">
              <AlertTriangle aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-turq" />
              <p className="min-w-0 hyphens-auto text-[16px] font-semibold leading-snug text-white sm:text-[17px]">{usage.doctor}</p>
            </div>
            <dl className="grid grid-cols-2 gap-4">
              <div className="rounded-[24px] bg-white/[0.06] p-5 ring-1 ring-white/10">
                <CalendarClock aria-hidden="true" className="size-5 text-turq" />
                <dt className="mt-3 text-[13px] text-white/60">Срок годности</dt>
                <dd className="text-[18px] font-bold">{product.shelfLife}</dd>
              </div>
              <div className="rounded-[24px] bg-white/[0.06] p-5 ring-1 ring-white/10">
                <Thermometer aria-hidden="true" className="size-5 text-turq" />
                <dt className="mt-3 text-[13px] text-white/60">Хранение</dt>
                <dd className="text-[15px] font-semibold leading-snug">не выше +25 °C</dd>
              </div>
            </dl>
            <p className="px-1 text-[14px] leading-relaxed text-white/60">Хранить {product.storage.charAt(0).toLowerCase() + product.storage.slice(1)}.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
