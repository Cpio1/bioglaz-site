"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { faq } from "@/content/site";
import { cn } from "@/lib/cn";

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <ul className="flex flex-col gap-3">
      {faq.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-q-${i}`;
        const panelId = `${baseId}-a-${i}`;
        return (
          <li
            key={item.q}
            className={cn(
              "overflow-hidden rounded-[24px] border transition-[background-color,border-color,box-shadow] duration-300",
              isOpen ? "border-electric/25 bg-white shadow-soft" : "border-line/80 bg-white/70 hover:border-electric/25",
            )}
          >
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[16.5px] font-bold leading-snug text-navy sm:px-7 sm:py-5 sm:text-[18px]"
              >
                {item.q}
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full transition-[transform,background-color,color] duration-300",
                    isOpen ? "rotate-45 bg-electric text-white" : "bg-ice text-brand",
                  )}
                >
                  <Plus aria-hidden="true" className="size-[18px]" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  <p className="px-5 pb-5 pr-16 text-[15.5px] leading-relaxed text-muted sm:px-7 sm:pb-6">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
