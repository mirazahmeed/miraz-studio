import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface IntroSectionProps {
  label?: string;
  statement?: string;
  bio?: string;
  email?: string;
  location?: string;
}

export function IntroSection({
  label = "01 / INTRODUCTION",
  statement = "WE DON'T JUST BUILD WEBSITES. WE ENGINEER DIGITAL PRODUCTS PEOPLE REMEMBER.",
  bio = "Miraz Studio is an independent creative engineering practice. We specialize in bespoke digital products, high-performance web applications, and architectural design systems. By bridging rigorous aesthetics with full-stack engineering, we build products that solve real business problems without sacrificing an ounce of visual sophistication.",
  email = "mirazahmed0619@gmail.com",
  location = "DHAKA / AVAILABLE GLOBALLY",
}: IntroSectionProps) {
  return (
    <section className="py-24 sm:py-32 border-b border-[#E6E6E4] bg-white">
      <div className="studio-container">
        {/* Section Label */}
        <div className="pb-8 mb-12 border-b border-[#E6E6E4]">
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#71717A]">
            {label}
          </span>
        </div>

        {/* 12-Column Asymmetric Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column (Span 7): Large Editorial Headline */}
          <div className="lg:col-span-7">
            <h2 className="text-[28px] sm:text-[38px] md:text-[46px] font-normal leading-[1.12] tracking-[-0.03em] text-[#111111] uppercase">
              {statement}
            </h2>
          </div>

          {/* Right Column (Span 5): Concise Narrative & Coordinates */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <p className="text-[15px] sm:text-[16px] text-[#555555] font-light leading-relaxed">
              {bio}
            </p>

            <div className="pt-6 border-t border-[#E6E6E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[12px]">
              <div>
                <span className="block text-[10px] uppercase tracking-[0.14em] text-[#8E8E93] mb-1">
                  LOCATION
                </span>
                <span className="text-[#111111] font-medium">{location}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-[0.14em] text-[#8E8E93] mb-1">
                  DIRECT LINE
                </span>
                <Link
                  href={`mailto:${email}`}
                  className="text-[#111111] font-medium underline underline-offset-4 hover:text-[#71717A] flex items-center gap-1"
                >
                  <span>{email}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
