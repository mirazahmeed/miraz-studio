"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";

export function FinalCTA() {
  return (
    <section className="py-28 sm:py-36 bg-white">
      <div className="studio-container">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <AnimateIn variant="fade-up" delay={0}>
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#71717A] block">
              INITIATE COLLABORATION
            </span>
          </AnimateIn>

          <AnimateIn variant="blur-in" delay={0.1} duration={0.8}>
            <h2 className="text-[36px] sm:text-[54px] md:text-[64px] font-normal leading-[1.08] tracking-[-0.035em] text-[#111111] uppercase">
              FIND SPACE TO PUSH IDEAS FORWARD WITH US.
            </h2>
          </AnimateIn>

          <AnimateIn variant="fade-up" delay={0.3}>
            <p className="text-[16px] sm:text-[18px] text-[#71717A] font-light max-w-xl mx-auto leading-relaxed">
              Have an upcoming web product, architectural interface, or engineering challenge? Let&apos;s build something that stands the test of time.
            </p>
          </AnimateIn>

          <AnimateIn variant="fade-up" delay={0.45}>
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 bg-[#111111] hover:bg-[#222222] text-white text-[12px] font-medium uppercase tracking-[0.16em] transition-all rounded-full flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>START A PROJECT</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link
                href="/work"
                className="w-full sm:w-auto px-8 py-4 border border-[#E6E6E4] hover:bg-neutral-50 text-[#111111] text-[12px] font-medium uppercase tracking-[0.16em] transition-all rounded-full flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.98]"
              >
                <span>EXPLORE ALL WORK</span>
              </Link>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
