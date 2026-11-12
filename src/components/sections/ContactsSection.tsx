import { ArrowUpRight, Building2, Mail, MapPin, Phone } from "lucide-react";
import { company, contacts } from "@/content/site";
import { WHATSAPP_ORDER_URL } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger, StaggerItem } from "@/components/shared/Reveal";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";
import { Blob } from "@/components/shared/Decor";
import { cn } from "@/lib/cn";

type Card = {
  key: string;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  className: string;
  iconClass: string;
  span: string;
};

const cards: Card[] = [
  {
    key: "wa",
    label: "WhatsApp",
    value: contacts.phoneDisplay,
    href: WHATSAPP_ORDER_URL,
    external: true,
    icon: WhatsAppIcon,
    className: "bg-[linear-gradient(150deg,#1faf5a,#128a46)] text-white ring-0",
    span: "sm:col-span-2 lg:col-span-2",
    iconClass: "bg-white/15 text-white",
  },
  {
    key: "phone",
    label: "Телефон",
    value: contacts.phoneDisplay,
    href: contacts.phoneHref,
    icon: Phone,
    className: "bg-white",
    span: "lg:col-span-2",
    iconClass: "bg-ice text-brand",
  },
  {
    key: "mail",
    label: "Email",
    value: contacts.email,
    href: `mailto:${contacts.email}`,
    icon: Mail,
    className: "bg-white",
    span: "lg:col-span-2",
    iconClass: "bg-ice text-brand",
  },
  {
    key: "company",
    label: `Компания · БИН ${company.bin}`,
    value: company.name,
    icon: Building2,
    className: "bg-[linear-gradient(150deg,#eaf3ff,#ffffff)]",
    span: "lg:col-span-3",
    iconClass: "bg-white text-brand",
  },
  {
    key: "address",
    label: "Адрес заявителя",
    value: company.applicantAddressShort,
    icon: MapPin,
    className: "bg-white",
    span: "lg:col-span-3",
    iconClass: "bg-ice text-brand",
  },
];

export function ContactsSection() {
  return (
    <section id="contacts" data-anchor aria-labelledby="contacts-title" className="relative overflow-hidden bg-soft py-20 sm:py-24 lg:py-32">
      <Blob color="turq" className="-right-40 bottom-0 size-[520px] opacity-50" />
      <div className="container-x relative">
        <SectionHeading id="contacts-title" eyebrow="Контакты" title="Свяжитесь с нами" subtitle="Ответим на вопросы о продукте, стоимости, наличии и доставке." />

        <Stagger className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-6">
          {cards.map((c) => {
            const Icon = c.icon;
            const dark = c.key === "wa";
            const inner = (
              <>
                <span className={cn("grid size-12 shrink-0 place-items-center rounded-2xl", c.iconClass)}>
                  <Icon aria-hidden="true" className="size-[22px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={cn("block text-[13px] font-semibold", dark ? "text-white/80" : "text-muted")}>{c.label}</span>
                  <span className={cn("mt-0.5 block break-words text-[17px] font-bold leading-snug", dark ? "text-white" : "text-navy")}>
                    {c.value}
                  </span>
                </span>
                {c.href && (
                  <ArrowUpRight
                    aria-hidden="true"
                    className={cn(
                      "size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                      dark ? "text-white" : "text-electric",
                    )}
                  />
                )}
              </>
            );
            const base = cn(
              "group flex h-full items-center gap-4 rounded-[26px] p-5 ring-1 ring-line/80 transition-[transform,box-shadow] duration-300 sm:p-6",
              c.href && "hover:-translate-y-1 hover:shadow-lift",
              c.className,
            );
            return (
              <StaggerItem key={c.key} className={c.span}>
                {c.href ? (
                  <a href={c.href} {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={base}>
                    {inner}
                  </a>
                ) : (
                  <div className={base}>{inner}</div>
                )}
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
