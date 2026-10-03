import type { FooterContent } from "@/data/portfolio";

type FooterProps = {
  data: FooterContent;
};

export function Footer({ data }: FooterProps) {
  return (
    <footer className="border-t border-white/10 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-slate-300">{data.note}</p>
          <p className="text-xs text-slate-500">
            Copyright {new Date().getFullYear()} — Baliki Essohanam.
          </p>
        </div>
        <p className="text-xs uppercase tracking-[0.28em] text-slate-600">
          Full Stack — Web &amp; Mobile
        </p>
      </div>
    </footer>
  );
}
