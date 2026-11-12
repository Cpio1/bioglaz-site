import { MessageCircle, Phone, Tag, Truck } from "lucide-react";
import { contacts, order } from "@/content/site";
import type { ProductPhoto } from "@/lib/media";
import { WHATSAPP_ORDER_URL } from "@/lib/whatsapp";
import { buttonClass } from "@/components/shared/Button";
import { ProductVisual } from "@/components/shared/ProductVisual";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { Reveal } from "@/components/shared/Reveal";
import { Blob, Ring } from "@/components/shared/Decor";

const points = [
  { icon: Tag, text: order.priceNote },
  { icon: Truck, text: "Наличие и условия доставки — у менеджера" },
  { icon: MessageCircle, text: "Ответим в WhatsApp" },
];

export function OrderSection({ photo }: { photo: ProductPhoto | null }) {
  return (
    <section id="order" data-anchor aria-labelledby="order-title" className="relative bg-white px-3 py-6 sm:px-6 lg:py-10">
      <div className="on-dark relative mx-auto max-w-[1320px] overflow-hidden rounded-[36px] bg-[linear-gradient(150deg,#1746a2_0%,#0e2560_38%,#091b45_70%,#06122f_100%)] text-white lg:rounded-[48px]">
        <Blob color="electric" animated className="-right-32 top-0 size-[600px]" />
        <Blob color="turq" className="-bottom-40 left-1/4 size-[520px] opacity-50" />
        <Ring dark className="-left-40 -top-40 size-[480px]" />

        <div className="relative grid grid-cols-1 items-center gap-6 px-5 py-12 sm:px-10 sm:py-16 lg:grid-cols-12 lg:gap-10 lg:px-16 lg:py-20">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-turq ring-1 ring-white/15">
                <span aria-hidden="true" className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-turq motion-reduce:animate-none" />
                  <span className="relative inline-flex size-2 rounded-full bg-turq" />
                </span>
                Заказ
              </span>
              <h2 id="order-title" className="mt-5 text-[30px] font-extrabold leading-[1.1] tracking-[-0.025em] sm:text-[42px] lg:text-[52px]">
                <span className="text-gradient-light">БИОГЛАЗ</span> — забота о здоровье глаз начинается с&nbsp;внимания к&nbsp;себе
              </h2>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/75 lg:text-[18px]">{order.text}</p>
            </Reveal>

            {/* Баночка на мобильных — между текстом и кнопкой */}
            <Reveal className="relative mx-auto mt-8 w-[70%] max-w-[300px] lg:hidden">
              <div aria-hidden="true" className="absolute inset-[-8%] rounded-full bg-[radial-gradient(circle,rgb(54_120_246/0.55),transparent_68%)]" />
              <ProductVisual photo={photo} tone="dark" sizes="(min-width: 1024px) 440px, 70vw" />
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {points.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 rounded-2xl bg-white/[0.07] px-4 py-3 text-[14px] font-semibold leading-snug ring-1 ring-white/10">
                    <Icon aria-hidden="true" className="size-[18px] shrink-0 text-turq" />
                    {text}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href={WHATSAPP_ORDER_URL} target="_blank" rel="noopener noreferrer" className={buttonClass("whatsapp", "lg", "w-full sm:w-auto")}>
                  <WhatsAppIcon className="size-[22px]" />
                  {order.cta}
                </a>
                <a href={contacts.phoneHref} className={buttonClass("ghost-dark", "lg", "w-full sm:w-auto")}>
                  <Phone aria-hidden="true" className="size-[18px]" />
                  {contacts.phoneDisplay}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="relative hidden lg:col-span-5 lg:block">
            <div aria-hidden="true" className="absolute inset-[-6%] rounded-full bg-[radial-gradient(circle,rgb(54_120_246/0.55),rgb(86_214_209/0.12)_55%,transparent_70%)]" />
            <Ring dark className="inset-[-2%]" />
            <div className="relative mx-auto w-[86%] animate-float motion-reduce:animate-none">
              <ProductVisual photo={photo} tone="dark" sizes="(min-width: 1024px) 440px, 70vw" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
