"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { WHATSAPP_ORDER_URL } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * Плавающая кнопка WhatsApp. Появляется после начала прокрутки, учитывает safe-area,
 * прячется, пока открыто мобильное меню или виден блок заказа (там свои кнопки WhatsApp).
 */
export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderInView, setOrderInView] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const menuObserver = new MutationObserver(() => setMenuOpen(!!document.getElementById("mobile-menu")));
    menuObserver.observe(document.body, { childList: true, subtree: true });

    // Пока на экране блок заказа с крупной кнопкой WhatsApp — не дублируем её
    const order = document.getElementById("order");
    const orderObserver = new IntersectionObserver(([e]) => setOrderInView(e.isIntersecting), { threshold: 0.35 });
    if (order) orderObserver.observe(order);

    return () => {
      window.removeEventListener("scroll", onScroll);
      menuObserver.disconnect();
      orderObserver.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && !menuOpen && !orderInView && (
        <motion.a
          key="wa-fab"
          href={WHATSAPP_ORDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Заказать БИОГЛАЗ через WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className="group fixed bottom-[max(16px,env(safe-area-inset-bottom))] right-4 z-40 flex items-center sm:bottom-6 sm:right-6"
        >
          <span className="mr-3 hidden translate-x-2 rounded-full bg-white px-4 py-2 text-[14px] font-semibold text-navy opacity-0 shadow-soft ring-1 ring-line transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 lg:block">
            Заказать в WhatsApp
          </span>
          <span className="relative grid size-14 place-items-center rounded-full bg-[#1FAF5A] text-white shadow-[0_14px_34px_-10px_rgb(31_175_90/0.85)] transition-transform duration-300 group-hover:scale-105">
            <span aria-hidden="true" className="absolute inset-0 animate-pulse-ring rounded-full bg-[#1FAF5A] motion-reduce:animate-none" />
            <WhatsAppIcon className="relative size-7" />
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
