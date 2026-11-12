import { company, legal, registration } from "@/content/site";
import type { CertificateMedia } from "@/lib/media";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Blob } from "@/components/shared/Decor";
import { CertificatePanel } from "@/components/shared/CertificatePanel";
import { CopyButton } from "@/components/shared/CopyButton";

export function DocumentsSection({ certificate }: { certificate: CertificateMedia }) {
  const rows: Array<{ label: string; value: React.ReactNode; copy?: string }> = [
    { label: "Документ", value: "Свидетельство о государственной регистрации продукции" },
    {
      label: "Регистрационный номер",
      value: <span className="break-all font-mono text-[15px] tracking-tight sm:text-[16px]">№ {registration.number}</span>,
      copy: registration.number,
    },
    { label: "Дата выдачи", value: <time dateTime={registration.dateIso}>{registration.dateLong}</time> },
    { label: "Производитель", value: company.name },
    { label: "Адрес изготовителя", value: company.manufacturerAddress },
    { label: "Страна производства", value: company.country },
  ];

  return (
    <section id="documents" data-anchor aria-labelledby="documents-title" className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-32">
      <Blob color="ice" className="-right-40 top-0 size-[640px]" />
      <div className="container-x relative">
        <SectionHeading
          id="documents-title"
          eyebrow="Качество и документы"
          title="Информация о регистрации продукта"
          subtitle="Проверяемые сведения о продукции и её изготовителе — без рекламных обещаний."
        />

        <div className="mt-12 grid grid-cols-1 items-start gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <CertificatePanel image={certificate.image} pdf={certificate.pdf} title={`${registration.title} № ${registration.number}`} />
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <dl className="overflow-hidden rounded-[30px] border border-line/80 bg-white shadow-soft">
              {rows.map((r, i) => (
                <div
                  key={r.label}
                  className={`flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:gap-6 sm:px-7 sm:py-5 ${i % 2 ? "bg-soft/70" : ""}`}
                >
                  <dt className="text-[13px] font-semibold uppercase tracking-[0.08em] text-muted sm:w-52 sm:shrink-0">{r.label}</dt>
                  <dd className="flex min-w-0 flex-1 items-center justify-between gap-3 text-[16px] font-semibold leading-snug text-navy">
                    <span className="min-w-0">{r.value}</span>
                    {r.copy && <CopyButton value={r.copy} label="Скопировать номер свидетельства" />}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 px-1 text-[14px] leading-relaxed text-muted">{legal.registrationNote}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
