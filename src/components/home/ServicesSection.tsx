import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  technologies: string;
  imageUrl?: string | null;
}

interface ServicesSectionProps {
  services: ServiceItem[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="py-24 sm:py-32 border-b border-[#E6E6E4] bg-white">
      <div className="studio-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-16 border-b border-[#E6E6E4] gap-6">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#71717A] block mb-3">
              05 / CAPABILITIES
            </span>
            <h2 className="text-[28px] sm:text-[38px] font-normal tracking-[-0.03em] text-[#111111] uppercase">
              SERVICES & ENGINEERING PRACTICE
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#111111] hover:text-[#71717A] transition-colors"
          >
            <span>FULL CAPABILITIES BREAKDOWN</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Editorial Rows */}
        <div className="divide-y divide-[#E6E6E4] border-y border-[#E6E6E4]">
          {services.map((srv) => {
            let techList: string[] = [];
            try {
              techList = JSON.parse(srv.technologies);
            } catch {
              techList = [];
            }

            return (
              <div
                key={srv.id}
                className="py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-baseline hover:bg-[#FAFAF9] transition-colors px-2 sm:px-4"
              >
                {/* Number & Service Name */}
                <div className="lg:col-span-5 flex items-baseline gap-6">
                  <span className="text-[13px] font-mono text-[#8E8E93]">
                    {srv.number}
                  </span>
                  <h3 className="text-[22px] sm:text-[26px] font-normal tracking-[-0.02em] text-[#111111] uppercase">
                    {srv.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="lg:col-span-4">
                  <p className="text-[14px] text-[#555555] font-light leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                {/* Technologies / Tags */}
                <div className="lg:col-span-3 flex flex-wrap gap-1.5 lg:justify-end">
                  {techList.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider bg-white text-[#444444] border border-[#E6E6E4]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
