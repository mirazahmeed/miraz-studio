"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimateIn } from "@/components/ui/AnimateIn";

export function VisualBreaker() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax: image moves slower than scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  // Subtle scale on scroll
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.04]);
  // Progress bar fills as section scrolls
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 border-b border-[#E6E6E4] bg-white"
    >
      <div className="studio-container">
        {/* Full Viewport Width Panoramic Composition with Parallax */}
        <AnimateIn variant="scale-up" duration={0.8}>
          <div className="relative w-full aspect-16/9 md:aspect-21/9 overflow-hidden rounded-[2px] border border-[#E6E6E4] bg-neutral-100">
            <motion.div
              className="absolute inset-[-10%] w-[120%] h-[120%]"
              style={{ y: imageY, scale: imageScale }}
            >
              <Image
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2200&q=90"
                alt="Built with intention technology composition"
                fill
                className="object-cover"
                sizes="(max-width: 1536px) 100vw, 1500px"
              />
            </motion.div>
            <div className="absolute inset-0 bg-black/10" />

            {/* Minimal Corner Caption */}
            <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 bg-white/90 backdrop-blur-md px-4 py-2 text-[10px] uppercase font-mono tracking-widest text-[#111111] border border-[#E6E6E4]">
              BUILT WITH INTENTION • 2026
            </div>
          </div>
        </AnimateIn>

        {/* Delicate Slider / Pagination Bar matching reference */}
        <div className="mt-8 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.16em] text-[#8E8E93]">
            SPATIAL MONOGRAPH 01 / 03
          </span>
          <div className="w-36 sm:w-48 h-[2px] bg-neutral-200 relative overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 bottom-0 bg-[#111111]"
              style={{ width: progressWidth }}
            />
          </div>
          <span className="text-[10px] uppercase tracking-[0.16em] text-[#8E8E93]">
            EXPLORE DETAILS
          </span>
        </div>
      </div>
    </section>
  );
}
