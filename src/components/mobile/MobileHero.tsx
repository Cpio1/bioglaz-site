import { ArrowDown, Leaf, MapPin, Package } from "lucide-react";
import { brand, heroFacts } from "@/content/site";
import type { ProductPhoto } from "@/lib/media";
import { WHATSAPP_ORDER_URL } from "@/lib/whatsapp";
import { buttonClass } from "@/components/shared/Button";
import { ProductVisual } from "@/components/shared/ProductVisual";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { Blob, Ring } from "@/components/shared/Decor";
import { HERO_IMAGE_SIZES } from "@/components/shared/heroShared";

const factIcons = { capsules: Package, formula: Leaf, origin: MapPin } as const;

/**
 * Отдельная мобильная композиция: заголовок → подзаголовок → крупная баночка →
 * преимущества → кнопка. Только CSS-анимации, без parallax — легко для телефона.
 */
export function MobileHero({ photo }: { photo: ProductPhoto | null }) {
  return (
    <div className="relative">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f7faff_40%,#eaf3ff_100%)]" />
        <Blob color="electric" className="-right-1/3 top-[30%] size-[120vw] max-w-[640px]" />
        <Blob color="turq" className="-left-1/3 top-[52%] size-[90vw] max-w-[520px]" />
      </div>

      <div className="container-x relative flex flex-col items-center pb-12 pt-[calc(var(--header-h)+28px)] text-center sm:pb-16">
        <p className="animate-rise inline-flex items-center gap-2 rounded-full bg-white/85 px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-brand ring-1 ring-line sm:text-[12px]">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-turq" />
          {brand.category}
        </p>

        <h1
          className="animate-rise mt-5 text-[clamp(50px,16vw,104px)] font-extrabold leading-[0.95] tracking-[-0.045em]"
          style={{ animationDelay: "80ms" }}
        >
          <span className="text-gradient">{brand.name}</span>
        </h1>

        <p
          className="animate-rise mt-3 max-w-[22ch] text-[21px] font-semibold leading-[1.25] tracking-[-0.015em] text-navy sm:text-[26px]"
          style={{ animationDelay: "160ms" }}
        >
          {brand.tagline}
        </p>

        {/* Крупная баночка — полностью помещается по ширине экрана */}
        <div className="animate-appear relative mt-6 w-full max-w-[420px]" style={{ animationDelay: "200ms" }}>
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2">
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_45%,#ffffff,rgb(234_243_255/0.9)_50%,rgb(54_120_246/0.16)_72%,transparent_74%)]" />
            <Ring className="-inset-[6%]" />
          </div>
          <div className="animate-float relative mx-auto w-[82%] motion-reduce:animate-none">
            <ProductVisual photo={photo} sizes={HERO_IMAGE_SIZES} priority />
          </div>
        </div>

        <p className="animate-rise mt-4 max-w-md text-[15.5px] leading-relaxed text-muted" style={{ animationDelay: "260ms" }}>
          {brand.description}
        </p>

        <ul className="animate-rise mt-6 grid w-full max-w-md grid-cols-3 gap-2" style={{ animationDelay: "320ms" }}>
          {heroFacts.map((f) => {
            const Icon = factIcons[f.key];
            return (
              <li key={f.key} className="flex flex-col items-center gap-2 rounded-2xl bg-white/80 px-1.5 py-3 ring-1 ring-line/80">
                <span className="grid size-9 place-items-center rounded-full bg-ice text-brand">
                  <Icon aria-hidden="true" className="size-[17px]" />
                </span>
                <span className="text-[12px] font-semibold leading-tight text-navy">
                  {f.title}
                  <span className="block font-medium text-muted">{f.note}</span>
                </span>
              </li>
            );
          })}
        </ul>

        <div className="animate-rise mt-6 flex w-full max-w-md flex-col gap-2.5" style={{ animationDelay: "380ms" }}>
          <a href={WHATSAPP_ORDER_URL} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "lg", "w-full")}>
            <WhatsAppIcon className="size-5" />
            Заказать
          </a>
          <a href="#about" className={buttonClass("secondary", "md", "w-full")}>
            Узнать о продукте
            <ArrowDown aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
