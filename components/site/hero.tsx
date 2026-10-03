"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import type { HeroContent, Identity } from "@/data/portfolio";
import { cn } from "@/lib/cn";

type HeroProps = {
  data: HeroContent;
  identity: Identity;
};

export function Hero({ data, identity }: HeroProps) {
  return (
    <section id="home" className="relative overflow-hidden pb-16 pt-24 sm:pt-32 lg:pb-24">
      {/* Arrière-plan */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_30%),linear-gradient(180deg,rgba(15,23,42,0.4),transparent_50%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -left-24 top-10 -z-10 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 top-1/3 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        {/* --- Colonne texte (dessous sur mobile, à gauche sur desktop) --- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="order-2 max-w-3xl lg:order-1"
        >
          <h1 className="text-[2.6rem] leading-[1.1] font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {data.title.split(data.highlight).map((chunk, index, array) => (
              <span key={index}>
                {chunk}
                {index < array.length - 1 ? (
                  <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                    {data.highlight}
                  </span>
                ) : null}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
            {data.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {data.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-200 backdrop-blur-md"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={data.primaryCta.href}
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-white/10 transition",
                "hover:-translate-y-0.5 hover:bg-cyan-100"
              )}
            >
              {data.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={data.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/10"
            >
              {data.secondaryCta.label}
            </a>
          </div>

          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-medium text-emerald-200">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {data.status}
          </div>
        </motion.div>

        {/* --- Colonne photo (au-dessus sur mobile, à droite sur desktop) --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="order-1 mx-auto w-full max-w-md lg:order-2 lg:max-w-none"
        >
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent blur-2xl"
            />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-4">
              {/* Photo */}
              <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900/80">
                {data.photo.src ? (
                  <div className="relative aspect-[4/5] w-full sm:aspect-[16/11] lg:aspect-[4/5]">
                    <Image
                      src={data.photo.src}
                      alt={data.photo.alt}
                      fill
                      priority
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 40vw, 34vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1.5 text-[11px] font-medium text-slate-200 backdrop-blur-md">
                      <MapPin className="h-3 w-3 text-cyan-300" />
                      {identity.location}
                    </div>
                  </div>
                ) : (
                  <div className="flex aspect-[4/5] w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.25),transparent_38%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.18),transparent_32%),linear-gradient(180deg,rgba(15,23,42,1),rgba(2,6,23,1))]">
                    <div className="flex h-36 w-36 items-center justify-center rounded-full border border-white/10 bg-white/5 text-4xl font-semibold tracking-[0.2em] text-white shadow-glow">
                      {data.photo.initials}
                    </div>
                  </div>
                )}
              </div>

              {/* Identité + tagline */}
              <div className="px-1 pt-4">
                <p className="text-base font-semibold text-white">{identity.name}</p>
                <p className="mt-0.5 text-sm leading-6 text-slate-400">{identity.tagline}</p>
              </div>

              <p className="mt-3 px-1 text-xs leading-6 text-slate-500">{data.photo.caption}</p>

              {/* Statistiques */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {data.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/5 bg-white/[0.03] p-3 text-center transition hover:border-white/10 hover:bg-white/[0.06]"
                  >
                    <p className="text-lg font-semibold text-white sm:text-2xl">{stat.value}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-slate-500">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
