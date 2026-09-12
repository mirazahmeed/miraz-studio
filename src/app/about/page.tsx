import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getSiteSettings } from "@/lib/queries";
import { ArrowUpRight } from "lucide-react";

export const revalidate = 60;

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col">
      <Header studioName={settings["studio_name"] || "MIRAZ STUDIO™"} />

      <main className="flex-1 pt-32 pb-24">
        <div className="studio-container">
          {/* Header */}
          <div className="pb-10 mb-14 border-b border-[#E6E6E4]">
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#71717A] block mb-3">
              ABOUT THE STUDIO • MONOGRAPH
            </span>
            <h1 className="text-[36px] sm:text-[54px] lg:text-[64px] font-normal leading-[1.08] tracking-[-0.03em] uppercase text-[#111111] max-w-4xl">
              BRIDGING ARCHITECTURAL INTENTION AND FULL-STACK PRECISION.
            </h1>
          </div>

          {/* Large Studio Image */}
          <div className="relative w-full aspect-16/8 overflow-hidden rounded-[2px] border border-[#E6E6E4] bg-neutral-100 mb-20">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85"
              alt="Studio environment"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1536px) 100vw, 1500px"
            />
          </div>

          {/* Bio & Philosophy 12-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-[#E6E6E4]">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#71717A]">
                [ FOUNDER & CREATIVE ENGINEER ]
              </span>
              <h2 className="text-[28px] sm:text-[34px] font-normal uppercase tracking-tight text-[#111111]">
                MIRAZ AHMED
              </h2>
              <p className="text-[14px] sm:text-[15px] text-[#555555] font-light leading-relaxed">
                I am a senior creative developer, software engineer, and UI/UX designer. Over the past 5+ years, I have engineered mission-critical web applications, enterprise design systems, and bespoke digital platforms for founders and technology organizations worldwide.
              </p>
              <div className="pt-4 flex flex-wrap gap-4 text-[12px] font-medium uppercase tracking-[0.12em]">
                <a
                  href="https://github.com/mirazahmed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#111111] hover:text-[#71717A] border-b border-[#111111] pb-0.5"
                >
                  <span>GITHUB</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://linkedin.com/in/mirazahmed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#111111] hover:text-[#71717A] border-b border-[#111111] pb-0.5"
                >
                  <span>LINKEDIN</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://x.com/mirazahmed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#111111] hover:text-[#71717A] border-b border-[#111111] pb-0.5"
                >
                  <span>X (TWITTER)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8 text-[15px] sm:text-[16px] text-[#444444] font-light leading-relaxed">
              <p>
                Most digital agencies separate design from engineering. Designers create beautiful mockups in Figma that developers compromise when translating into code. Engineers build fast software that feels clinical and uninspired.
              </p>
              <p>
                Miraz Studio exists to unify these disciplines into a singular vision. When design and engineering are conceived simultaneously by the same hands, there is zero translation loss. The result is software that is visually authoritative and technically flawless.
              </p>
              <p>
                We do not build generic templates or throwaway MVPs. We build production systems engineered to scale gracefully as your business expands.
              </p>
            </div>
          </div>

          {/* Capabilities Grid */}
          <div className="py-20 border-b border-[#E6E6E4]">
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#71717A] block mb-12">
              TECHNICAL CAPABILITIES & TOOLCHAIN
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="space-y-4">
                <h3 className="text-[16px] font-medium uppercase tracking-tight text-[#111111] border-b border-[#E6E6E4] pb-2">
                  FRONTEND & INTERACTION
                </h3>
                <ul className="space-y-2 text-[13px] font-mono text-[#555555]">
                  <li>• Next.js 15+ (App Router)</li>
                  <li>• TypeScript (Strict)</li>
                  <li>• React 19 Server Components</li>
                  <li>• Tailwind CSS & CSS Variables</li>
                  <li>• Framer Motion & WebGL</li>
                  <li>• Radix UI & Headless Primitives</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-[16px] font-medium uppercase tracking-tight text-[#111111] border-b border-[#E6E6E4] pb-2">
                  BACKEND & INFRASTRUCTURE
                </h3>
                <ul className="space-y-2 text-[13px] font-mono text-[#555555]">
                  <li>• Node.js & Edge Runtimes</li>
                  <li>• PostgreSQL & Supabase</li>
                  <li>• Prisma ORM & SQL Migrations</li>
                  <li>• Row Level Security (RLS)</li>
                  <li>• Redis Caching & Queue Engines</li>
                  <li>• Vercel & AWS Deployment</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-[16px] font-medium uppercase tracking-tight text-[#111111] border-b border-[#E6E6E4] pb-2">
                  AI & AUTOMATION
                </h3>
                <ul className="space-y-2 text-[13px] font-mono text-[#555555]">
                  <li>• OpenAI & Claude API Pipelines</li>
                  <li>• n8n Workflow Automation</li>
                  <li>• Vector Embeddings & Search</li>
                  <li>• Webhook Architecture</li>
                  <li>• Python Data Scripting</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Availability & Action */}
          <div className="pt-20 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#71717A] block mb-1">
                CURRENT AVAILABILITY
              </span>
              <span className="text-[18px] font-normal uppercase text-[#111111]">
                {settings["contact_availability"] || "ACCEPTING SELECT PROJECTS FOR Q2/Q3 2026"}
              </span>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#111111] text-white text-[11px] font-medium uppercase tracking-[0.14em] rounded-full hover:bg-neutral-800 transition-colors inline-flex items-center gap-2"
            >
              <span>DISCUSS YOUR PROJECT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
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
