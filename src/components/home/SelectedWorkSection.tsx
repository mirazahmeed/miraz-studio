import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  year: string;
  client: string;
  type: string;
  category: string;
  heroImage: string;
  technologies: string;
}

interface SelectedWorkSectionProps {
  projects: ProjectItem[];
}

export function SelectedWorkSection({ projects }: SelectedWorkSectionProps) {
  return (
    <section className="py-24 sm:py-32 border-b border-[#E6E6E4] bg-white">
      <div className="studio-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-16 border-b border-[#E6E6E4] gap-6">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#71717A] block mb-3">
              04 / SELECTED WORK
            </span>
            <h2 className="text-[28px] sm:text-[38px] font-normal tracking-[-0.03em] text-[#111111] uppercase">
              INDEX OF PRODUCTION WORK
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-[#111111] hover:text-[#71717A] transition-colors"
          >
            <span>VIEW ALL PROJECTS ({projects.length})</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Asymmetric Editorial Project Showcase */}
        <div className="space-y-24">
          {projects.slice(0, 4).map((project, idx) => {
            let techList: string[] = [];
            try {
              techList = JSON.parse(project.technologies);
            } catch {
              techList = [];
            }

            const isEven = idx % 2 === 0;

            return (
              <div
                key={project.id}
                className="group border-b border-[#E6E6E4] pb-16 last:border-b-0"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Image Column */}
                  <div
                    className={`lg:col-span-7 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <Link
                      href={`/work/${project.slug}`}
                      className="block relative w-full aspect-16/10 overflow-hidden rounded-[2px] border border-[#E6E6E4] bg-neutral-100"
                    >
                      <Image
                        src={project.heroImage}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 800px"
                      />
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </div>

                  {/* Metadata & Narrative Column */}
                  <div
                    className={`lg:col-span-5 space-y-6 ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="flex items-baseline justify-between border-b border-[#E6E6E4] pb-4">
                      <span className="text-[12px] font-mono text-[#8E8E93]">
                        0{idx + 1}
                      </span>
                      <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                        {project.category} • {project.year}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-[26px] sm:text-[32px] font-normal tracking-[-0.03em] uppercase text-[#111111] group-hover:text-neutral-700 transition-colors">
                        <Link href={`/work/${project.slug}`}>{project.title}</Link>
                      </h3>
                      <span className="block text-[12px] uppercase tracking-[0.12em] text-[#71717A] mt-1 font-mono">
                        CLIENT: {project.client}
                      </span>
                    </div>

                    <p className="text-[14px] text-[#555555] font-light leading-relaxed">
                      {project.excerpt}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {techList.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider bg-[#FAFAF9] text-[#444444] border border-[#E6E6E4]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4">
                      <Link
                        href={`/work/${project.slug}`}
                        className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-[#111111] hover:text-[#71717A] transition-colors border-b border-[#111111] pb-1"
                      >
                        <span>EXPLORE CASE STUDY</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
