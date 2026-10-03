"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/data/portfolio";
import { portfolioData } from "@/data/portfolio";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Projects } from "@/components/site/projects";
import { Skills } from "@/components/site/skills";
import { Testimonials } from "@/components/site/testimonials";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { FloatingWhatsApp } from "@/components/site/floating-whatsapp";
import { MascotMe } from "@/components/site/mascot-me";

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>("fr");

  useEffect(() => {
    const storedLocale = window.localStorage.getItem("portfolio-locale");
    if (storedLocale === "fr" || storedLocale === "en") {
      setLocale(storedLocale);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("portfolio-locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const content = portfolioData.locales[locale];

  return (
    <>
      <Navbar
        brand={portfolioData.identity.name}
        nav={content.nav}
        locale={locale}
        onLocaleChange={setLocale}
      />
      <main>
        <Hero data={content.hero} identity={portfolioData.identity} />
        <About data={content.about} />
        <Projects projects={content.projects} copy={content.projectsSection} locale={locale} />
        <Skills skills={content.skills} copy={content.skillsSection} />
        <Testimonials testimonials={content.testimonials} copy={content.testimonialsSection} />
        <Contact
          data={content.contact}
          socials={portfolioData.socials}
          identity={portfolioData.identity}
          locale={locale}
        />
      </main>
      <Footer data={content.footer} />
      <FloatingWhatsApp footer={content.footer} identity={portfolioData.identity} />
      <MascotMe
        locale={locale}
        name={portfolioData.identity.name}
        role={portfolioData.identity.role}
      />
    </>
  );
}
