import Image from "next/image";

interface HeroSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
}

export function HeroSection({
  eyebrow = "INDEPENDENT DIGITAL PRODUCT & CREATIVE ENGINEERING STUDIO",
  description = "Operating at the intersection of architectural discipline and technical precision.",
}: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-16 border-b border-[#E6E6E4]">
      <div className="studio-container">
        {/* Top Boundary with Corner Pluses */}
        <div className="flex justify-between items-center pb-8 border-b border-[#E6E6E4]/70">
          <span className="text-[13px] font-light text-[#71717A] select-none">+</span>
          <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#71717A]">
            {eyebrow}
          </span>
          <span className="text-[13px] font-light text-[#71717A] select-none">+</span>
        </div>

        {/* Massive Editorial Typographic Composition */}
        <div className="py-14 sm:py-20 lg:py-24 max-w-6xl mx-auto text-center lg:text-left">
          <h1 className="text-[32px] sm:text-[48px] md:text-[58px] lg:text-[68px] leading-[1.08] tracking-[-0.035em] font-normal text-[#111111] uppercase select-text">
            <span>AT MIRAZ STUDIO, WE BRING </span>
            <span className="font-semibold text-[#111111]">PASSION AND PURPOSE </span>
            <span className="text-[#8E8E93]">TO EVERYTHING </span>
            <span>WE BUILD — FROM </span>
            <span className="text-[#8E8E93]">SCALABLE WEB APPS </span>
            <span className="inline-block align-middle mx-2 my-1 relative w-14 h-7 sm:w-20 sm:h-9 rounded-[2px] overflow-hidden border border-neutral-300 shadow-xs">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80"
                alt="Architectural space badge"
                fill
                className="object-cover"
                sizes="80px"
              />
            </span>
            <span>THAT MAKE ROOM FOR </span>
            <span className="text-[#111111] font-medium">BOLD IDEAS </span>
            <span>TO EDITORIAL </span>
            <span className="inline-block align-middle mx-2 my-1 relative w-14 h-7 sm:w-20 sm:h-9 rounded-[2px] overflow-hidden border border-neutral-300 shadow-xs">
              <Image
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=300&q=80"
                alt="Design craft badge"
                fill
                className="object-cover"
                sizes="80px"
              />
            </span>
            <span className="text-[#8E8E93]">PLATFORMS AND BESPOKE </span>
            <span className="text-[#111111] font-semibold">SYSTEMS </span>
            <span className="inline-block align-middle mx-2 my-1 relative w-14 h-7 sm:w-20 sm:h-9 rounded-[2px] overflow-hidden border border-neutral-300 shadow-xs">
              <Image
                src="https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=300&q=80"
                alt="System execution badge"
                fill
                className="object-cover"
                sizes="80px"
              />
            </span>
            <span>THAT HELP AMBITIOUS TEAMS </span>
            <span className="text-[#111111] font-semibold">GROW.</span>
          </h1>

          <p className="mt-8 text-[15px] sm:text-[17px] text-[#71717A] max-w-2xl font-light leading-relaxed">
            {description}
          </p>
        </div>

        {/* Bottom Boundary with Downward Indicator Marks */}
        <div className="flex justify-between items-center pt-8 border-t border-[#E6E6E4]/70">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[#71717A]">
            <span>↓</span>
            <span>DISCOVER STUDIO WORK</span>
          </div>
          <span className="text-[11px] uppercase tracking-[0.14em] text-[#8E8E93]">
            ARCHITECTURAL DISCIPLINE • DIGITAL PRECISION
          </span>
          <span className="text-[11px] text-[#71717A]">↓</span>
        </div>
      </div>
    </section>
  );
}
