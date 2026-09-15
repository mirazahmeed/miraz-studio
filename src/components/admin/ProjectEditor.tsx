"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { saveProjectAction } from "@/app/actions/admin";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

interface ProjectEditorProps {
  initialData?: any;
}

export function ProjectEditor({ initialData }: ProjectEditorProps) {
  const isEditing = !!initialData;
  const [heroImage, setHeroImage] = useState(
    initialData?.heroImage ||
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1800&q=85"
  );

  let techString = "";
  if (initialData?.technologies) {
    try {
      const arr = JSON.parse(initialData.technologies);
      techString = arr.join(", ");
    } catch {
      techString = initialData.technologies;
    }
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-[#E6E6E4]">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A] hover:text-[#111111]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO PROJECTS</span>
        </Link>
        <span className="text-[11px] font-mono text-[#8E8E93] uppercase tracking-widest">
          {isEditing ? `EDITING: ${initialData.title}` : "NEW PROJECT DRAFT"}
        </span>
      </div>

      <form action={saveProjectAction} className="space-y-12">
        {initialData?.id && (
          <input type="hidden" name="id" value={initialData.id} />
        )}

        {/* 1. Core Metadata */}
        <div className="p-6 sm:p-8 bg-white border border-[#E6E6E4] space-y-6">
          <h2 className="text-[16px] font-medium uppercase tracking-tight text-[#111111] border-b border-[#E6E6E4] pb-3">
            1. ESSENTIAL METADATA
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                PROJECT TITLE *
              </label>
              <input
                type="text"
                name="title"
                defaultValue={initialData?.title}
                required
                placeholder="NEXUS PLATFORM"
                className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                URL SLUG (AUTO-GENERATED IF BLANK)
              </label>
              <input
                type="text"
                name="slug"
                defaultValue={initialData?.slug}
                placeholder="nexus-platform"
                className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                CLIENT *
              </label>
              <input
                type="text"
                name="client"
                defaultValue={initialData?.client}
                required
                placeholder="Nexus Systems Inc"
                className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                YEAR *
              </label>
              <input
                type="text"
                name="year"
                defaultValue={initialData?.year || "2026"}
                required
                placeholder="2026"
                className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                CATEGORY *
              </label>
              <select
                name="category"
                defaultValue={initialData?.category || "WEBSITES"}
                className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
              >
                <option value="WEBSITES">WEBSITES</option>
                <option value="WEB APPS">WEB APPS</option>
                <option value="SAAS">SAAS</option>
                <option value="UI/UX">UI/UX</option>
                <option value="AUTOMATION">AUTOMATION</option>
                <option value="EXPERIMENTS">EXPERIMENTS</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                TYPE *
              </label>
              <input
                type="text"
                name="type"
                defaultValue={initialData?.type || "DIGITAL PRODUCT"}
                required
                placeholder="DIGITAL PRODUCT"
                className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                ROLE *
              </label>
              <input
                type="text"
                name="role"
                defaultValue={initialData?.role || "DESIGN / FULL-STACK ENGINEERING"}
                required
                placeholder="DESIGN / ENGINEERING"
                className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                DURATION
              </label>
              <input
                type="text"
                name="duration"
                defaultValue={initialData?.duration || "3 MONTHS"}
                placeholder="3 MONTHS"
                className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                STATUS
              </label>
              <select
                name="status"
                defaultValue={initialData?.status || "PUBLISHED"}
                className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
              >
                <option value="PUBLISHED">PUBLISHED (LIVE)</option>
                <option value="DRAFT">DRAFT (STAGING)</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                SORT ORDER
              </label>
              <input
                type="number"
                name="sortOrder"
                defaultValue={initialData?.sortOrder ?? 0}
                className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
              />
            </div>

            <div className="space-y-1.5 flex flex-col justify-end">
              <label className="flex items-center gap-2 cursor-pointer pb-3">
                <input
                  type="checkbox"
                  name="featured"
                  value="true"
                  defaultChecked={initialData?.featured || false}
                  className="w-4 h-4 text-[#111111] focus:ring-0 rounded-xs"
                />
                <span className="text-[12px] font-medium uppercase tracking-wider text-[#111111]">
                  FEATURE ON HOMEPAGE
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* 2. Visual Assets */}
        <div className="p-6 sm:p-8 bg-white border border-[#E6E6E4] space-y-6">
          <h2 className="text-[16px] font-medium uppercase tracking-tight text-[#111111] border-b border-[#E6E6E4] pb-3">
            2. HERO IMAGERY
          </h2>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
              COVER / HERO IMAGE URL *
            </label>
            <input
              type="url"
              name="heroImage"
              value={heroImage}
              onChange={(e) => setHeroImage(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
            />
          </div>

          {heroImage && (
            <div className="relative w-full aspect-21/9 overflow-hidden rounded-[2px] border border-[#E6E6E4] bg-neutral-100">
              <Image
                src={heroImage}
                alt="Preview"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}
        </div>

        {/* 3. Narratives & Content */}
        <div className="p-6 sm:p-8 bg-white border border-[#E6E6E4] space-y-6">
          <h2 className="text-[16px] font-medium uppercase tracking-tight text-[#111111] border-b border-[#E6E6E4] pb-3">
            3. EDITORIAL NARRATIVES
          </h2>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
              SUBTITLE (EDITORIAL STRAPLINE)
            </label>
            <input
              type="text"
              name="subtitle"
              defaultValue={initialData?.subtitle}
              placeholder="Next-generation workspace for high-velocity engineering teams."
              className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
              EXCERPT (INDEX SUMMARY) *
            </label>
            <textarea
              name="excerpt"
              defaultValue={initialData?.excerpt}
              rows={2}
              required
              placeholder="Short 1-2 sentence overview for the index page..."
              className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
              FULL DESCRIPTION *
            </label>
            <textarea
              name="description"
              defaultValue={initialData?.description}
              rows={4}
              required
              placeholder="In-depth executive description of the project..."
              className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
              TECHNOLOGY STACK (COMMA-SEPARATED)
            </label>
            <input
              type="text"
              name="technologies"
              defaultValue={techString}
              placeholder="NEXT.JS 15, TYPESCRIPT, SUPABASE, TAILWIND CSS"
              className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
            />
          </div>
        </div>

        {/* 4. Verifiable Links */}
        <div className="p-6 sm:p-8 bg-white border border-[#E6E6E4] space-y-6">
          <h2 className="text-[16px] font-medium uppercase tracking-tight text-[#111111] border-b border-[#E6E6E4] pb-3">
            4. VERIFICATION LINKS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                LIVE PRODUCTION URL
              </label>
              <input
                type="url"
                name="liveUrl"
                defaultValue={initialData?.liveUrl}
                placeholder="https://nexus.studio.app"
                className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                GITHUB SOURCE CODE URL
              </label>
              <input
                type="url"
                name="githubUrl"
                defaultValue={initialData?.githubUrl}
                placeholder="https://github.com/mirazahmed/project"
                className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                FIGMA SPECIFICATIONS URL
              </label>
              <input
                type="url"
                name="figmaUrl"
                defaultValue={initialData?.figmaUrl}
                placeholder="https://figma.com/@miraz/project"
                className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                EXTERNAL CASE STUDY URL
              </label>
              <input
                type="url"
                name="caseStudyUrl"
                defaultValue={initialData?.caseStudyUrl}
                placeholder="https://medium.com/case-study"
                className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
              />
            </div>
          </div>
        </div>

        {/* 5. Deep Case Study Story */}
        <div className="p-6 sm:p-8 bg-white border border-[#E6E6E4] space-y-6">
          <h2 className="text-[16px] font-medium uppercase tracking-tight text-[#111111] border-b border-[#E6E6E4] pb-3">
            5. CASE STUDY DEEP DIVE
          </h2>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
              THE PROBLEM & CHALLENGE
            </label>
            <textarea
              name="challenge"
              defaultValue={initialData?.challenge}
              rows={3}
              className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
              THE STRATEGY & APPROACH
            </label>
            <textarea
              name="approach"
              defaultValue={initialData?.approach}
              rows={3}
              className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
              THE TECHNICAL SOLUTION
            </label>
            <textarea
              name="solution"
              defaultValue={initialData?.solution}
              rows={3}
              className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
              MEASURABLE OUTCOMES & RESULTS
            </label>
            <textarea
              name="results"
              defaultValue={initialData?.results}
              rows={3}
              className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Link
            href="/admin/projects"
            className="px-6 py-3.5 border border-[#E6E6E4] hover:bg-neutral-100 text-[#111111] text-[11px] font-medium uppercase tracking-[0.14em] rounded-[2px] transition-colors"
          >
            CANCEL
          </Link>
          <button
            type="submit"
            className="px-8 py-3.5 bg-[#111111] hover:bg-[#222222] text-white text-[11px] font-medium uppercase tracking-[0.16em] rounded-[2px] transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <span>{isEditing ? "UPDATE PROJECT" : "PUBLISH PROJECT"}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
