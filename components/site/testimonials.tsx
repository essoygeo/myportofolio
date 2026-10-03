"use client";

import { motion } from "framer-motion";
import type { TestimonialsContent, Testimonial } from "@/data/portfolio";
import { SectionHeading } from "@/components/site/section-heading";

type TestimonialsProps = {
  testimonials: Testimonial[];
  copy: TestimonialsContent;
};

export function Testimonials({ testimonials, copy }: TestimonialsProps) {
  if (!testimonials.length) return null;

  return (
    <section className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <motion.figure
              key={testimonial.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <blockquote className="text-lg leading-8 text-white">"{testimonial.quote}"</blockquote>
              <figcaption className="mt-6 text-sm text-slate-400">
                <span className="font-medium text-white">{testimonial.name}</span>
                <span className="mx-2">/</span>
                {testimonial.role}, {testimonial.company}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
