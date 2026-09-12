import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getServices, getSiteSettings } from "@/lib/queries";
import { ArrowUpRight } from "lucide-react";

export const revalidate = 60;

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([
    getServices(),
    getSiteSettings(),
  ]);

  const processSteps = [
    {
      number: "01",
      title: "DISCOVER & ALIGN",
      description:
        "Deep exploration into your business model, target audience, competitive landscape, and technical constraints. We extract core objectives and isolate key performance indicators.",
    },
    {
      number: "02",
      title: "DEFINE & ARCHITECT",
      description:
        "Translating abstract goals into a concrete product roadmap. We formalize technical architecture, database schemas, API contracts, and user flows.",
    },
    {
      number: "03",
      title: "DESIGN & PROTOTYPE",
      description:
        "Crafting high-density typographic systems, layout grids, and interactive prototypes. We eliminate visual clutter and test ergonomic patterns before code.",
    },
    {
      number: "04",
      title: "BUILD & ENGINEER",
      description:
        "Writing production-grade TypeScript, Next.js components, and secure database queries. Every feature undergoes rigorous performance benchmarking.",
    },
    {
      number: "05",
      title: "REFINE & AUDIT",
      description:
        "Exhaustive QA across viewports, screen readers, and network throttling. We optimize Core Web Vitals to achieve 95+ Lighthouse metrics.",
    },
    {
      number: "06",
      title: "LAUNCH & EVOLVE",
      description:
        "Seamless deployment to Vercel and production infrastructure. We establish monitoring pipelines and provide direct post-launch support.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col">
      <Header studioName={settings["studio_name"] || "MIRAZ STUDIO™"} />

      <main className="flex-1 pt-32 pb-24">
        <div className="studio-container">
          {/* Header */}
          <div className="pb-10 mb-16 border-b border-[#E6E6E4]">
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#71717A] block mb-3">
              DISCIPLINES & PROCESS
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h1 className="text-[36px] sm:text-[54px] lg:text-[64px] font-normal leading-[1.08] tracking-[-0.03em] uppercase text-[#111111] max-w-3xl">
                CAPABILITIES & PRODUCTION STANDARDS
              </h1>
              <p className="text-[14px] text-[#555555] font-light max-w-md">
                End-to-end digital engineering for teams that value uncompromising taste and rigorous technical discipline.
              </p>
            </div>
          </div>

          {/* Services Detailed List */}
          <div className="divide-y divide-[#E6E6E4] border-y border-[#E6E6E4] mb-28">
            {services.map((s) => {
              let techList: string[] = [];
              try {
                techList = JSON.parse(s.technologies);
              } catch {
                techList = [];
              }

              return (
                <div
                  key={s.id}
                  className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                >
                  <div className="lg:col-span-5 flex items-baseline gap-6">
                    <span className="text-[13px] font-mono text-[#8E8E93]">
                      {s.number}
                    </span>
                    <h2 className="text-[24px] sm:text-[30px] font-normal tracking-tight uppercase text-[#111111]">
                      {s.title}
                    </h2>
                  </div>

                  <div className="lg:col-span-4 space-y-4">
                    <p className="text-[15px] text-[#555555] font-light leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  <div className="lg:col-span-3 flex flex-wrap gap-1.5 lg:justify-end">
                    {techList.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider bg-[#FAFAF9] text-[#444444] border border-[#E6E6E4]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 6-Step Process Section */}
          <div className="py-20 border-t border-[#E6E6E4]">
            <div className="pb-8 mb-16 border-b border-[#E6E6E4] flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#71717A] block mb-3">
                  METHODOLOGY
                </span>
                <h2 className="text-[28px] sm:text-[38px] font-normal tracking-[-0.03em] uppercase text-[#111111]">
                  THE 6-PHASE ENGINEERING CYCLE
                </h2>
              </div>
              <p className="text-[14px] text-[#555555] max-w-md font-light">
                A disciplined development lifecycle engineered to move fast without accumulating technical debt.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {processSteps.map((step) => (
                <div
                  key={step.number}
                  className="p-8 bg-[#FAFAF9] border border-[#E6E6E4] space-y-4"
                >
                  <span className="text-[12px] font-mono text-[#8E8E93]">
                    {step.number}
                  </span>
                  <h3 className="text-[18px] font-medium uppercase tracking-tight text-[#111111]">
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-[#555555] font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action */}
          <div className="mt-20 pt-16 border-t border-[#E6E6E4] text-center max-w-2xl mx-auto space-y-6">
            <h3 className="text-[24px] sm:text-[30px] font-normal uppercase tracking-tight text-[#111111]">
              READY TO COMMENCE YOUR BUILD?
            </h3>
            <p className="text-[14px] text-[#71717A] font-light">
              We partner with a limited roster of clients per quarter to ensure undivided technical focus.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="px-6 py-3.5 bg-[#111111] text-white text-[11px] font-medium uppercase tracking-[0.14em] rounded-full hover:bg-neutral-800 transition-colors inline-flex items-center gap-2"
              >
                <span>INITIATE PROJECT INQUIRY</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
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
