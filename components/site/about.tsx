"use client";

import { motion } from "framer-motion";
import type { AboutContent } from "@/data/portfolio";
import { SectionHeading } from "@/components/site/section-heading";

type AboutProps = {
  data: AboutContent;
};

export function About({ data }: AboutProps) {
  return (
    <section id="about" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} description={data.description} />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6 }}
            className="grid gap-4"
          >
            <p className="text-xs uppercase tracking-[0.26em] text-slate-500">{data.statsLabel}</p>
            {data.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
              >
                <p className="text-sm text-slate-400">{stat.label}</p>
                <div className="mt-2 flex items-end justify-between gap-4">
                  <span className="text-3xl font-semibold text-white">{stat.value}</span>
                  <span className="max-w-48 text-right text-xs leading-5 text-slate-400">{stat.note}</span>
                </div>
              </div>
            ))}
          </motion.div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="space-y-5">
              <p className="text-xs uppercase tracking-[0.26em] text-slate-500">{data.timelineLabel}</p>
              {data.timeline.map((item) => (
                <motion.article
                  key={item.year + item.title}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.5 }}
                  className="relative pl-8"
                >
                  <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_0_6px_rgba(34,211,238,0.12)]" />
                  <div className="flex flex-col gap-2 rounded-2xl border border-white/5 bg-slate-950/40 p-5">
                    <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-slate-500">
                      <span>{item.year}</span>
                      <span className="h-px w-8 bg-white/10" />
                      <span>{item.organization}</span>
                    </div>
                    <h3 className="text-lg font-medium text-white">{item.title}</h3>
                    <p className="text-sm leading-7 text-slate-300">{item.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
