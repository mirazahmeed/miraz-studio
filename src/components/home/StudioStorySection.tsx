"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  MissionArtwork,
  WhyStudioArtwork,
  WorkArtwork,
} from "@/components/home/StudioStoryArtworks";

interface StudioStorySectionProps {
  label?: string;
  statement?: string;
  bio?: string;
  email?: string;
  location?: string;
}

export function StudioStorySection({
  label,
  statement,
}: StudioStorySectionProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const shouldReduceMotion = useReducedMotion();

  // Clean pill label
  const sectionLabel =
    label && !label.includes("01 /") ? label : "About Miraz Studio";

  const storyCards = [
    {
      id: "mission",
      number: "01",
      numberBadge: "1",
      title: "Our Mission",
      headlineLead: "We craft thoughtful digital experiences",
      headlineMuted: "that solve real problems, elevate brands, and create lasting value.",
      description:
        "Every product we build is designed with purpose, clarity, and measurable impact. Bridging rigorous aesthetics with full-stack engineering to eliminate digital noise.",
      Artwork: MissionArtwork,
    },
    {
      id: "why-us",
      number: "02",
      numberBadge: "2",
      title: "Why Miraz Studio",
      headlineLead: "We don't stop at making things look good.",
      headlineMuted: "We engineer products built around real goals and longevity.",
      description:
        "By pairing bespoke UI/UX design with production-grade Next.js development and AI automation, we eliminate the translation gap between design and code. Zero bloat, direct senior collaboration.",
      Artwork: WhyStudioArtwork,
    },
    {
      id: "work",
      number: "03",
      numberBadge: "3",
      title: "Our Work",
      headlineLead: "Real systems verified in production.",
      headlineMuted: "Not just static mockups or empty promises.",
      description:
        "From high-performance web applications to scalable design systems, every project in our registry is something you can test, inspect, and verify directly in production.",
      Artwork: WorkArtwork,
      cta: {
        href: "/work",
        text: "Explore all work",
      },
    },
  ];

  return (
    <section
      className="py-24 sm:py-32 border-b border-[#E6E6E4] bg-white relative overflow-hidden"
      aria-label="About Miraz Studio"
    >
      <div className="studio-container">
        {/* Section Pill Badge */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#E6E6E4] bg-white shadow-xs text-[12px] font-medium text-[#111111] transition-transform hover:scale-[1.02]">
            <span
              className="w-4 h-4 rounded-full bg-[#111111] text-white flex items-center justify-center text-[10px] font-bold leading-none"
              aria-hidden="true"
            >
              ›
            </span>
            <span className="tracking-tight">{sectionLabel}</span>
          </div>
        </div>

        {/* Editorial Headline with dual text weights/colors matching reference */}
        <div className="mb-14 sm:mb-16 max-w-4xl">
          <h2 className="text-[32px] sm:text-[44px] md:text-[50px] lg:text-[56px] font-normal leading-[1.14] tracking-[-0.03em]">
            <span className="text-[#111111] font-medium">
              {statement && !statement.includes("WE DON'T")
                ? statement
                : "I design and build digital experiences"}
            </span>{" "}
            <span className="text-[#71717A] font-light">
              that look exceptional, work beautifully, and solve real business problems.
            </span>
          </h2>
        </div>

        {/* 3-Column Equal-Width Story Card Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
          role="region"
          aria-label="Studio Stories"
        >
          {storyCards.map((card, idx) => {
            const isActive = activeIndex === idx;
            const CardArtwork = card.Artwork;

            return (
              <div
                key={card.id}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                aria-label={`${card.number} ${card.title}`}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                onFocus={() => setActiveIndex(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveIndex(idx);
                  }
                }}
                className={`group relative h-[530px] sm:h-[550px] lg:h-[560px] rounded-[24px] border transition-all duration-500 overflow-hidden flex flex-col justify-between cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 ${
                  isActive
                    ? "bg-white border-[#111111]/20 shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
                    : "bg-[#FAFAF9] hover:bg-white border-[#E6E6E4] shadow-xs"
                }`}
              >
                {/* Visual Artwork Container */}
                <div
                  className={`w-full flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive
                      ? "pt-6 pb-2 px-6 h-[200px] sm:h-[210px] scale-[0.88] -translate-y-1"
                      : "pt-12 pb-6 px-8 h-[380px] sm:h-[400px] scale-100 translate-y-0"
                  }`}
                >
                  <div className="w-full max-w-[270px] flex items-center justify-center">
                    <CardArtwork isActive={isActive} />
                  </div>
                </div>

                {/* Card Lower Region: Active Content vs Inactive Bottom Pill */}
                <div className="w-full px-6 sm:px-7 pb-6 sm:pb-7 flex-1 flex flex-col justify-end">
                  <AnimatePresence mode="wait" initial={false}>
                    {isActive ? (
                      /* ACTIVE STATE CONTENT */
                      <motion.div
                        key="active-content"
                        initial={
                          shouldReduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, y: 14 }
                        }
                        animate={
                          shouldReduceMotion
                            ? { opacity: 1 }
                            : { opacity: 1, y: 0 }
                        }
                        exit={
                          shouldReduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, y: -8 }
                        }
                        transition={{
                          duration: 0.4,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="space-y-4"
                      >
                        {/* Active Capsule Pill */}
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFAF9] border border-[#E6E6E4] text-[11px] font-medium uppercase tracking-[0.12em] text-[#111111]">
                            <span className="w-3.5 h-3.5 rounded-full bg-[#111111] text-white text-[9px] font-bold flex items-center justify-center">
                              {card.numberBadge}
                            </span>
                            <span>{card.title}</span>
                          </span>
                        </div>

                        {/* Bold Opening Headline */}
                        <h3 className="text-[17px] sm:text-[19px] lg:text-[20px] font-normal leading-snug tracking-tight text-[#111111]">
                          <span>{card.headlineLead}</span>{" "}
                          <span className="text-[#71717A] font-light">
                            {card.headlineMuted}
                          </span>
                        </h3>

                        {/* Supporting Narrative */}
                        <p className="text-[13px] sm:text-[13.5px] text-[#555555] font-light leading-relaxed">
                          {card.description}
                        </p>

                        {/* Optional CTA Link for Card 03 (Our Work) */}
                        {card.cta && (
                          <div className="pt-2">
                            <Link
                              href={card.cta.href}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#111111] hover:text-[#71717A] transition-colors border-b border-[#111111] pb-0.5"
                            >
                              <span>{card.cta.text}</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      /* INACTIVE STATE BOTTOM PILL */
                      <motion.div
                        key="inactive-pill"
                        initial={
                          shouldReduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, y: 8 }
                        }
                        animate={
                          shouldReduceMotion
                            ? { opacity: 1 }
                            : { opacity: 1, y: 0 }
                        }
                        exit={
                          shouldReduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, y: -6 }
                        }
                        transition={{
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex items-center justify-center py-2"
                      >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E6E6E4] shadow-xs text-[12px] font-medium text-[#111111] group-hover:border-[#111111]/30 transition-all duration-300">
                          <span className="w-4 h-4 rounded-full bg-[#111111] text-white text-[10px] font-bold flex items-center justify-center">
                            {card.numberBadge}
                          </span>
                          <span className="tracking-tight">{card.title}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
