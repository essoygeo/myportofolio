"use client";

import { motion } from "framer-motion";
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
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] sm:bottom-6 sm:right-6"
      aria-label={footer.whatsappCta}
      title={footer.whatsappCta}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </motion.a>
  );
}