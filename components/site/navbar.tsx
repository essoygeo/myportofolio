"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { Locale, NavItem } from "@/data/portfolio";
import { cn } from "@/lib/cn";

type NavbarProps = {
  brand: string;
  nav: NavItem[];
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
};

export function Navbar({ brand, nav, locale, onLocaleChange }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onHashChange = () => setOpen(false);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [nav]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-slate-950/80 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-2xl">
        <a href="#home" className="flex items-center gap-2 text-sm font-semibold tracking-[0.24em] text-white uppercase">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-[11px] font-bold text-white shadow-glow">
            {brand
              .split(" ")
              .map((word) => word[0])
              .slice(0, 2)
              .join("")}
          </span>
          {brand}
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition",
                active === item.href
                  ? "bg-white/10 text-white"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-1 text-xs text-slate-300">
            <button
              type="button"
              onClick={() => onLocaleChange("fr")}
              className={`rounded-full px-3 py-1.5 transition ${
                locale === "fr" ? "bg-white text-slate-950" : "text-slate-300 hover:text-white"
              }`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => onLocaleChange("en")}
              className={`rounded-full px-3 py-1.5 transition ${
                locale === "en" ? "bg-white text-slate-950" : "text-slate-300 hover:text-white"
              }`}
              >
                EN
              </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white transition hover:bg-white/10 md:hidden"
          aria-label="Open menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/10 bg-slate-950/90 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl md:hidden"
          >
            <div className="grid gap-1">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm transition",
                    active === item.href
                      ? "bg-white/10 text-white"
                      : "text-slate-200 hover:bg-white/5 hover:text-white"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-1 text-xs text-slate-300">
                <button
                  type="button"
                  onClick={() => {
                    onLocaleChange("fr");
                    setOpen(false);
                  }}
                  className={`flex-1 rounded-xl px-3 py-2 transition ${
                    locale === "fr" ? "bg-white text-slate-950" : "text-slate-300"
                  }`}
                >
                  FR
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onLocaleChange("en");
                    setOpen(false);
                  }}
                  className={`flex-1 rounded-xl px-3 py-2 transition ${
                    locale === "en" ? "bg-white text-slate-950" : "text-slate-300"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
