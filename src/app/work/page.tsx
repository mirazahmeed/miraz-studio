import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getPublishedProjects, getSiteSettings } from "@/lib/queries";
import { ArrowUpRight } from "lucide-react";

interface WorkPageProps {
  searchParams: Promise<{ category?: string }>;
}

const CATEGORIES = [
  "ALL",
  "WEBSITES",
  "WEB APPS",
  "SAAS",
  "UI/UX",
  "AUTOMATION",
  "EXPERIMENTS",
];

export const revalidate = 60;

export default async function WorkIndexPage({ searchParams }: WorkPageProps) {
  const { category = "ALL" } = await searchParams;
  const currentCategory = category.toUpperCase();

  const [settings, projects] = await Promise.all([
    getSiteSettings(),
    getPublishedProjects(currentCategory === "ALL" ? undefined : currentCategory),
  ]);

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col">
      <Header studioName={settings["studio_name"] || "MIRAZ STUDIO™"} />

      <main className="flex-1 pt-32 pb-24">
        <div className="studio-container">
          {/* Header */}
          <div className="pb-10 mb-12 border-b border-[#E6E6E4]">
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#71717A] block mb-3">
              INDEX • ALL ARCHIVES
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h1 className="text-[36px] sm:text-[52px] font-normal tracking-[-0.03em] uppercase text-[#111111]">
                SELECTED WORK ({projects.length})
              </h1>
              <p className="text-[14px] text-[#555555] font-light max-w-md">
                Production web applications, digital products, and design systems engineered for longevity and verified in production.
              </p>
            </div>
          </div>

          {/* URL-Aware Category Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pb-8 mb-12 border-b border-[#E6E6E4] overflow-x-auto">
            {CATEGORIES.map((cat) => {
              const isActive =
                (currentCategory === "ALL" && cat === "ALL") ||
                currentCategory === cat;
              return (
                <Link
                  key={cat}
                  href={cat === "ALL" ? "/work" : `/work?category=${cat.toLowerCase()}`}
                  className={`px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] transition-all rounded-[2px] ${
                    isActive
                      ? "bg-[#111111] text-white"
                      : "bg-[#FAFAF9] text-[#71717A] hover:text-[#111111] hover:bg-neutral-200 border border-[#E6E6E4]"
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>

          {/* Projects List: Editorial Rows with Direct Photos */}
          {projects.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-[14px] text-[#71717A] uppercase tracking-widest font-mono">
                NO PROJECTS FOUND IN THIS CATEGORY.
              </p>
              <Link
                href="/work"
                className="inline-block mt-4 text-[12px] uppercase tracking-wider text-[#111111] underline"
              >
                VIEW ALL PROJECTS
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-[#E6E6E4] border-y border-[#E6E6E4]">
              {projects.map((project, idx) => {
                let techList: string[] = [];
                try {
                  techList = JSON.parse(project.technologies);
                } catch {
                  techList = [];
                }

                return (
                  <div
                    key={project.id}
                    className="py-10 sm:py-14 group hover:bg-[#FAFAF9] transition-colors duration-200 px-2 sm:px-6"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Left Meta & Title (Span 5) */}
                      <div className="lg:col-span-5 space-y-3">
                        <div className="flex items-center gap-4 text-[12px] font-mono text-[#8E8E93]">
                          <span>0{idx + 1}</span>
                          <span className="text-[10px] uppercase tracking-[0.14em] text-[#71717A]">
                            {project.category} • {project.year}
                          </span>
                        </div>
                        <h2 className="text-[24px] sm:text-[30px] font-normal tracking-tight uppercase text-[#111111] group-hover:text-neutral-700 transition-colors">
                          <Link href={`/work/${project.slug}`}>{project.title}</Link>
                        </h2>
                        <span className="block text-[12px] text-[#71717A] font-mono uppercase">
                          CLIENT: {project.client}
                        </span>
                      </div>

                      {/* Excerpt & Tech (Span 4) */}
                      <div className="lg:col-span-4 space-y-4">
                        <p className="text-[13px] sm:text-[14px] text-[#555555] font-light leading-relaxed">
                          {project.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {techList.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 text-[9px] uppercase font-mono tracking-wider bg-white text-[#555555] border border-[#E6E6E4]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right Image Preview & Link (Span 3) */}
                      <div className="lg:col-span-3 flex items-center justify-between lg:justify-end gap-6">
                        <div className="relative w-28 h-20 sm:w-36 sm:h-24 rounded-[2px] overflow-hidden border border-[#E6E6E4] bg-neutral-100">
                          <Image
                            src={project.heroImage}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="160px"
                          />
                        </div>

                        <Link
                          href={`/work/${project.slug}`}
                          className="w-10 h-10 rounded-full border border-[#E6E6E4] flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-white transition-colors"
                          aria-label={`View ${project.title}`}
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer
        studioName={settings["studio_name"]}
        tagline={settings["studio_tagline"]}
        email={settings["contact_email"]}
        location={settings["contact_location"]}
      />
    </div>
  );
}
