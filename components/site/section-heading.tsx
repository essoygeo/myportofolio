"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}
    >
      <div
        className={cn(
          "mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-400/10 px-3.5 py-1.5",
          align === "center" && "justify-center"
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-200">
          {eyebrow}
        </p>
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
