"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import type { Locale, Project } from "@/data/portfolio";
import { cn } from "@/lib/cn";

type ProjectExplainerProps = {
  project: Project | null;
  locale: Locale;
  onClose: () => void;
};

const AUTO_CLOSE_MS = 14000;

export function ProjectExplainer({ project, locale, onClose }: ProjectExplainerProps) {
  const reducedMotion = useReducedMotion();
  const reduced = reducedMotion === true;
  const [pointIndex, setPointIndex] = useState(0);
  const closeTimerRef = useRef<number | null>(null);
  const pointTimerRef = useRef<number | null>(null);

  const isFr = locale === "fr";

  // Remise à zéro à chaque ouverture
  useEffect(() => {
    if (!project) return;
    setPointIndex(0);

    // Fermeture auto quand tout est affiché
    const total = (project.explain?.points?.length ?? 0) + 1;
    pointTimerRef.current = window.setInterval(() => {
      setPointIndex((index) => (index < total - 1 ? index + 1 : index));
    }, 2600);

    closeTimerRef.current = window.setTimeout(onClose, AUTO_CLOSE_MS);

    return () => {
      if (pointTimerRef.current !== null) window.clearInterval(pointTimerRef.current);
      if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
    };
  }, [project, onClose]);

  if (!project) return null;

  const explain = project.explain;
  const total = (explain?.points?.length ?? 0) + 1;
  const currentPoint = pointIndex === 0 ? null : explain?.points[pointIndex - 1];
  const isDone = pointIndex >= total - 1;

  const areas = [
    ...(explain?.points ?? []).map((point) => ({ label: point, type: "point" as const })),
  ];

  return (
    <AnimatePresence>
      <motion.div
        key={project.title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={isFr ? `Explication du projet ${project.title}` : `Explanation of ${project.title}`}
      >
        <motion.div
          initial={{ scale: 0.9, y: 16 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.94, y: 10 }}
          transition={{ type: "spring", stiffness: 240, damping: 24 }}
          onClick={(event) => event.stopPropagation()}
          className="w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl shadow-black/60"
        >
          {/* En-tête */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-sm font-bold text-white">
                {project.title
                  .split(" ")
                  .map((word) => word[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{project.title}</p>
                <p className="text-xs text-slate-400">
                  {isFr ? "ME t'explique ce projet" : "ME explains this project"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={isFr ? "Fermer" : "Close"}
              className="rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Corps : tableau noir */}
          <div className="p-6">
            <div className="relative overflow-hidden rounded-2xl border border-[#2f3b4f] bg-[#0b1120] shadow-[inset_0_2px_20px_rgba(0,0,0,0.7)]">
              {/* Bandeau supérieur tableau */}
              <div className="flex h-6 items-center justify-end gap-2 border-b border-[#1e2a3d] bg-[#0d1526] px-4">
                <span className="h-2 w-2 rounded-full bg-rose-400/80" />
                <span className="h-2 w-2 rounded-full bg-amber-400/80" />
                <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
              </div>

              <div className="min-h-72 p-6 sm:min-h-80 sm:p-8">
                {/* Ligne + règle */}
                <div className="relative">
                  <div className="flex items-start gap-3">
                    <span className="mt-2 flex h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                    <div className="flex-1 text-sm leading-7 text-slate-200 sm:text-base sm:leading-8">
                      {/* Intro */}
                      <AnimatePresence mode="wait">
                        {pointIndex === 0 && explain?.intro ? (
                          <motion.p
                            key="intro"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.4 }}
                            className="font-medium text-white"
                          >
                            {explain.intro}
                          </motion.p>
                        ) : isDone ? (
                          <motion.p
                            key="outro"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.4 }}
                            className="font-medium text-emerald-300"
                          >
                            {explain?.outro}
                          </motion.p>
                        ) : currentPoint ? (
                          <motion.p
                            key={`point-${pointIndex}`}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.4 }}
                            className="text-slate-100"
                          >
                            {currentPoint}
                          </motion.p>
                        ) : null}
                      </AnimatePresence>
                    </div>

                    {/* Règle qui pointe ---> */}
                    {!reduced && pointIndex > 0 && !isDone ? (
                      <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="relative mt-2 hidden shrink-0 sm:block"
                      >
                        <motion.div
                          animate={{ rotate: [-4, 4, -4] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                          className="flex items-center gap-0"
                        >
                          <span className="h-1.5 w-24 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500 shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
                          <span className="-ml-1 h-0 w-0 border-y-[6px] border-l-[8px] border-y-transparent border-l-cyan-300" />
                        </motion.div>
                      </motion.div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* Points listés en bas */}
            <div className="mt-4 grid gap-1.5">
              {areas.map((area, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-2 py-1 text-xs transition",
                    index === pointIndex - 1
                      ? "bg-cyan-400/10 text-cyan-100"
                      : index < pointIndex - 1
                        ? "text-slate-500"
                        : "text-slate-600"
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 shrink-0 rounded-full",
                      index === pointIndex - 1 ? "bg-cyan-300" : "bg-slate-600"
                    )}
                  />
                  <span className="line-clamp-1">{area.label}</span>
                </div>
              ))}
            </div>

            {/* Barre de progression */}
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                animate={{ width: `${((pointIndex + 1) / total) * 100}%` }}
                transition={{ duration: 0.6 }}
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}