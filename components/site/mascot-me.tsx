"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type Ref } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, X } from "lucide-react";
import type { Locale } from "@/data/portfolio";
import { cn } from "@/lib/cn";

type TourStep = {
  target: string;
  text: string;
};

type MascotMeProps = {
  locale: Locale;
  name: string;
  role: string;
};

const DISMISS_KEY = "me-tour-dismissed";
const AUTO_OPEN_DELAY = 1800;
const TYPE_SPEED = 12;
const TIP_DURATION = 5000;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getSteps(locale: Locale, name: string, role: string): TourStep[] {
  const where = locale === "fr" ? "basé à Lomé" : "based in Lomé";
  const roleText = role.toLowerCase();

  return [
    {
      target: "home",
      text:
        locale === "fr"
          ? `Salut, moi c'est ME ! Bienvenue sur le portfolio de ${name}, ${roleText} ${where}. Je te propose une petite visite guidée.`
          : `Hey, I'm ME! Welcome to ${name}'s portfolio — a ${roleText} ${where}. Let me show you around.`,
    },
    {
      target: "about",
      text:
        locale === "fr"
          ? `${name} a étudié l'informatique à IAI-Togo : L1 (2023-2024), L2 (2024-2025) et L3 (2025-2026), où il a obtenu sa licence.`
          : `${name} studied computer science at IAI-Togo: L1 (2023-2024), L2 (2024-2025) and L3 (2025-2026), where he earned his degree.`,
    },
    {
      target: "projects",
      text:
        locale === "fr"
          ? "Tu vas découvrir ses projets : Repéto (application mobile Flutter), GestionDemandes (ERP Laravel) et EgaBank (Spring Boot & Angular). Tout le code est sur son GitHub."
          : "You'll discover his projects: Repéto (Flutter mobile app), GestionDemandes (Laravel ERP) and EgaBank (Spring Boot & Angular). All the code is on his GitHub.",
    },
    {
      target: "skills",
      text:
        locale === "fr"
          ? "Laravel, Flutter, Spring Boot, Next.js, Python… les technologies qui font tourner ses projets."
          : "Laravel, Flutter, Spring Boot, Next.js, Python… the technologies that power his projects.",
    },
    {
      target: "contact",
      text:
        locale === "fr"
          ? "Email, WhatsApp ou LinkedIn : il répond vite. Merci pour ta visite, bonne découverte !"
          : "Email, WhatsApp or LinkedIn: he replies fast. Thanks for visiting, enjoy your stay!",
    },
  ];
}

const TIPS: Record<Locale, Record<string, string>> = {
  fr: {
    about: "Franchement, son parcours m'impressionne : trois ans d'informatique jusqu'à la licence, belle détermination !",
    projects: "La section projets ? J'adore ! Repéto est clairement son plus gros morceau.",
    skills: "Spring Boot, Laravel, Flutter… une stack complète, chapeau !",
    contact: "Il répond vite sur WhatsApp ou LinkedIn, n'hésitez pas !",
  },
  en: {
    about: "Honestly, his journey impresses me: three years of computer science up to his degree, great determination!",
    projects: "The projects section? I love it! Repéto is clearly his biggest piece.",
    skills: "Spring Boot, Laravel, Flutter… a complete stack, hats off!",
    contact: "He replies fast on WhatsApp or LinkedIn, don't hesitate!",
  },
};

type EyesVariant = "normal" | "happy" | "wink";
type MouthVariant = "smile" | "open" | "talk";

type MascotAvatarProps = {
  size: "md" | "lg";
  reduced: boolean;
  eyes: EyesVariant;
  mouth: MouthVariant;
  blush: boolean;
  wave: boolean;
  talking: boolean;
  walking?: boolean;
  hopKey?: number;
  eyeOffset: { x: number; y: number };
  innerRef?: Ref<HTMLDivElement>;
};

function Eye({ offset, blink }: { offset: { x: number; y: number }; blink: boolean }) {
  return (
    <motion.span
      animate={blink ? { scaleY: [1, 1, 0.15, 1] } : { scaleY: 1 }}
      transition={{
        duration: 4.5,
        times: [0, 0.92, 0.96, 1],
        repeat: Infinity,
        repeatDelay: 2.5,
      }}
      className="flex h-2 w-2.5 items-center justify-center overflow-hidden rounded-full bg-white/95"
      style={{ transformOrigin: "center" }}
    >
      <span
        className="h-1 w-1 rounded-full bg-slate-900"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      />
    </motion.span>
  );
}

