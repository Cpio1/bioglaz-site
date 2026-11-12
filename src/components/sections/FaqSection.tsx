import { contacts } from "@/content/site";
import { WHATSAPP_ORDER_URL } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { Reveal } from "@/components/shared/Reveal";
import { buttonClass } from "@/components/shared/Button";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";

export function FaqSection() {
  return (
    <section id="faq" data-anchor aria-labelledby="faq-title" className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-32">
      <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)]">
            <SectionHeading id="faq-title" eyebrow="FAQ" title="Частые вопросы" subtitle="Коротко о главном. Не нашли ответ — напишите нам." />
            <Reveal className="mt-8 hidden rounded-[28px] bg-[linear-gradient(150deg,#eaf3ff,#f7faff)] p-6 ring-1 ring-line lg:block">
              <p className="text-[15px] font-semibold text-navy">Остались вопросы?</p>
              <p className="mt-1 text-[14px] text-muted">Менеджер ответит в WhatsApp: {contacts.phoneDisplay}</p>
              <a href={WHATSAPP_ORDER_URL} target="_blank" rel="noopener noreferrer" className={buttonClass("whatsapp", "md", "mt-4")}>
                <WhatsAppIcon className="size-5" /> Написать в WhatsApp
              </a>
            </Reveal>
          </div>
        </div>
        <Reveal className="lg:col-span-7">
          <FaqAccordion />
        </Reveal>
      </div>
    </section>
  );
}
