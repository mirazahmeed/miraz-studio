import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  getProjectBySlug,
  getAdjacentProjects,
  getSiteSettings,
} from "@/lib/queries";
import { ArrowUpRight, ArrowLeft, CheckCircle2 } from "lucide-react";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — MIRAZ STUDIO™`,
    description: project.excerpt,
    openGraph: {
      title: `${project.title} — MIRAZ STUDIO™`,
      description: project.excerpt,
      images: [{ url: project.heroImage }],
    },
  };
}

export const revalidate = 60;

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, settings, { next, prev }] = await Promise.all([
    getProjectBySlug(slug),
    getSiteSettings(),
    getAdjacentProjects(slug),
  ]);

  if (!project) {
    notFound();
  }

  let techList: string[] = [];
  try {
    techList = JSON.parse(project.technologies);
  } catch {
    techList = [];
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
    <div className="min-h-screen bg-white text-[#111111] flex flex-col">
      <Header studioName={settings["studio_name"] || "MIRAZ STUDIO™"} />

      <main className="flex-1 pt-32 pb-24">
        <div className="studio-container">
          {/* Top Breadcrumb & Navigation */}
          <div className="flex items-center justify-between pb-6 mb-12 border-b border-[#E6E6E4]">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A] hover:text-[#111111] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK TO WORK INDEX</span>
            </Link>

            <span className="text-[11px] font-mono uppercase tracking-widest text-[#8E8E93]">
              {project.category} • {project.year}
            </span>
          </div>

          {/* Project Title & Statement */}
          <div className="py-8 max-w-5xl mb-12">
            <h1 className="text-[36px] sm:text-[56px] lg:text-[68px] font-normal leading-[1.05] tracking-[-0.035em] uppercase text-[#111111] mb-6">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="text-[18px] sm:text-[22px] font-light text-[#555555] max-w-3xl leading-relaxed">
                {project.subtitle}
              </p>
            )}
          </div>

          {/* Large Architectural Hero Image */}
          <div className="relative w-full aspect-16/9 md:aspect-21/9 overflow-hidden rounded-[2px] border border-[#E6E6E4] bg-neutral-100 mb-16">
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1536px) 100vw, 1500px"
            />
          </div>

          {/* Metadata Specifications Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-[#E6E6E4] mb-20">
            <div>
              <span className="block text-[10px] uppercase tracking-[0.14em] text-[#71717A] mb-1.5">
                CLIENT
              </span>
              <span className="text-[14px] font-medium text-[#111111]">
                {project.client}
              </span>
            </div>

            <div>
              <span className="block text-[10px] uppercase tracking-[0.14em] text-[#71717A] mb-1.5">
                ROLE
              </span>
              <span className="text-[14px] font-medium text-[#111111]">
                {project.role}
              </span>
            </div>

            <div>
              <span className="block text-[10px] uppercase tracking-[0.14em] text-[#71717A] mb-1.5">
                TIMELINE
              </span>
              <span className="text-[14px] font-medium text-[#111111]">
                {project.duration || "ONGOING"}
              </span>
            </div>

            <div>
              <span className="block text-[10px] uppercase tracking-[0.14em] text-[#71717A] mb-1.5">
                STATUS
              </span>
              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium uppercase text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                {project.status}
              </span>
            </div>
          </div>

          {/* VERIFY THE WORK Section */}
          <div className="p-8 sm:p-10 bg-[#FAFAF9] border border-[#E6E6E4] mb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E6E6E4]">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#71717A] block mb-1">
                  CREDIBILITY & SOURCE VERIFICATION
                </span>
                <h3 className="text-[20px] font-normal tracking-tight uppercase text-[#111111]">
                  VERIFY THE WORK
                </h3>
              </div>
              <p className="text-[13px] text-[#71717A] max-w-md font-light">
                We believe in undeniable proof. Explore the live production deployment, inspect the repository source code, or review the design specs.
              </p>
            </div>

            <div className="pt-6 flex flex-wrap gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#111111] hover:bg-[#222222] text-white text-[11px] font-medium uppercase tracking-[0.14em] rounded-full transition-colors flex items-center gap-2"
                >
                  <span>LIVE WEBSITE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-white border border-[#E6E6E4] hover:bg-neutral-100 text-[#111111] text-[11px] font-medium uppercase tracking-[0.14em] rounded-full transition-colors flex items-center gap-2"
                >
                  <span>SOURCE CODE (GITHUB)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}

              {project.figmaUrl && (
                <a
                  href={project.figmaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-white border border-[#E6E6E4] hover:bg-neutral-100 text-[#111111] text-[11px] font-medium uppercase tracking-[0.14em] rounded-full transition-colors flex items-center gap-2"
                >
                  <span>DESIGN TOKENS (FIGMA)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}

              {project.caseStudyUrl && project.caseStudyUrl !== `/work/${project.slug}` && (
                <a
                  href={project.caseStudyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-white border border-[#E6E6E4] hover:bg-neutral-100 text-[#111111] text-[11px] font-medium uppercase tracking-[0.14em] rounded-full transition-colors flex items-center gap-2"
                >
                  <span>EXTERNAL WHITE-PAPER</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Deep Narrative: Problem, Approach, Solution */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24">
            {/* Left Column: Tech Stack & Specs (Span 4) */}
            <div className="lg:col-span-4 space-y-10">
              <div className="space-y-4">
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A] block">
                  TECHNOLOGY STACK
                </span>
                <div className="flex flex-wrap gap-2">
                  {techList.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-[11px] uppercase font-mono tracking-wider bg-[#FAFAF9] text-[#333333] border border-[#E6E6E4]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {Object.keys(specs).length > 0 && (
                <div className="space-y-4 pt-6 border-t border-[#E6E6E4]">
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A] block">
                    ARCHITECTURAL METRICS
                  </span>
                  <div className="space-y-3 text-[13px]">
                    {Object.entries(specs).map(([k, v]) => (
                      <div key={k} className="flex justify-between pb-2 border-b border-[#E6E6E4]/60">
                        <span className="text-[#71717A] uppercase text-[10px] tracking-wider">
                          {k}
                        </span>
                        <span className="font-medium text-[#111111]">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Narrative Sections (Span 8) */}
            <div className="lg:col-span-8 space-y-16">
              {project.challenge && (
                <div className="space-y-4">
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A] block">
                    01 / THE PROBLEM
                  </span>
                  <h2 className="text-[24px] sm:text-[30px] font-normal tracking-tight uppercase text-[#111111]">
                    CHALLENGING THE STATUS QUO
                  </h2>
                  <p className="text-[15px] sm:text-[16px] text-[#444444] font-light leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
              )}

              {project.approach && (
                <div className="space-y-4 pt-8 border-t border-[#E6E6E4]">
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A] block">
                    02 / THE STRATEGY & APPROACH
                  </span>
                  <h2 className="text-[24px] sm:text-[30px] font-normal tracking-tight uppercase text-[#111111]">
                    REDUCING NOISE, AMPLIFYING PURPOSE
                  </h2>
                  <p className="text-[15px] sm:text-[16px] text-[#444444] font-light leading-relaxed">
                    {project.approach}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="space-y-4 pt-8 border-t border-[#E6E6E4]">
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A] block">
                    03 / THE TECHNICAL EXECUTION
                  </span>
                  <h2 className="text-[24px] sm:text-[30px] font-normal tracking-tight uppercase text-[#111111]">
                    ENGINEERED FOR PRODUCTION SPEED
                  </h2>
                  <p className="text-[15px] sm:text-[16px] text-[#444444] font-light leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}

              {project.results && (
                <div className="space-y-4 pt-8 border-t border-[#E6E6E4]">
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A] block">
                    04 / MEASURABLE OUTCOMES
                  </span>
                  <h2 className="text-[24px] sm:text-[30px] font-normal tracking-tight uppercase text-[#111111]">
                    REAL DATA & PRODUCTION METRICS
                  </h2>
                  <p className="text-[15px] sm:text-[16px] text-[#444444] font-light leading-relaxed">
                    {project.results}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Project Gallery */}
          {project.gallery.length > 0 && (
            <div className="py-16 border-t border-[#E6E6E4] mb-20 space-y-12">
              <div className="flex justify-between items-center pb-4 border-b border-[#E6E6E4]">
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                  GALLERY ARTIFACTS ({project.gallery.length})
                </span>
                <span className="text-[11px] font-mono text-[#8E8E93]">
                  HIGH RESOLUTION PLATES
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.gallery.map((img) => (
                  <div key={img.id} className="space-y-3">
                    <div className="relative w-full aspect-16/10 overflow-hidden rounded-[2px] border border-[#E6E6E4] bg-neutral-100">
                      <Image
                        src={img.imageUrl}
                        alt={img.alt || project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 700px"
                      />
                    </div>
                    {img.caption && (
                      <p className="text-[12px] text-[#71717A] font-mono">
                        {img.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next / Previous Project Navigation */}
          <div className="pt-16 border-t border-[#E6E6E4] grid grid-cols-1 sm:grid-cols-2 gap-8">
            {prev && (
              <Link
                href={`/work/${prev.slug}`}
                className="group p-6 bg-[#FAFAF9] border border-[#E6E6E4] hover:bg-neutral-100 transition-colors block"
              >
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#71717A] block mb-2">
                  ← PREVIOUS CASE STUDY
                </span>
                <h4 className="text-[20px] font-normal uppercase tracking-tight text-[#111111] group-hover:text-neutral-700">
                  {prev.title}
                </h4>
              </Link>
            )}

            {next && (
              <Link
                href={`/work/${next.slug}`}
                className="group p-6 bg-[#FAFAF9] border border-[#E6E6E4] hover:bg-neutral-100 transition-colors block text-right"
              >
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#71717A] block mb-2">
                  NEXT CASE STUDY →
                </span>
                <h4 className="text-[20px] font-normal uppercase tracking-tight text-[#111111] group-hover:text-neutral-700">
                  {next.title}
                </h4>
              </Link>
            )}
          </div>
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