function HappyEye() {
  return <span className="h-[3px] w-2.5 rounded-b-full bg-white/95" />;
}

function MascotAvatar({
  size,
  reduced,
  eyes,
  mouth,
  blush,
  wave,
  talking,
  walking,
  hopKey,
  eyeOffset,
  innerRef,
}: MascotAvatarProps) {
  const talkingMouth = mouth === "talk" && !reduced;
  const large = size === "lg";

  return (
    <motion.div
      ref={innerRef}
      animate={
        reduced
          ? undefined
          : walking
            ? { x: [0, 4, 0, -4, 0], y: [0, -2, 0, -2, 0], rotate: [0, 4, 0, -4, 0] }
            : { y: [0, -5, 0], rotate: [0, 1.6, 0, -1.6, 0] }
      }
      transition={
        walking
          ? { duration: 0.85, repeat: Infinity, ease: "easeInOut" }
          : { duration: 4.4, repeat: Infinity, ease: "easeInOut" }
      }
      className="relative"
    >
      {/* ombre portée animée (effet de lévitation / pas) */}
      <motion.span
        aria-hidden="true"
        animate={
          reduced
            ? undefined
            : walking
              ? { scaleX: [1, 0.72, 1, 0.72, 1], opacity: [0.4, 0.22, 0.4, 0.22, 0.4] }
              : { scaleX: [1, 0.8, 1], opacity: [0.45, 0.26, 0.45] }
        }
        transition={
          walking
            ? { duration: 0.85, repeat: Infinity, ease: "easeInOut" }
            : { duration: 4.4, repeat: Infinity, ease: "easeInOut" }
        }
        className="absolute -bottom-1.5 left-1/2 h-2 w-10 -translate-x-1/2 rounded-full bg-black/50 blur-[3px]"
      />

      <span className="absolute inset-0 -z-10 rounded-full bg-cyan-400/25 blur-xl" />

      <motion.div
        key={hopKey}
        initial={{ y: 0, scale: 1 }}
        animate={
          hopKey !== undefined && !reduced
            ? { y: [0, -7, 0], scale: [1, 1.06, 1] }
            : undefined
        }
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative"
      >
        <div
          className={cn(
            "relative flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-600 shadow-[0_8px_30px_rgba(34,211,238,0.35)] ring-2 ring-white/30",
            large ? "h-14 w-14" : "h-11 w-11"
          )}
        >
          {/* respiration douce */}
          <motion.span
            aria-hidden="true"
            animate={reduced ? undefined : { scale: [1, 1.035, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full"
            style={{ transformOrigin: "center" }}
          />

          {/* particules scintillantes */}
          <motion.span
            aria-hidden="true"
            animate={
              reduced
                ? undefined
                : { opacity: [0.35, 1, 0.35], scale: [0.9, 1.15, 0.9] }
            }
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-0.5 -top-0.5 text-[9px] text-white/90"
          >
            ✦
          </motion.span>
          <motion.span
            aria-hidden="true"
            animate={
              reduced
                ? undefined
                : { opacity: [1, 0.3, 1], scale: [1.1, 0.85, 1.1] }
            }
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-1 bottom-1 text-[8px] text-white/60"
          >
            ✦
          </motion.span>

          {/* mains */}
          <motion.span
            aria-hidden="true"
            animate={
              reduced
                ? undefined
                : talking
                  ? { y: [0, -2, 0] }
                  : walking
                    ? { rotate: [0, -22, 0, -22, 0] }
                    : { rotate: [0, 6, 0] }
            }
            transition={
              talking
                ? { duration: 0.9, repeat: Infinity, ease: "easeInOut" }
                : walking
                  ? { duration: 0.85, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }
            style={{ transformOrigin: "20% 100%" }}
            className={cn(
              "absolute top-7 rounded-full bg-gradient-to-br from-white to-cyan-100 ring-1 ring-white/30",
              large ? "-left-[3px] h-4 w-3.5 shadow-[0_2px_8px_rgba(2,6,23,0.4)]" : "-left-[2px] h-3.5 w-3"
            )}
          />

          <motion.span
            aria-hidden="true"
            animate={
              reduced
                ? undefined
                : wave
                  ? { rotate: [-22, 30, -22], y: [0, -1, 0] }
                  : talking
                    ? { y: [0, -2, 0] }
                    : walking
                      ? { rotate: [0, 22, 0, 22, 0] }
                      : { rotate: [0, -6, 0] }
            }
            transition={
              wave
                ? { duration: 0.7, repeat: Infinity, repeatDelay: 2.2, ease: "easeInOut" }
                : talking
                  ? { duration: 0.9, repeat: Infinity, ease: "easeInOut" }
                  : walking
                    ? { duration: 0.85, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }
            style={{ transformOrigin: "80% 100%" }}
            className={cn(
              "absolute top-7 rounded-full bg-gradient-to-br from-white to-cyan-100 ring-1 ring-white/30",
              large ? "-right-[3px] h-4 w-3.5 shadow-[0_2px_8px_rgba(2,6,23,0.4)]" : "-right-[2px] h-3.5 w-3"
            )}
          />

          {/* pieds (balancement alterné pendant la marche) */}
          <motion.span
            aria-hidden="true"
            animate={
              reduced
                ? undefined
                : walking
                  ? { rotate: [0, 24, 0, -24, 0], y: [0, 1.5, 0, 1.5, 0] }
                  : { rotate: 0 }
            }
            transition={
              walking
                ? { duration: 0.85, repeat: Infinity, ease: "easeInOut" }
                : { duration: 4.4 }
            }
            style={{ transformOrigin: "15% 10%" }}
            className={cn(
              "absolute rounded-full bg-gradient-to-b from-white to-cyan-200 ring-1 ring-white/30",
              large ? "bottom-1 -left-[2px] h-2 w-3.5" : "bottom-0.5 -left-[1px] h-1.5 w-3"
            )}
          />
          <motion.span
            aria-hidden="true"
            animate={
              reduced
                ? undefined
                : walking
                  ? { rotate: [0, -24, 0, 24, 0], y: [0, 1.5, 0, 1.5, 0] }
                  : { rotate: 0 }
            }
            transition={
              walking
                ? { duration: 0.85, repeat: Infinity, ease: "easeInOut" }
                : { duration: 4.4 }
            }
            style={{ transformOrigin: "85% 10%" }}
            className={cn(
              "absolute rounded-full bg-gradient-to-b from-white to-cyan-200 ring-1 ring-white/30",
              large ? "bottom-1 -right-[2px] h-2 w-3.5" : "bottom-0.5 -right-[1px] h-1.5 w-3"
            )}
          />

          {/* joues roses */}
          {blush ? (
            <>
              <span className="absolute left-1 top-8 h-1 w-1.5 rounded-full bg-rose-300/90" />
              <span className="absolute right-1 top-8 h-1 w-1.5 rounded-full bg-rose-300/90" />
            </>
          ) : null}

          {/* visage */}
          <div className="flex flex-col items-center gap-[3px]">
            <div className="flex items-center gap-2">
              {eyes === "happy" ? (
                <>
                  <HappyEye />
                  <HappyEye />
                </>
              ) : eyes === "wink" ? (
                <>
                  <HappyEye />
                  <Eye offset={eyeOffset} blink={!reduced} />
                </>
              ) : (
                <>
                  <Eye offset={eyeOffset} blink={!reduced} />
                  <Eye offset={eyeOffset} blink={!reduced} />
                </>
              )}
            </div>

            {talkingMouth ? (
              <motion.span
                animate={{ scaleY: [0.35, 1.15, 0.35] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                className="h-1.5 w-2 rounded-full bg-white/95"
                style={{ transformOrigin: "center" }}
              />
            ) : mouth === "open" ? (
              <span className="h-2 w-2 rounded-full bg-white/95" />
            ) : (
              <span className="h-1 w-3.5 rounded-full bg-white/90" />
            )}
          </div>

          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-slate-950 px-1.5 py-0.5 text-[9px] font-bold tracking-widest text-cyan-300 ring-1 ring-white/15">
            ME
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function MascotMe({ locale, name, role }: MascotMeProps) {
  const reducedMotion = useReducedMotion();
  const reduced = reducedMotion === true;
  const [mode, setMode] = useState<"waiting" | "open" | "closed">("waiting");
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");
  const [tip, setTip] = useState<string | null>(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  // La mascotte "marche" le long de la page en fonction du scroll
  const { scrollYProgress } = useScroll();
  const walkY = useTransform(scrollYProgress, [0, 1], ["0vh", "-85vh"]);

  const avatarRef = useRef<HTMLDivElement>(null);
  const tipTimerRef = useRef<number | null>(null);
  const shownTipsRef = useRef(new Set<string>());

  const steps = useMemo(() => getSteps(locale, name, role), [locale, name, role]);
  const isLast = step >= steps.length - 1;
  const nextLabel =
    isLast
      ? locale === "fr"
        ? "Terminer"
        : "Finish"
      : locale === "fr"
        ? "Suivant"
        : "Next";
  const skipLabel = locale === "fr" ? "Je continue seul" : "I'll browse alone";
  const replayLabel = locale === "fr" ? "Revoir la visite" : "Restart the tour";

  const typingNow = mode === "open" && typed.length < steps[step].text.length;
  const eyes: EyesVariant =
    step === 0 ? "happy" : isLast ? "wink" : "normal";
  const mouth: MouthVariant = typingNow ? "talk" : step === 0 ? "open" : "smile";

  const clearTip = useCallback(() => {
    if (tipTimerRef.current !== null) {
      window.clearTimeout(tipTimerRef.current);
      tipTimerRef.current = null;
    }
    setTip(null);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let dismissed = false;
    try {
      dismissed = window.sessionStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      /* storage indisponible : on affiche quand même la visite */
    }

    const timer = window.setTimeout(() => {
      setMode(dismissed ? "closed" : "open");
    }, AUTO_OPEN_DELAY);

    return () => window.clearTimeout(timer);
  }, []);

  // Les pupilles suivent le curseur
  useEffect(() => {
    if (reduced) return;

    const handlePointerMove = (event: PointerEvent) => {
      const element = avatarRef.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = clamp((event.clientX - centerX) / (rect.width / 2), -1, 1);
      const dy = clamp((event.clientY - centerY) / (rect.height / 2), -1, 1);
      const nextX = Math.round(dx * 3);
      const nextY = Math.round(dy * 2);
      setEyeOffset((previous) =>
        previous.x === nextX && previous.y === nextY ? previous : { x: nextX, y: nextY }
      );
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reduced]);

  useEffect(() => {
    if (mode !== "open") return;
    const target = steps[step]?.target;
    if (!target) return;
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    }
  }, [mode, step, steps, reduced]);

  useEffect(() => {
    if (mode !== "open") {
      setTyped("");
      return;
    }

    const text = steps[step].text;

    if (reduced) {
      setTyped(text);
      return;
    }

    setTyped("");
    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setTyped(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(interval);
      }
    }, TYPE_SPEED);

    return () => window.clearInterval(interval);
  }, [mode, step, steps, reduced]);

  // Conseils contextuels quand la visite est terminée
  useEffect(() => {
    if (mode !== "closed") return;

    const sections = ["about", "projects", "skills", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find(
          (entry) => entry.isIntersecting && !shownTipsRef.current.has(entry.target.id)
        );
        if (!visible) return;

        const sectionId = visible.target.id;
        shownTipsRef.current.add(sectionId);
        const message = TIPS[locale][sectionId];
        if (!message) return;

        setTip(message);
        if (tipTimerRef.current !== null) {
          window.clearTimeout(tipTimerRef.current);
        }
        tipTimerRef.current = window.setTimeout(() => setTip(null), TIP_DURATION);
      },
      { threshold: 0.35 }
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [mode, locale]);

  useEffect(() => {
    return () => {
      if (tipTimerRef.current !== null) {
        window.clearTimeout(tipTimerRef.current);
      }
    };
  }, []);

  const goNext = useCallback(() => {
    if (step >= steps.length - 1) {
      try {
        window.sessionStorage.setItem(DISMISS_KEY, "1");
      } catch {
        /* ignore */
      }
      setMode("closed");
      return;
    }
    setStep((current) => current + 1);
  }, [step, steps.length]);

  const dismiss = useCallback(() => {
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
    setMode("closed");
  }, []);

  const restart = useCallback(() => {
    clearTip();
    setStep(0);
    setMode("open");
  }, [clearTip]);

  return (
    <div className="pointer-events-none fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] left-4 z-[70] sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] sm:left-6">
      <AnimatePresence mode="wait">
        {mode === "open" ? (
          <motion.div
            key="tour"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className="pointer-events-auto flex flex-col items-start gap-3"
          >
            <div className="w-[min(15.5rem,calc(100vw-7rem))] rounded-[1.75rem] bg-gradient-to-br from-cyan-400/50 via-sky-400/20 to-blue-500/50 p-px shadow-[0_16px_50px_rgba(2,6,23,0.55)] sm:w-80">
              <div className="relative rounded-[calc(1.75rem-1px)] bg-slate-950/90 p-4 backdrop-blur-2xl">
                <button
                  type="button"
                  onClick={dismiss}
                  aria-label={
                    locale === "fr" ? "Fermer la visite guidée" : "Close the guided tour"
                  }
                  className="absolute right-3 top-3 rounded-full p-1 text-slate-500 transition hover:bg-white/10 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>

                <div className="flex items-center justify-between pr-6">
                  <span className="rounded-full bg-cyan-400/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-cyan-300">
                    ME
                  </span>
                  <span className="text-[10px] font-medium tabular-nums text-slate-500">
                    {step + 1} / {steps.length}
                  </span>
                </div>

                <p
                  onClick={() => setTyped(steps[step].text)}
                  title={
                    locale === "fr" ? "Cliquer pour afficher en entier" : "Click to show full text"
                  }
                  className="mt-2.5 min-h-14 cursor-pointer text-xs leading-6 text-slate-100 sm:text-sm sm:leading-6"
                >
                  {typed}
                  {!reduced && typingNow ? (
                    <motion.span
                      aria-hidden="true"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 bg-cyan-300"
                    />
                  ) : null}
                </p>

                <div className="mt-3 flex items-center gap-1">
                  {steps.map((tourStep, index) => (
                    <button
                      key={tourStep.target}
                      type="button"
                      onClick={() => setStep(index)}
                      aria-label={`${locale === "fr" ? "Étape" : "Step"} ${index + 1}`}
                      className="flex h-6 items-center px-1"
                    >
                      <span
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-300",
                          index === step
                            ? "w-5 bg-cyan-300"
                            : "w-1.5 bg-white/20 hover:bg-white/40 active:bg-white/50"
                        )}
                      />
                    </button>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between gap-2 border-t border-white/5 pt-3">
                  <button
                    type="button"
                    onClick={goNext}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-cyan-100"
                  >
                    {nextLabel}
                    {!isLast ? <ChevronRight className="h-3.5 w-3.5" /> : null}
                  </button>
                  <button
                    type="button"
                    onClick={dismiss}
                    className="text-[11px] text-slate-400 underline-offset-2 transition hover:text-white hover:underline"
                  >
                    {skipLabel}
                  </button>
                </div>
              </div>
            </div>

            <MascotAvatar
              size="lg"
              reduced={reduced}
              eyes={eyes}
              mouth={mouth}
              blush={isLast}
              wave={step === 0}
              talking={typingNow}
              hopKey={mode === "open" ? step : undefined}
              eyeOffset={eyeOffset}
              innerRef={avatarRef}
            />
          </motion.div>
        ) : mode === "closed" || mode === "waiting" ? (
          <motion.div
            key="mini-panel"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="pointer-events-auto flex flex-col items-start gap-3"
            style={reduced ? undefined : { y: walkY }}
          >
            {mode === "closed" && tip ? (
              <motion.div
                key={tip}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
                className="w-[min(15rem,calc(100vw-6rem))] rounded-2xl border border-white/10 bg-slate-950/85 p-3 shadow-xl shadow-black/30 backdrop-blur-xl"
              >
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 rounded-full bg-cyan-400/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-cyan-300">
                    ME
                  </span>
                  <p className="text-xs leading-5 text-slate-200">{tip}</p>
                  <button
                    type="button"
                    onClick={clearTip}
                    aria-label={locale === "fr" ? "Fermer" : "Close"}
                    className="-mr-1 -mt-1 ml-auto rounded-full p-1 text-slate-500 transition hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            ) : null}

            <motion.button
              type="button"
              onClick={restart}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.92 }}
              className="relative"
              aria-label={replayLabel}
              title={replayLabel}
            >
              <span className="absolute inset-0 -z-10 animate-pulse rounded-full bg-cyan-400/25 blur-md" />
              <MascotAvatar
                size="md"
                reduced={reduced}
                eyes={eyes}
                mouth={mouth}
                blush={false}
                wave={false}
                talking={false}
                walking={!reduced}
                hopKey={undefined}
                eyeOffset={eyeOffset}
                innerRef={avatarRef}
              />
            </motion.button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}