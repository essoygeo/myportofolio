"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Presentation } from "lucide-react";
import Image from "next/image";
import type { Locale, Project, ProjectsContent } from "@/data/portfolio";
import { SectionHeading } from "@/components/site/section-heading";
import { ProjectExplainer } from "@/components/site/project-explainer";
import { cn } from "@/lib/cn";

type ProjectsProps = {
  projects: Project[];
  copy: ProjectsContent;
  locale: Locale;
};

export function Projects({ projects, copy, locale }: ProjectsProps) {
  const categories = useMemo(() => [copy.allLabel, ...new Set(projects.map((project) => project.category))], [projects, copy.allLabel]);
  const [activeCategory, setActiveCategory] = useState(copy.allLabel);
  const [explainedProject, setExplainedProject] = useState<Project | null>(null);

  useEffect(() => {
    setActiveCategory(copy.allLabel);
  }, [copy.allLabel]);

  const filteredProjects =
    activeCategory === copy.allLabel
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition",
                activeCategory === category
                  ? "border-cyan-400/30 bg-cyan-400/15 text-cyan-100"
                  : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl"
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => project.explain && setExplainedProject(project)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    if (project.explain) setExplainedProject(project);
                  }
                }}
                aria-label={locale === "fr" ? `Détails de ${project.title}` : `Details of ${project.title}`}
                className="block w-full cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-inset"
              >
              <div className="relative h-56 overflow-hidden bg-slate-950">
                {project.image ? (
                  <>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className={cn(
                        "transition duration-700 group-hover:scale-105",
                        project.imageFit === "cover"
                          ? "object-cover group-hover:scale-110"
                          : "object-contain p-3"
                      )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.22),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.2),transparent_28%)] opacity-90 transition duration-500 group-hover:scale-105" />
                )}

                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs text-slate-200 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-cyan-300" />
                  {project.category}
                </div>
                {project.featured ? (
                  <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                    Featured
                  </div>
                ) : null}

                {project.explain ? (
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/80 px-3 py-1.5 text-xs font-medium text-cyan-200 backdrop-blur-md opacity-90 transition group-hover:opacity-100">
                    <Presentation className="h-3.5 w-3.5" />
                    {locale === "fr" ? "Clique pour l'explication" : "Click for explanation"}
                  </div>
                ) : null}

                {project.demoUrl || project.githubUrl ? (
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 transition duration-300 group-hover:opacity-100">
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} — demo`}
                        className="rounded-full border border-white/10 bg-slate-950/80 p-2.5 text-white backdrop-blur-md transition hover:bg-cyan-400 hover:text-slate-950"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : null}
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} — GitHub`}
                        className="rounded-full border border-white/10 bg-slate-950/80 p-2.5 text-white backdrop-blur-md transition hover:bg-cyan-400 hover:text-slate-950"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <div className="space-y-5 p-6">
                <div>
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-cyan-400/15 bg-cyan-400/5 px-3 py-1 text-xs font-medium text-slate-200"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      onClick={(event) => event.stopPropagation()}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                    >
                      Source <Github className="h-4 w-4" />
                    </a>
                  ) : null}
                  {project.explain ? (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setExplainedProject(project);
                      }}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(34,211,238,0.35)]"
                    >
                      <Presentation className="h-4 w-4" />
                      {locale === "fr" ? "ME explique" : "ME explains"}
                    </button>
                  ) : null}
                </div>
              </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <ProjectExplainer
        project={explainedProject}
        locale={locale}
        onClose={() => setExplainedProject(null)}
      />
    </section>
  );
}
