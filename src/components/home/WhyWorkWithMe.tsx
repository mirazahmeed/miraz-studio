"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimateIn } from "@/components/ui/AnimateIn";

interface Principle {
  number: string;
  title: string;
  description: string;
  imageUrl: string;
  linkText?: string;
}

const principles: Principle[] = [
  {
    number: "01",
    title: "DESIGN + DEVELOPMENT",
    description:
      "I don't stop at visual design. I engineer the full-stack architecture, ensuring what is drafted in Figma runs at 60fps in production code without translation loss.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    linkText: "EXPLORE ARCHITECTURE",
  },
  {
    number: "02",
    title: "DETAIL OBSESSION",
    description:
      "From sub-pixel baseline alignment to micro-interaction easing and accessible focus rings. Subtle details compound into an unmistakable aura of luxury and trustworthiness.",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
    linkText: "INSPECT SPECIFICATIONS",
  },
  {
    number: "03",
    title: "PRODUCT THINKING",
    description:
      "I evaluate decisions through conversion metrics, user comprehension, and long-term codebase maintainability—not merely decorative trends.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    linkText: "VIEW CASE STUDIES",
  },
  {
    number: "04",
    title: "DIRECT COMMUNICATION",
    description:
      "You collaborate directly with the senior engineer and designer building your product. Rapid iterations, zero bureaucratic telephone game, total ownership.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    linkText: "GET IN TOUCH",
  },
  {
    number: "05",
    title: "VERIFIABLE EXECUTION",
    description:
      "No fabricated testimonials or phantom metrics. Every project is backed by live websites, public repositories, or verified enterprise benchmarks.",
    imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=600&q=80",
    linkText: "VERIFY THE WORK",
  },
];

export function WhyWorkWithMe() {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  return (
    <section className="py-24 sm:py-32 border-b border-[#E6E6E4] bg-white">
      <div className="studio-container">
        {/* Section Header */}
        <AnimateIn variant="fade-up" delay={0}>
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-16 border-b border-[#E6E6E4] gap-6">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#71717A] block mb-3">
                02 / WHY WORK WITH ME
              </span>
              <h2 className="text-[28px] sm:text-[38px] font-normal tracking-[-0.03em] text-[#111111] uppercase">
                CRAFTED FOR AMBITIOUS TEAMS
              </h2>
            </div>
            <p className="text-[14px] text-[#555555] max-w-md font-light leading-relaxed">
              An integrated product engineering practice that eliminates the conventional friction between design vision and production code.
            </p>
          </div>
        </AnimateIn>

        {/* Principles List with Direct Photographic Imagery */}
        <div className="divide-y divide-[#E6E6E4] border-y border-[#E6E6E4]">
          {principles.map((item, idx) => {
            const isHovered = activeIdx === idx;
            return (
              <AnimateIn key={item.number} variant="fade-up" delay={0.05 + idx * 0.08}>
                <motion.div
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`py-8 sm:py-12 transition-colors duration-200 ${
                    isHovered ? "bg-[#FAFAF9]" : "bg-white"
                  }`}
                  layout
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Number & Title (Span 5) */}
                    <div className="md:col-span-5 flex items-baseline gap-6">
                      <span className="text-[12px] font-mono text-[#8E8E93] tracking-widest">
                        {item.number}
                      </span>
                      <h3 className="text-[20px] sm:text-[24px] font-normal tracking-[-0.02em] text-[#111111] uppercase">
                        {item.title}
                      </h3>
                    </div>

                    {/* Description (Span 4) */}
                    <div className="md:col-span-4 space-y-3">
                      <p className="text-[14px] text-[#555555] font-light leading-relaxed">
                        {item.description}
                      </p>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#111111] hover:text-[#71717A] transition-colors"
                      >
                        <span>{item.linkText}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {/* Image Preview on the Right (Span 3) */}
                    <div className="md:col-span-3 flex justify-start md:justify-end">
                      <div className="relative w-28 h-28 sm:w-36 sm:h-36 overflow-hidden rounded-[2px] border border-[#E6E6E4] bg-neutral-100">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={item.imageUrl}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }}
                            className="absolute inset-0"
                          >
                            <Image
                              src={item.imageUrl}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-500 hover:scale-105"
                              sizes="160px"
                            />
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
