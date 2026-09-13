"use client";

import React from "react";
import Link from "next/link";
import {
  Globe,
  Palette,
  ShoppingBag,
  Zap,
  Terminal,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { ProjectShowcase } from "@/components/services/ProjectShowcase";
import { WorkflowVisual } from "@/components/services/WorkflowVisual";
import { DashboardVisual } from "@/components/services/DashboardVisual";

interface ProjectItem {
  id?: string;
  slug: string;
  title: string;
  heroImage: string;
  liveUrl?: string | null;
  category?: string;
}

interface ServicesSectionProps {
  projects?: ProjectItem[];
}

export function ServicesSection({ projects = [] }: ServicesSectionProps) {
  // Find database projects by slug with fallbacks to public images
  const fexionProject = projects.find(
    (p) =>
      p.slug === "project-fission-fashion-e-commerce-web-app" ||
      p.slug === "fexion"
  );
  const roselyraProject = projects.find(
    (p) => p.slug === "roselyra-fashion" || p.slug === "roselyra"
  );
  const ethereaProject = projects.find((p) => p.slug === "etherea");

  const fexionSlug =
    fexionProject?.slug || "project-fission-fashion-e-commerce-web-app";
  const roselyraSlug = roselyraProject?.slug || "roselyra-fashion";
  const ethereaSlug = ethereaProject?.slug || "etherea";

  const fexionImg = fexionProject?.heroImage || "/projects/fission.png";
  const roselyraImg = roselyraProject?.heroImage || "/projects/roselyra.png";
  const ethereaImg = ethereaProject?.heroImage || "/projects/etherea.png";

  return (
    <section
      id="services"
      className="py-24 sm:py-32 border-b border-[#E6E6E4] bg-white relative overflow-hidden"
      aria-label="Our Services & Solutions"
    >
      <div className="studio-container">
        {/* Section Pill Badge */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#E6E6E4] bg-white shadow-xs text-[12px] font-medium text-[#111111] transition-transform hover:scale-[1.02]">
            <span
              className="w-4 h-4 rounded-full bg-[#111111] text-white flex items-center justify-center text-[10px] font-bold leading-none"
              aria-hidden="true"
            >
              ✦
            </span>
            <span className="tracking-tight">Our Services & Solutions</span>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between pb-12 sm:pb-16 mb-12 sm:mb-16 border-b border-[#E6E6E4] gap-8">
          <div className="max-w-3xl">
            <h2 className="text-[34px] sm:text-[46px] md:text-[54px] lg:text-[60px] font-normal leading-[1.08] tracking-[-0.03em] text-[#111111]">
              <span className="font-medium">From idea to execution,</span>{" "}
              <span className="text-[#71717A] font-light">
                we build digital products that move forward.
              </span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-[14px] sm:text-[15px] text-[#555555] font-light leading-relaxed mb-4">
              From product strategy and interface design to full-stack
              development and automation, I create digital experiences that are
              clear, useful, scalable, and built to perform.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.14em] text-[#111111] hover:text-[#71717A] transition-colors border-b border-[#111111] pb-0.5"
            >
              <span>Full capabilities breakdown</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Responsive Editorial Service Grid: 2 Columns + Full-Width Featured Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* ========================================================
              CARD 01: WEB DESIGN & DEVELOPMENT (FEXION)
          ======================================================== */}
          <div className="group rounded-[28px] border border-[#E6E6E4] bg-white p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:border-[#111111]/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1">
            {/* Upper Area: Explanation */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#FAFAF9] border border-[#E6E6E4] flex items-center justify-center text-[#111111] shadow-2xs group-hover:bg-[#111111] group-hover:text-white transition-colors duration-300">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-[#8E8E93] uppercase tracking-wider">
                  01 / WEB
                </span>
              </div>
              <h3 className="text-[21px] sm:text-[24px] font-normal tracking-tight text-[#111111] mb-2.5">
                Web Design & Development
              </h3>
              <p className="text-[13.5px] sm:text-[14px] text-[#555555] font-light leading-relaxed">
                High-performance websites and web applications designed around
                your brand, users, and business goals.
              </p>
            </div>

            {/* Lower Area: Real Project Proof (FEXION Browser Showcase) */}
            <div className="relative mt-auto">
              <Link
                href={`/work/${fexionSlug}`}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-2xl"
                aria-label="View Fexion project case study"
              >
                <ProjectShowcase
                  variant="browser"
                  primaryImage={fexionImg}
                  title="Fexion Fashion E-Commerce"
                  url="fexion.store / latest-arrivals"
                  statusLabel="Website Design"
                />
              </Link>
            </div>
          </div>

          {/* ========================================================
              CARD 02: UI/UX & PRODUCT DESIGN (ROSELYRA)
          ======================================================== */}
          <div className="group rounded-[28px] border border-[#E6E6E4] bg-white p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:border-[#111111]/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1">
            {/* Upper Area: Explanation */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#FAFAF9] border border-[#E6E6E4] flex items-center justify-center text-[#111111] shadow-2xs group-hover:bg-[#111111] group-hover:text-white transition-colors duration-300">
                  <Palette className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-[#8E8E93] uppercase tracking-wider">
                  02 / PRODUCT
                </span>
              </div>
              <h3 className="text-[21px] sm:text-[24px] font-normal tracking-tight text-[#111111] mb-2.5">
                UI/UX & Product Design
              </h3>
              <p className="text-[13.5px] sm:text-[14px] text-[#555555] font-light leading-relaxed">
                Thoughtful interfaces and product experiences designed to make
                complex ideas simple, intuitive, and enjoyable to use.
              </p>
            </div>

            {/* Lower Area: Real Project Proof (ROSELYRA Product Design Presentation) */}
            <div className="relative mt-auto">
              <Link
                href={`/work/${roselyraSlug}`}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-2xl"
                aria-label="View Roselyra product design case study"
              >
                <ProjectShowcase
                  variant="product-design"
                  primaryImage={roselyraImg}
                  title="Roselyra Luxury Lookbook"
                  statusLabel="Product Design"
                />
              </Link>
            </div>
          </div>

          {/* ========================================================
              CARD 03: E-COMMERCE & DIGITAL EXPERIENCES (ROSELYRA + ETHEREA)
          ======================================================== */}
          <div className="group rounded-[28px] border border-[#E6E6E4] bg-white p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:border-[#111111]/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1">
            {/* Upper Area: Explanation */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#FAFAF9] border border-[#E6E6E4] flex items-center justify-center text-[#111111] shadow-2xs group-hover:bg-[#111111] group-hover:text-white transition-colors duration-300">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-[#8E8E93] uppercase tracking-wider">
                  03 / COMMERCE
                </span>
              </div>
              <h3 className="text-[21px] sm:text-[24px] font-normal tracking-tight text-[#111111] mb-2.5">
                E-commerce & Digital Experiences
              </h3>
              <p className="text-[13.5px] sm:text-[14px] text-[#555555] font-light leading-relaxed">
                Conversion-focused digital experiences that combine strong
                visual identity, intuitive shopping journeys, and polished
                interaction.
              </p>
            </div>

            {/* Lower Area: Layered Real Project Proof (Roselyra + Etherea) */}
            <div className="relative mt-auto">
              <Link
                href={`/work/${roselyraSlug}`}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-2xl"
                aria-label="View E-commerce case studies"
              >
                <ProjectShowcase
                  variant="layered-ecommerce"
                  primaryImage={roselyraImg}
                  secondaryImage={ethereaImg}
                  title="E-commerce Flagships"
                  statusLabel="E-commerce"
                />
              </Link>
            </div>
          </div>

          {/* ========================================================
              CARD 04: AI & AUTOMATION (ORIGINAL WORKFLOW VISUAL)
          ======================================================== */}
          <div className="group rounded-[28px] border border-[#E6E6E4] bg-white p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:border-[#111111]/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1">
            {/* Upper Area: Explanation */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#FAFAF9] border border-[#E6E6E4] flex items-center justify-center text-[#111111] shadow-2xs group-hover:bg-[#111111] group-hover:text-white transition-colors duration-300">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-[#8E8E93] uppercase tracking-wider">
                  04 / AI
                </span>
              </div>
              <h3 className="text-[21px] sm:text-[24px] font-normal tracking-tight text-[#111111] mb-2.5">
                AI & Automation
              </h3>
              <p className="text-[13.5px] sm:text-[14px] text-[#555555] font-light leading-relaxed">
                Intelligent workflows and automation systems that remove
                repetitive work and connect the tools your business already uses.
              </p>
            </div>

            {/* Lower Area: Original Animated SVG/HTML Workflow */}
            <div className="relative mt-auto">
              <WorkflowVisual />
            </div>
          </div>

          {/* ========================================================
              CARD 05: CUSTOM SOFTWARE & WEB APPLICATIONS (DASHBOARD)
          ======================================================== */}
          <div className="group rounded-[28px] border border-[#E6E6E4] bg-white p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 hover:border-[#111111]/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1">
            {/* Upper Area: Explanation */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#FAFAF9] border border-[#E6E6E4] flex items-center justify-center text-[#111111] shadow-2xs group-hover:bg-[#111111] group-hover:text-white transition-colors duration-300">
                  <Terminal className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-[#8E8E93] uppercase tracking-wider">
                  05 / ARCHITECTURE
                </span>
              </div>
              <h3 className="text-[21px] sm:text-[24px] font-normal tracking-tight text-[#111111] mb-2.5">
                Custom Software & Web Applications
              </h3>
              <p className="text-[13.5px] sm:text-[14px] text-[#555555] font-light leading-relaxed">
                Purpose-built digital systems designed around your workflow,
                requirements, users, and long-term growth.
              </p>
            </div>

            {/* Lower Area: Restrained Engineering Dashboard Mockup */}
            <div className="relative mt-auto">
              <DashboardVisual />
            </div>
          </div>

          {/* ========================================================
              CARD 06: INTERACTIVE EXPERIENCES (LARGE FEATURED CARD)
          ======================================================== */}
          <div className="col-span-1 md:col-span-2 group rounded-[28px] border border-[#E6E6E4] bg-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between transition-all duration-500 hover:border-[#111111]/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1">
            {/* Upper Area: Editorial Header for Featured Card */}
            <div className="mb-8 sm:mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#111111] text-white flex items-center justify-center shadow-xs">
                    <Sparkles className="w-5 h-5 text-amber-300" />
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#FAFAF9] border border-[#E6E6E4] text-[11px] font-mono text-[#111111]">
                    06 / FEATURED SHOWCASE
                  </span>
                </div>
                <h3 className="text-[26px] sm:text-[32px] md:text-[36px] font-normal tracking-tight text-[#111111] mb-2.5">
                  Interactive Experiences
                </h3>
                <p className="text-[14px] sm:text-[15px] text-[#555555] font-light leading-relaxed">
                  Motion, interaction, micro-interactions, and immersive
                  interfaces designed to make digital products feel alive.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  href="/work/etherea"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] text-white text-[12px] font-medium tracking-tight hover:bg-[#333333] transition-colors shadow-xs"
                >
                  <span>Explore Etherea Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Lower Area: Large Editorial Project Showcase of ETHEREA with Slow Vertical Scroll & "You" Cursor */}
            <div className="relative w-full">
              <Link
                href="/work/etherea"
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded-2xl"
                aria-label="View Etherea interactive experience case study"
              >
                <ProjectShowcase
                  variant="long-page"
                  primaryImage={ethereaImg}
                  title="Etherea Botanical Skincare Flagship"
                  url="etherea.organics / live-flagship"
                  statusLabel="Interactive Experience"
                  showCursor={true}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
