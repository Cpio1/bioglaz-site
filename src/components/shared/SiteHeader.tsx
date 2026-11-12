"use client";

import { useCallback, useState } from "react";
import { useScrolled } from "@/hooks/useScrolled";
import { useActiveSection } from "@/hooks/useActiveSection";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";
import { DesktopNav } from "@/components/desktop/DesktopNav";
import { MobileMenu, MobileMenuButton } from "@/components/mobile/MobileMenu";

// Наблюдаем все разделы по порядку страницы: в why/order/faq подсветка в меню снимается
const SECTION_IDS = ["home", "about", "composition", "usage", "documents", "why", "order", "faq", "contacts"];

export function SiteHeader() {
  const scrolled = useScrolled();
  const active = useActiveSection(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter,border-color] duration-500",
          scrolled || menuOpen
            ? "border-b border-line/70 bg-white/75 shadow-[0_8px_30px_-12px_rgb(9_27_69/0.12)] backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              scrollToSection("home");
            }}
            aria-label="БИОГЛАЗ — на главную"
            className="shrink-0"
          >
            <Logo />
          </a>

          <DesktopNav active={active} />

          <MobileMenuButton open={menuOpen} onToggle={() => setMenuOpen((v) => !v)} />
        </div>
      </header>

      <MobileMenu open={menuOpen} active={active} onClose={closeMenu} />
    </>
  );
}
