"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand, FileText } from "lucide-react";
import { registration } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { buttonClass } from "./Button";
import { DocumentViewer } from "./DocumentViewer";

type Props = { image: string | null; pdf: string | null; title: string };

export function CertificatePanel({ image, pdf, title }: Props) {
  const [open, setOpen] = useState(false);

  if (!image) {
    // Временное состояние: скан ещё не добавлен. Никакого «нарисованного» свидетельства.
    return (
      <div className="relative overflow-hidden rounded-[30px] border border-dashed border-electric/30 bg-[linear-gradient(160deg,#f7faff,#eaf3ff)] p-6 sm:p-8">
        <div className="mx-auto grid aspect-[3/4] max-h-[420px] w-full max-w-[300px] place-items-center rounded-[22px] bg-white/80 ring-1 ring-line">
          <div className="flex flex-col items-center gap-3 px-6 text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-ice text-brand">
              <FileText aria-hidden="true" className="size-7" />
            </span>
            <p className="text-[15px] font-bold text-navy">Свидетельство о государственной регистрации</p>
            <p className="font-mono text-[12.5px] text-muted">№ {registration.number}</p>
            <p className="text-[13px] text-muted">от {registration.dateDisplay}</p>
          </div>
        </div>
        <p className="mt-5 text-center text-[14px] leading-relaxed text-muted">
          Копию свидетельства можно запросить у менеджера.
        </p>
        <div className="mt-4 flex justify-center">
        <a
          href={pdf ?? whatsappUrl("Здравствуйте! Пришлите, пожалуйста, копию свидетельства о регистрации БИОГЛАЗ.")}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass("secondary", "md")}
        >
          {pdf ? "Посмотреть документ (PDF)" : "Запросить копию"}
        </a>
        </div>
        {process.env.NODE_ENV !== "production" && (
          <p className="mt-3 text-center text-[11px] font-semibold text-amber-800">
            Добавьте скан: public/documents/certificate.jpg (см. README в папке)
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute -inset-3 rounded-[38px] bg-[linear-gradient(160deg,#eaf3ff,rgb(86_214_209/0.25))] sm:-inset-4" />
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full overflow-hidden rounded-[28px] bg-white p-3 shadow-lift ring-1 ring-line"
        aria-label="Открыть свидетельство в полноэкранном просмотре"
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[20px] bg-soft">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 440px, 92vw"
            className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>
        <span className="glass absolute bottom-6 right-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-navy shadow-soft ring-1 ring-white">
          <Expand aria-hidden="true" className="size-4" /> Увеличить
        </span>
      </button>

      <div className="relative mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={() => setOpen(true)} className={buttonClass("primary", "md")}>
          <Expand aria-hidden="true" className="size-4" />
          Посмотреть документ
        </button>
        {pdf && (
          <a href={pdf} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary", "md")}>
            <FileText aria-hidden="true" className="size-4" /> Открыть PDF
          </a>
        )}
      </div>

      <DocumentViewer src={image} pdf={pdf} title={title} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
