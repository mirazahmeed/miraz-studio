import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectData {
  id: string;
  title: string;
  slug: string;
  subtitle?: string | null;
  excerpt: string;
  description: string;
  year: string;
  client: string;
  type: string;
  role: string;
  duration?: string | null;
  heroImage: string;
  technologies: string;
  specifications?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
}

interface FeaturedProjectProps {
  project: ProjectData;
  indexText?: string;
}

export function FeaturedProjectSection({
  project,
  indexText = "FEATURED PROJECT • 01 / 06",
}: FeaturedProjectProps) {
  let techList: string[] = [];
  try {
    techList = JSON.parse(project.technologies);
  } catch {
    techList = ["NEXT.JS", "TYPESCRIPT", "POSTGRESQL"];
  }

  let specs: Record<string, string> = {};
  if (project.specifications) {
    try {
      specs = JSON.parse(project.specifications);
    } catch {
      specs = {};
    }
  }

  return (
    <section className="py-20 sm:py-28 border-b border-[#E6E6E4] bg-white">
      <div className="studio-container">
        {/* Top Metadata Header */}
        <div className="flex justify-between items-center pb-6 mb-10 border-b border-[#E6E6E4]">
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#71717A]">
            {indexText}
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#111111]">
            CASE STUDY Monograph
          </span>
        </div>

        {/* Large Immersive Hero Image with Architectural Treatment */}
        <div className="relative w-full aspect-16/9 md:aspect-21/9 overflow-hidden bg-neutral-100 rounded-[2px] border border-[#E6E6E4] group mb-14">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            sizes="(max-width: 1536px) 100vw, 1500px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />

          {/* Inline badge over image */}
          <div className="absolute bottom-6 left-6 sm:left-8 bg-white/90 backdrop-blur-md px-4 py-2 border border-[#E6E6E4] text-[11px] font-medium uppercase tracking-[0.14em] text-[#111111]">
            {project.type} • {project.year}
          </div>
        </div>

        {/* 2-Column Technical Specifications & Project Brief */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-4">
          {/* Left Column (Span 7): Detailed Project Specification Table */}
          <div className="lg:col-span-7">
            <h3 className="text-[26px] sm:text-[34px] font-normal tracking-[-0.03em] uppercase text-[#111111] mb-8">
              PROJECT: {project.title}
            </h3>

            {/* Specifications Matrix */}
            <div className="divide-y divide-[#E6E6E4] border-y border-[#E6E6E4] text-[13px]">
              <div className="py-3.5 grid grid-cols-3">
                <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                  CLIENT
                </span>
                <span className="col-span-2 text-[#111111] font-medium">{project.client}</span>
              </div>

              <div className="py-3.5 grid grid-cols-3">
                <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                  PROJECT TYPE
                </span>
                <span className="col-span-2 text-[#111111]">{project.type}</span>
              </div>

              <div className="py-3.5 grid grid-cols-3">
                <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                  ROLE
                </span>
                <span className="col-span-2 text-[#111111]">{project.role}</span>
              </div>

              <div className="py-3.5 grid grid-cols-3">
                <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                  YEAR
                </span>
                <span className="col-span-2 text-[#111111]">{project.year}</span>
              </div>

              {project.duration && (
                <div className="py-3.5 grid grid-cols-3">
                  <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                    DURATION
                  </span>
                  <span className="col-span-2 text-[#111111]">{project.duration}</span>
                </div>
              )}

              <div className="py-3.5 grid grid-cols-3">
                <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                  TECH STACK
                </span>
                <div className="col-span-2 flex flex-wrap gap-1.5">
                  {techList.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider bg-neutral-100 text-[#333333] border border-[#E6E6E4]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dynamic specs if available */}
              {Object.entries(specs).slice(0, 2).map(([key, val]) => (
                <div key={key} className="py-3.5 grid grid-cols-3">
                  <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                    {key}
                  </span>
                  <span className="col-span-2 text-[#111111] font-medium">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Span 5): Editorial Narrative & Action Callout */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                EXECUTIVE SUMMARY
              </span>
              <p className="text-[15px] sm:text-[16px] text-[#555555] font-light leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Impact / Metric Box matching reference */}
            <div className="p-6 sm:p-8 bg-[#FAFAF9] border border-[#E6E6E4] space-y-6">
              <div className="flex items-center justify-between border-b border-[#E6E6E4] pb-4">
                <span className="text-[10px] uppercase tracking-[0.14em] text-[#71717A]">
                  STATUS
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  SHIPPED TO PRODUCTION
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.14em] text-[#8E8E93]">
                    PERFORMANCE IMPACT
                  </span>
                  <span className="text-[28px] sm:text-[34px] font-normal tracking-tight text-[#111111]">
                    {specs.outcome || "+48% SPEED"}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/work/${project.slug}`}
                  className="flex-1 py-3 px-5 bg-[#111111] hover:bg-[#222222] text-white text-[11px] font-medium uppercase tracking-[0.14em] text-center transition-colors flex items-center justify-center gap-2"
                >
                  <span>VIEW CASE STUDY</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-5 border border-[#111111] text-[#111111] hover:bg-neutral-100 text-[11px] font-medium uppercase tracking-[0.14em] text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>LIVE DEMO</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
