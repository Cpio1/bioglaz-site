import { cacheLife } from "next/cache";
import { company, contacts, legal, nav, registration } from "@/content/site";
import { WHATSAPP_ORDER_URL } from "@/lib/whatsapp";
import { Logo } from "./Logo";

async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function SiteFooter() {
  const year = await currentYear();
  return (
    <footer className="on-dark relative overflow-hidden bg-navy text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 size-[520px] rounded-full bg-[radial-gradient(circle,rgb(54_120_246/0.35),transparent_70%)]" />
      <div className="container-x relative pb-[max(32px,env(safe-area-inset-bottom))] pt-16 lg:pt-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Logo dark />
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/65">
              Витаминный комплекс с лютеином. Произведено в Казахстане.
            </p>
            <p className="mt-6 inline-flex rounded-2xl bg-white/[0.08] px-4 py-3 text-[15px] font-bold text-white ring-1 ring-white/15">
              {legal.supplement}
            </p>
          </div>

          <nav aria-label="Навигация в подвале" className="lg:col-span-2">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-white/45">Разделы</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 lg:grid-cols-1">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="text-[15px] text-white/75 transition-colors hover:text-white">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-white/45">Контакты</p>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              <li>
                <a href={contacts.phoneHref} className="text-white/85 transition-colors hover:text-white">
                  {contacts.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={WHATSAPP_ORDER_URL} target="_blank" rel="noopener noreferrer" className="text-white/85 transition-colors hover:text-white">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${contacts.email}`} className="break-all text-white/85 transition-colors hover:text-white">
                  {contacts.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-white/45">Производитель</p>
            <ul className="mt-4 space-y-2.5 text-[15px] text-white/75">
              <li className="font-semibold text-white">{company.name}</li>
              <li>БИН {company.bin}</li>
              <li>
                Свидетельство о гос. регистрации
                <span className="block break-all font-mono text-[13.5px] text-white/85">№ {registration.number}</span>
                <span className="text-[14px]">от {registration.dateDisplay}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13.5px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. БИОГЛАЗ
          </p>
          <p>
            {legal.supplement} {legal.info}
          </p>
        </div>
      </div>
    </footer>
  );
}
