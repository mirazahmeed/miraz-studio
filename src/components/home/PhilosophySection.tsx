import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function PhilosophySection() {
  return (
    <section className="py-24 sm:py-32 border-b border-[#E6E6E4] bg-white">
      <div className="studio-container">
        {/* Top Header */}
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

        {/* Staggered Asymmetrical Photographic Composition */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column (Span 4): Text & Smaller Supporting Image */}
          <div className="md:col-span-4 space-y-8">
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

            <div className="relative w-full aspect-square overflow-hidden rounded-[2px] border border-[#E6E6E4] bg-neutral-100">
              <Image
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
                alt="Minimalist design craft"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          </div>

          {/* Center Column (Span 5): Large Architectural Crop */}
          <div className="md:col-span-5">
            <div className="relative w-full aspect-3/4 overflow-hidden rounded-[2px] border border-[#E6E6E4] bg-neutral-100">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85"
                alt="Architectural structure"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
          </div>

          {/* Right Column (Span 3): Minimal Detail Box */}
          <div className="md:col-span-3 space-y-6 pt-4 md:pt-12">
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

            <div className="relative w-full aspect-4/3 overflow-hidden rounded-[2px] border border-[#E6E6E4] bg-neutral-100">
              <Image
                src="https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=600&q=80"
                alt="Technical execution detail"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 350px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
