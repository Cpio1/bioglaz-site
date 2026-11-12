import { composition } from "@/content/site";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Blob } from "@/components/shared/Decor";
import { DesktopComposition } from "@/components/desktop/DesktopComposition";
import { MobileComposition } from "@/components/mobile/MobileComposition";
import { Info } from "lucide-react";

export function CompositionSection() {
  return (
    <section
      id="composition"
      data-anchor
      aria-labelledby="composition-title"
      className="relative overflow-hidden bg-soft py-20 sm:py-24 lg:py-32"
    >
      <Blob color="electric" className="-right-60 -top-40 size-[640px] opacity-60" />
      <Blob color="turq" className="-left-40 bottom-0 size-[480px] opacity-60" />
      <div className="container-x relative">
        <SectionHeading
          id="composition-title"
          eyebrow={composition.subtitle}
          title={
            <>
              Что входит в состав <span className="text-gradient">БИОГЛАЗ?</span>
            </>
          }
          subtitle="Лютеин и 12 витаминов. Рассказываем, какую роль каждый из них играет в организме."
          align="center"
          className="mx-auto"
        />

        <div className="mt-12 hidden lg:block">
          <DesktopComposition />
        </div>
        <div className="mt-10 lg:hidden">
          <MobileComposition />
        </div>

        <Reveal className="mx-auto mt-10 flex max-w-3xl items-start gap-3 rounded-2xl bg-white/70 px-5 py-4 text-[14px] leading-relaxed text-muted ring-1 ring-line lg:mt-14">
          <Info aria-hidden="true" className="mt-0.5 size-[18px] shrink-0 text-electric" />
          <p>{composition.note} Описания отражают общеизвестную физиологическую роль веществ и не являются заявлениями о лечебном действии продукта.</p>
        </Reveal>
      </div>
    </section>
  );
}
