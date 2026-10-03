import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { CustomCursor } from "@/components/site/custom-cursor";
import { ScrollProgress } from "@/components/site/scroll-progress";

export const metadata: Metadata = {
  title: "Baliki Essohanam — Développeur Full Stack",
  description:
    "Portfolio de Baliki Essohanam, développeur full stack à Lomé (Togo). Sites et applications web modernes en Next.js, React et Node.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className="bg-slate-950 text-white antialiased">
        <div
          aria-hidden="true"
          className="grid-overlay pointer-events-none fixed inset-0 -z-10"
        />
        <CustomCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
