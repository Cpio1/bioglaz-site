"use client";

import { motion } from "motion/react";
import { nav } from "@/content/site";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/cn";
import { buttonClass } from "@/components/shared/Button";

export function DesktopNav({ active }: { active: string }) {
  return (
    <>
      <nav aria-label="Основная навигация" className="hidden lg:block">
        <ul className="flex items-center gap-1 rounded-full border border-line/70 bg-white/60 p-1 backdrop-blur">
          {nav.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="relative">
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-ice"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={cn(
                    "relative block rounded-full px-3.5 py-2 text-[14px] font-semibold transition-colors xl:px-4",
                    isActive ? "text-brand" : "text-muted hover:text-navy",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="hidden lg:block">
      <a
        href="#order"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("order");
        }}
        className={buttonClass("primary", "md")}
      >
        Заказать
      </a>
      </div>
    </>
  );
}
