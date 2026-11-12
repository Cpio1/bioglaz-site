import { Atom, Pill, Sparkles } from "lucide-react";
import { about, legal } from "@/content/site";
import type { ProductPhoto } from "@/lib/media";
import { ProductVisual } from "@/components/shared/ProductVisual";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/Reveal";
import { Blob, Ring } from "@/components/shared/Decor";
import { cn } from "@/lib/cn";

const icons = { lutein: Sparkles, vitamins: Atom, format: Pill } as const;
const accents = {
  lutein: "from-turq/25 to-turq/5 text-[#128a85]",
  vitamins: "from-electric/20 to-electric/5 text-brand",
  format: "from-brand/15 to-ice text-navy",
} as const;

export function AboutSection({ photo }: { photo: ProductPhoto | null }) {
  return (
    <section id="about" data-anchor aria-labelledby="about-title" className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-32">
      <Blob color="ice" className="-left-40 top-10 size-[560px]" />
      <div className="container-x relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Визуал: мягкий эллипс + продукт */}
        <Reveal className="relative mx-auto hidden w-full lg:col-span-5 lg:block">
          <div aria-hidden="true" className="absolute inset-x-[4%] inset-y-[6%] rounded-[48%_52%_46%_54%/55%_45%_55%_45%] bg-[linear-gradient(160deg,#eaf3ff,#f7faff_50%,rgb(86_214_209/0.25))]" />
          <Ring className="inset-0 rounded-[52%_48%_54%_46%/45%_55%_45%_55%]" />
          <div className="relative mx-auto w-[78%] py-6">
            <ProductVisual photo={photo} sizes="(min-width: 1024px) 380px, 70vw" />
          </div>
          <span className="glass absolute bottom-[8%] right-0 rounded-2xl px-4 py-3 text-left shadow-soft ring-1 ring-white sm:right-[2%]">
            <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Форма выпуска</span>
            <span className="block text-[15px] font-bold text-navy">Капсулы по 340 мг</span>
          </span>
        </Reveal>

        {/* Текст и карточки */}
        <div className="lg:col-span-7">
          <SectionHeading
            id="about-title"
            eyebrow="О продукте"
            title={
              <>
                Что такое <span className="text-gradient">БИОГЛАЗ?</span>
              </>
            }
            subtitle={about.text}
          />

          {/* Мобильная композиция: фото между описанием и карточками */}
          <Reveal className="relative mx-auto mt-8 w-full max-w-[340px] sm:max-w-[400px] lg:hidden">
            <div aria-hidden="true" className="absolute inset-x-[4%] inset-y-[6%] rounded-[48%_52%_46%_54%/55%_45%_55%_45%] bg-[linear-gradient(160deg,#eaf3ff,#f7faff_50%,rgb(86_214_209/0.25))]" />
            <div className="relative mx-auto w-[72%] py-4">
              <ProductVisual photo={photo} sizes="(min-width: 1024px) 380px, 70vw" />
            </div>
          </Reveal>

          <Stagger className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:mt-12 lg:grid-cols-1">
            {about.cards.map((card, i) => {
              const Icon = icons[card.key];
              return (
                <StaggerItem
                  as="article"
                  key={card.key}
                  className={cn(
                    "group relative flex gap-4 overflow-hidden rounded-[28px] border border-line/80 bg-white p-5 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift sm:flex-col sm:p-6 lg:flex-row lg:items-center lg:gap-5",
                    i === 1 && "lg:ml-10",
                  )}
                >
                  <span className={cn("grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br", accents[card.key])}>
                    <Icon aria-hidden="true" className="size-[22px]" />
                  </span>
                  <div>
                    <h3 className="text-[18px] font-bold tracking-tight text-navy">{card.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{card.text}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>

          <Reveal className="mt-10 sm:mt-14">
            <p className="inline-flex items-center gap-2 rounded-full bg-soft px-4 py-2 text-[13px] font-semibold text-muted ring-1 ring-line">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-electric" />
              {legal.supplement}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
