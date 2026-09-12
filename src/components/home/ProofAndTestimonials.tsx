interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatarUrl?: string | null;
}

interface ProofAndTestimonialsProps {
  testimonials: TestimonialItem[];
}

export function ProofAndTestimonials({ testimonials }: ProofAndTestimonialsProps) {
  return (
    <section className="py-24 sm:py-32 border-b border-[#E6E6E4] bg-[#FAFAF9]">
      <div className="studio-container">
        {/* Section Header */}
        <div className="pb-8 mb-16 border-b border-[#E6E6E4]">
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#71717A] block mb-3">
            06 / PROOF & REPUTATION
          </span>
          <h2 className="text-[28px] sm:text-[38px] font-normal tracking-[-0.03em] text-[#111111] uppercase">
            THE WORK SPEAKS FOR ITSELF
          </h2>
        </div>

        {/* 4 Quantitative Proof Criteria */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pb-20 border-b border-[#E6E6E4]">
          <div className="space-y-2">
            <span className="text-[32px] sm:text-[40px] font-normal tracking-tight text-[#111111] block">
              99+
            </span>
            <span className="text-[11px] uppercase font-mono tracking-widest text-[#71717A] block">
              LIGHTHOUSE SCORE
            </span>
            <p className="text-[12px] text-[#8E8E93] leading-normal">
              Zero layout shifts, sub-second TTFB, and optimized server-rendered payloads.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[32px] sm:text-[40px] font-normal tracking-tight text-[#111111] block">
              100%
            </span>
            <span className="text-[11px] uppercase font-mono tracking-widest text-[#71717A] block">
              TYPESCRIPT STRICT
            </span>
            <p className="text-[12px] text-[#8E8E93] leading-normal">
              Type-safe end-to-end schemas from database queries to client components.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[32px] sm:text-[40px] font-normal tracking-tight text-[#111111] block">
              60 FPS
            </span>
            <span className="text-[11px] uppercase font-mono tracking-widest text-[#71717A] block">
              ANIMATION FLUIDITY
            </span>
            <p className="text-[12px] text-[#8E8E93] leading-normal">
              Hardware-accelerated transforms and GPU-optimized micro-interactions.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[32px] sm:text-[40px] font-normal tracking-tight text-[#111111] block">
              WCAG AA
            </span>
            <span className="text-[11px] uppercase font-mono tracking-widest text-[#71717A] block">
              ACCESSIBILITY LEVEL
            </span>
            <p className="text-[12px] text-[#8E8E93] leading-normal">
              High-contrast typography, semantic ARIA roles, and complete keyboard navigation.
            </p>
          </div>
        </div>

        {/* Editorial Testimonials Grid */}
        <div className="pt-16">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#8E8E93] block mb-10">
            [ PEER & CLIENT ENDORSEMENTS ]
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map((t) => (
              <div key={t.id} className="space-y-6 flex flex-col justify-between">
                <blockquote className="text-[15px] text-[#333333] font-light leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="pt-4 border-t border-[#E6E6E4]">
                  <span className="block text-[12px] font-medium uppercase tracking-[0.1em] text-[#111111]">
                    {t.name}
                  </span>
                  <span className="block text-[11px] text-[#71717A] font-mono tracking-wider mt-0.5">
                    {t.role} • {t.company}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
