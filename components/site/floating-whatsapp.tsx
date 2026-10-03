"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { FooterContent, PortfolioData } from "@/data/portfolio";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";

type FloatingWhatsAppProps = {
  footer: FooterContent;
  identity: PortfolioData["identity"];
};

export function FloatingWhatsApp({ footer, identity }: FloatingWhatsAppProps) {
  const whatsappUrl = `https://wa.me/${identity.whatsappNumber}?text=${encodeURIComponent(footer.whatsappMessage)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 16, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group fixed bottom-5 right-5 z-50 overflow-hidden rounded-full border border-emerald-300/20 bg-slate-950/75 p-[1px] shadow-[0_16px_50px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:bottom-6 sm:right-6"
      aria-label={footer.whatsappCta}
      title={footer.whatsappCta}
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(74,222,128,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.16),transparent_38%)] opacity-80 transition duration-300 group-hover:opacity-100" />
      <span className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-400/20 blur-2xl transition duration-300 group-hover:scale-110" />

      <span className="relative flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-emerald-50 transition duration-300 group-hover:bg-white/[0.06]">
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_0_0_6px_rgba(37,211,102,0.14)]">
          <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/40" />
          <WhatsAppIcon className="relative h-5 w-5" />
        </span>

        <span className="hidden flex-col items-start leading-none sm:flex">
          <span className="text-[10px] uppercase tracking-[0.28em] text-emerald-200/80">
            {footer.whatsappLabel}
          </span>
          <span className="mt-1 text-sm font-medium text-white">{footer.whatsappCta}</span>
        </span>

        <Sparkles className="h-4 w-4 text-emerald-200/80 sm:hidden" />
      </span>
    </motion.a>
  );
}
