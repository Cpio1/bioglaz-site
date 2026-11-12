"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { contacts, nav } from "@/content/site";
import { WHATSAPP_ORDER_URL } from "@/lib/whatsapp";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/cn";
import { buttonClass } from "@/components/shared/Button";
import { WhatsAppIcon } from "@/components/shared/WhatsAppIcon";

export function MobileMenuButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? "Закрыть меню" : "Открыть меню"}
      className="relative grid size-11 place-items-center rounded-full border border-line bg-white/80 backdrop-blur lg:hidden"
    >
      <span className="relative block h-3.5 w-[18px]">
        <span
          className={cn(
            "absolute left-0 h-[2px] w-full rounded-full bg-navy transition-all duration-300",
            open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
          )}
        />
        <span
          className={cn(
            "absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-navy transition-opacity duration-200",
            open && "opacity-0",
          )}
        />
        <span
          className={cn(
            "absolute left-0 h-[2px] w-full rounded-full bg-navy transition-all duration-300",
            open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0",
          )}
        />
      </span>
    </button>
  );
}

export function MobileMenu({ open, active, onClose }: { open: boolean; active: string; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Блокировка прокрутки фона и закрытие по Escape
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // Закрыть меню при переходе на десктопную ширину
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && onClose();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [onClose]);

  const go = (id: string) => {
    // 1) закрываем меню, 2) после снятия блокировки прокрутки — плавно едем к разделу
    onClose();
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(id)));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto overscroll-contain bg-white/85 backdrop-blur-2xl lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.3 }}
        >
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-10 size-72 rounded-full bg-[radial-gradient(circle,rgb(54_120_246/0.22),transparent_70%)]" />
          <div aria-hidden="true" className="pointer-events-none absolute -left-20 bottom-24 size-64 rounded-full bg-[radial-gradient(circle,rgb(86_214_209/0.22),transparent_70%)]" />

          <nav aria-label="Мобильная навигация" className="container-x relative flex min-h-full flex-col pb-[max(24px,env(safe-area-inset-bottom))] pt-6">
            <motion.ul
              className="flex flex-col"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
            >
              {nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.7, 0.2, 1] } },
                  }}
                  className="border-b border-line/70"
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.id);
                    }}
                    aria-current={active === item.id ? "location" : undefined}
                    className="flex items-center justify-between py-4 text-[26px] font-bold tracking-tight text-navy"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="w-6 text-[12px] font-semibold tabular-nums text-electric/70">0{i + 1}</span>
                      <span className={active === item.id ? "text-brand" : undefined}>{item.label}</span>
                    </span>
                    <ArrowUpRight aria-hidden="true" className="size-5 text-electric/60" />
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="mt-auto flex flex-col gap-3 pt-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <a
                href={WHATSAPP_ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass("whatsapp", "lg", "w-full")}
              >
                <WhatsAppIcon className="size-5" />
                Заказать в WhatsApp
              </a>
              <div className="grid grid-cols-2 gap-3">
                <a href={contacts.phoneHref} className={buttonClass("secondary", "md", "w-full text-[14px]")}>
                  <Phone aria-hidden="true" className="size-4" /> Позвонить
                </a>
                <a href={`mailto:${contacts.email}`} className={buttonClass("secondary", "md", "w-full text-[14px]")}>
                  <Mail aria-hidden="true" className="size-4" /> Написать
                </a>
              </div>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
