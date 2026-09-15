"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";

export function PhilosophySection() {
  return (
    <section className="py-24 sm:py-32 border-b border-[#E6E6E4] bg-white">
      <div className="studio-container">
        {/* Top Header */}
        <AnimateIn variant="fade-up" delay={0}>
          <div className="pb-8 mb-16 border-b border-[#E6E6E4] flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#71717A] block mb-3">
                03 / DESIGN PHILOSOPHY
              </span>
              <h2 className="text-[28px] sm:text-[38px] font-normal tracking-[-0.03em] text-[#111111] uppercase">
                BUILT TO LOOK GOOD. BUILT TO WORK BETTER.
              </h2>
            </div>
            <p className="text-[14px] text-[#555555] max-w-md font-light leading-relaxed">
              Good design is not decoration. It is clarity, hierarchy, interaction, and intention.
            </p>
          </div>
        </AnimateIn>

        {/* Staggered Asymmetrical Photographic Composition */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column (Span 4): Text & Smaller Supporting Image */}
          <div className="md:col-span-4 space-y-8">
            <AnimateIn variant="fade-up" delay={0.1}>
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#8E8E93] font-mono">
                  [ PRINCIPLE 01 ]
                </span>
                <h3 className="text-[22px] sm:text-[26px] font-normal tracking-tight text-[#111111] uppercase">
                  NOT JUST A MERE AESTHETIC BUT USABILITY
                </h3>
                <p className="text-[14px] text-[#555555] font-light leading-relaxed">
                  We believe interfaces should evoke tranquility. By eliminating gratuitous cards, drop shadows, and noisy neon accents, we elevate your content into sharp, undeniable focus.
                </p>
              </div>
            </AnimateIn>

            <AnimateIn variant="scale-up" delay={0.25}>
              <div className="relative w-full aspect-square overflow-hidden rounded-[2px] border border-[#E6E6E4] bg-neutral-100">
                <Image
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
                  alt="Code editor close-up"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
            </AnimateIn>
          </div>

          {/* Center Column (Span 5): Large Architectural Crop */}
          <AnimateIn variant="scale-up" delay={0.15} duration={0.8} className="md:col-span-5">
            <div className="relative w-full aspect-3/4 overflow-hidden rounded-[2px] border border-[#E6E6E4] bg-neutral-100">
              <Image
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85"
                alt="Technology circuit board"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
          </AnimateIn>

          {/* Right Column (Span 3): Minimal Detail Box */}
          <div className="md:col-span-3 space-y-6 pt-4 md:pt-12">
            <AnimateIn variant="fade-right" delay={0.2}>
              <div className="p-6 bg-[#FAFAF9] border border-[#E6E6E4] space-y-4">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#71717A]">
                  ETHOS
                </span>
                <p className="text-[13px] text-[#444444] leading-relaxed">
                  Every line of code is an architectural decision. We prioritize lightweight payloads, zero-layout shifts, and instant server-side data delivery.
                </p>
                <div className="pt-2 border-t border-[#E6E6E4]">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#111111] hover:text-[#71717A]"
                  >
                    <span>STUDIO ESSAY</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn variant="scale-up" delay={0.35}>
              <div className="relative w-full aspect-4/3 overflow-hidden rounded-[2px] border border-[#E6E6E4] bg-neutral-100">
                <Image
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80"
                  alt="AI neural network visualization"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 350px"
                />
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  );
}
