"use client";

import { motion } from "framer-motion";
import type { SkillGroup, SkillsContent } from "@/data/portfolio";
import { SectionHeading } from "@/components/site/section-heading";

type SkillsProps = {
  skills: SkillGroup[];
  copy: SkillsContent;
};

export function Skills({ skills, copy }: SkillsProps) {
  return (
    <section id="skills" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((group, index) => (
            <motion.article
              key={group.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:border-cyan-400/20 hover:bg-white/[0.07]"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-sm font-bold text-cyan-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-300/80">
                  {group.title}
                </p>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">{group.description}</h3>
              <div className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-300 transition hover:border-cyan-400/20 hover:bg-cyan-400/10 hover:text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
