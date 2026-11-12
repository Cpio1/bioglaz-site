"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Leaf, MapPin, Package } from "lucide-react";
import { brand, heroFacts } from "@/content/site";
import type { HeroPhoto, ProductPhoto } from "@/lib/media";
import { WHATSAPP_ORDER_URL } from "@/lib/whatsapp";
import { scrollToSection } from "@/lib/scroll";
import { buttonClass } from "@/components/shared/Button";
import { ProductVisual } from "@/components/shared/ProductVisual";
import { HeroImage } from "@/components/shared/HeroImage";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { Blob, Ring } from "@/components/shared/Decor";
import { HERO_IMAGE_SIZES } from "@/components/shared/heroShared";

const factIcons = { capsules: Package, formula: Leaf, origin: MapPin } as const;

export function DesktopHero({ hero, photo }: { hero: HeroPhoto | null; photo: ProductPhoto | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const jarY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);

  return (
    <div ref={ref} className="relative">
      {/* Фон */}
      <motion.div style={{ y: bgY }} aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f7faff_55%,#eaf3ff_100%)]" />
        <div className="bg-grid-fade absolute inset-0 opacity-70" />
        <Blob color="electric" animated className="-right-[8%] top-[6%] size-[760px]" />
        <Blob color="turq" className="right-[24%] top-[44%] size-[440px] animate-drift-slow motion-reduce:animate-none" />
        <Blob color="ice" className="-left-[10%] -top-[20%] size-[620px]" />
      </motion.div>

      <div className="container-x relative grid min-h-[max(680px,100svh)] grid-cols-12 items-center gap-8 pb-16 pt-[calc(var(--header-h)+40px)]">
        {/* Текст */}
        <motion.div style={{ y: textY }} className="relative z-10 col-span-7 xl:col-span-6">
          <p className="animate-rise inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.2em] text-brand shadow-soft ring-1 ring-line backdrop-blur">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-turq" />
            {brand.category}
          </p>

          <h1
            className="animate-rise mt-6 text-[clamp(80px,8vw,124px)] font-extrabold leading-[0.92] tracking-[-0.045em]"
            style={{ animationDelay: "80ms" }}
          >
            <span className="text-gradient">{brand.name}</span>
          </h1>

          <p
            className="animate-rise mt-5 max-w-xl text-[clamp(24px,2.3vw,34px)] font-semibold leading-[1.18] tracking-[-0.02em] text-navy"
            style={{ animationDelay: "160ms" }}
          >
            {brand.tagline}
          </p>

          <p className="animate-rise mt-4 max-w-lg text-[17px] leading-relaxed text-muted" style={{ animationDelay: "240ms" }}>
            {brand.description}
          </p>

          <div className="animate-rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "320ms" }}>
            <a href={WHATSAPP_ORDER_URL} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "lg")}>
              <WhatsAppIcon className="size-5" />
              Заказать сейчас
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("about");
              }}
              className={buttonClass("secondary", "lg")}
            >
              Узнать о продукте
              <ArrowDown aria-hidden="true" className="size-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>

          <ul className="animate-rise mt-10 grid max-w-xl grid-cols-3 gap-3" style={{ animationDelay: "420ms" }}>
            {heroFacts.map((f) => {
              const Icon = factIcons[f.key];
              return (
                <li key={f.key} className="flex items-start gap-3 rounded-2xl bg-white/70 p-3.5 ring-1 ring-line/80 backdrop-blur">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-ice text-brand">
                    <Icon aria-hidden="true" className="size-[18px]" />
                  </span>
                  <span className="text-[13px] leading-snug">
                    <span className="block font-bold text-navy">{f.title}</span>
                    <span className="text-muted">{f.note}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </motion.div>

        {/* Баночка */}
        <div className="relative col-span-5 flex justify-center xl:col-span-6">
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 size-[min(560px,72svh)] -translate-x-1/2 -translate-y-1/2">
            {hero ? (
              <div className="absolute inset-[4%] rounded-full bg-[radial-gradient(circle,rgb(54_120_246/0.42),rgb(86_214_209/0.14)_55%,transparent_72%)] blur-2xl" />
            ) : (
              <>
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgb(255_255_255/0.95),rgb(234_243_255/0.9)_45%,rgb(54_120_246/0.18)_72%,transparent_74%)]" />
                <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgb(54_120_246/0.35),transparent_70%)] blur-2xl" />
              </>
            )}
            <Ring className="-inset-[8%]" />
            <Ring className="-inset-[20%] border-dashed opacity-60" />
          </div>

          <motion.div style={{ y: jarY }} className="relative w-full">
            <div className="animate-appear" style={{ animationDelay: "150ms" }}>
              <div className="animate-float motion-reduce:animate-none">
                {/* Ширина ограничена и колонкой, и высотой экрана — фото всегда целиком в кадре */}
                {hero ? (
                  <div
                    className="relative mx-auto w-full"
                    style={{ maxWidth: `max(300px, min(460px, calc((100svh - 190px) * ${(hero.width / hero.height).toFixed(4)})))` }}
                  >
                    <HeroImage photo={hero} />
                  </div>
                ) : (
                  <div className="relative mx-auto w-full max-w-[max(320px,min(480px,calc((100svh-210px)*0.8)))]">
                    <ProductVisual photo={photo} sizes={HERO_IMAGE_SIZES} priority />
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Подписи-«стекляшки» с фактами о составе */}
          <FloatingTag className="left-[2%] top-[18%] xl:left-[6%]" delay="600ms" dot="bg-turq">
            Лютеин
          </FloatingTag>
          <FloatingTag className="right-[0%] top-[42%] xl:right-[4%]" delay="720ms" dot="bg-electric">
            Витамины A, C, E, D3
          </FloatingTag>
          <FloatingTag className="bottom-[5%] left-[4%] xl:left-[8%]" delay="840ms" dot="bg-brand">
            Витамины группы B
          </FloatingTag>
        </div>
      </div>
    </div>
  );
}

function FloatingTag({
  children,
  className,
  delay,
  dot,
}: {
  children: React.ReactNode;
  className: string;
  delay: string;
  dot: string;
}) {
  return (
    <span
      className={`glass animate-rise absolute z-10 inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-[13px] font-semibold text-navy shadow-soft ring-1 ring-white ${className}`}
      style={{ animationDelay: delay }}
    >
      <span aria-hidden="true" className={`size-2 rounded-full ${dot}`} />
      {children}
    </span>
  );
}
