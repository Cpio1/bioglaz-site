"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          /* буфер обмена недоступен — ничего не делаем */
        }
      }}
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-ice hover:text-brand"
      aria-label={copied ? "Скопировано" : label}
      title={copied ? "Скопировано" : label}
    >
      {copied ? <Check aria-hidden="true" className="size-4 text-[#12866f]" /> : <Copy aria-hidden="true" className="size-4" />}
      <span className="sr-only" aria-live="polite">{copied ? "Скопировано" : ""}</span>
    </button>
  );
}
