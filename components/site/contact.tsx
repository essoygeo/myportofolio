"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Globe, Linkedin, Mail, MapPin, Send, Twitter } from "lucide-react";
import type { ContactContent, SocialLink, Identity, Locale } from "@/data/portfolio";
import { SectionHeading } from "@/components/site/section-heading";

type ContactProps = {
  data: ContactContent;
  socials: SocialLink[];
  identity: Identity;
  locale: Locale;
};

const socialIconMap: Record<SocialLink["icon"], typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  dribbble: Globe,
  twitter: Twitter,
  mail: Mail,
};

const socialIconLabel: Record<SocialLink["icon"], string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  dribbble: "Dribbble",
  twitter: "Twitter",
  mail: "Email",
};

export function Contact({ data, socials, identity, locale }: ContactProps) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xoevqqyd";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget; // capturé AVANT l'await : currentTarget devient null après
    setState("loading");

    const formData = new FormData(form);
    formData.set("locale", locale);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Formspree a répondu ${response.status}`);
      }

      setState("success");
      form.reset();
    } catch (error) {
      console.error("[Contact] Échec de l'envoi Formspree :", error);
      setState("error");
    }
  }

  return (
    <section id="contact" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={data.eyebrow} title={data.title} description={data.description} />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <motion.form
            onSubmit={onSubmit}
            action={FORMSPREE_ENDPOINT}
            method="POST"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  {data.form.name}
                </span>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder={data.form.name}
                  className="h-12 rounded-2xl border border-white/10 bg-slate-950/50 px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/30"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  {data.form.email}
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder={data.form.email}
                  className="h-12 rounded-2xl border border-white/10 bg-slate-950/50 px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/30"
                />
              </label>
            </div>

            <label className="mt-4 grid gap-2">
              <span className="text-xs uppercase tracking-[0.24em] text-slate-500">
                {data.form.subject}
              </span>
              <input
                name="subject"
                type="text"
                required
                placeholder={data.form.subject}
                className="h-12 w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/30"
              />
            </label>

            <label className="mt-4 grid gap-2">
              <span className="text-xs uppercase tracking-[0.24em] text-slate-500">
                {data.form.message}
              </span>
              <textarea
                name="message"
                rows={6}
                required
                placeholder={data.form.message}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/30"
              />
            </label>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={state === "loading"}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {state === "loading" ? data.form.pending : data.form.button}{" "}
                <Send className="h-4 w-4" />
              </button>
              {state === "success" ? (
                <p className="text-sm text-emerald-300">{data.form.success}</p>
              ) : null}
              {state === "error" ? (
                <p className="text-sm text-rose-300">{data.form.error}</p>
              ) : null}
            </div>
            <p className="mt-4 text-xs leading-6 text-slate-500">{data.form.helper}</p>
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="space-y-6"
          >
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">{data.emailLabel}</p>
                  <a className="text-lg font-medium text-white" href={`mailto:${identity.email}`}>
                    {identity.email}
                  </a>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-white">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">{data.locationLabel}</p>
                  <p className="text-lg font-medium text-white">{identity.location}</p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-300">
                <span className="text-slate-400">{data.availabilityLabel}: </span>
                {identity.availability}
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{data.socialsLabel}</p>
              <div className="mt-5 grid gap-3">
                {socials.map((social) => {
                  const Icon = socialIconMap[social.icon];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-400/20 hover:bg-cyan-400/10 hover:text-white"
                    >
                      <span className="inline-flex items-center gap-3">
                        <Icon className="h-4 w-4 text-cyan-300/80" />
                        {socialIconLabel[social.icon]}
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
