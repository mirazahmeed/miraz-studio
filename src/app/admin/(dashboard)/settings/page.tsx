import { getSiteSettings } from "@/lib/queries";
import { updateSiteSettingsAction } from "@/app/actions/admin";
import { ArrowUpRight } from "lucide-react";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="pb-6 border-b border-[#E6E6E4]">
        <h1 className="text-[26px] font-normal uppercase tracking-tight text-[#111111]">
          STUDIO & SITE SETTINGS
        </h1>
        <p className="text-[13px] text-[#71717A] font-light mt-0.5">
          Configure site copy, hero headlines, statistics, and studio coordinates. Changes reflect immediately.
        </p>
      </div>

      <form action={updateSiteSettingsAction} className="space-y-10">
        {/* 1. Identity */}
        <div className="p-6 sm:p-8 bg-white border border-[#E6E6E4] space-y-6">
          <h2 className="text-[16px] font-medium uppercase tracking-tight text-[#111111] border-b border-[#E6E6E4] pb-3">
            1. STUDIO IDENTITY & BRAND
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                STUDIO WORDMARK
              </label>
              <input
                type="text"
                name="studio_name"
                defaultValue={settings["studio_name"] || "MIRAZ STUDIO™"}
                className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                PRIMARY TAGLINE
              </label>
              <input
                type="text"
                name="studio_tagline"
                defaultValue={
                  settings["studio_tagline"] ||
                  "DESIGNING AND BUILDING DIGITAL EXPERIENCES WITH INTENTION."
                }
                className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
              />
            </div>
          </div>
        </div>

        {/* 2. Hero Copy */}
        <div className="p-6 sm:p-8 bg-white border border-[#E6E6E4] space-y-6">
          <h2 className="text-[16px] font-medium uppercase tracking-tight text-[#111111] border-b border-[#E6E6E4] pb-3">
            2. HERO SECTION COPY
          </h2>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
              HERO EYEBROW
            </label>
            <input
              type="text"
              name="hero_eyebrow"
              defaultValue={
                settings["hero_eyebrow"] ||
                "INDEPENDENT DIGITAL PRODUCT & CREATIVE ENGINEERING STUDIO"
              }
              className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
              HERO DESCRIPTION
            </label>
            <textarea
              name="hero_description"
              defaultValue={
                settings["hero_description"] ||
                "Operating at the intersection of architectural discipline and technical precision."
              }
              rows={3}
              className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
            />
          </div>
        </div>

        {/* 3. Metrics */}
        <div className="p-6 sm:p-8 bg-white border border-[#E6E6E4] space-y-6">
          <h2 className="text-[16px] font-medium uppercase tracking-tight text-[#111111] border-b border-[#E6E6E4] pb-3">
            3. KEY METRICS & STATISTICS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                STAT 1: LABEL & VALUE
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="stat_1_label"
                  defaultValue={settings["stat_1_label"] || "PROJECTS DELIVERED"}
                  className="w-2/3 px-4 py-2.5 bg-white border border-[#E6E6E4] text-[13px] rounded-[2px]"
                />
                <input
                  type="text"
                  name="stat_1_value"
                  defaultValue={settings["stat_1_value"] || "24+"}
                  className="w-1/3 px-4 py-2.5 bg-white border border-[#E6E6E4] text-[13px] rounded-[2px]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                STAT 2: LABEL & VALUE
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="stat_2_label"
                  defaultValue={settings["stat_2_label"] || "AMBITIOUS CLIENTS"}
                  className="w-2/3 px-4 py-2.5 bg-white border border-[#E6E6E4] text-[13px] rounded-[2px]"
                />
                <input
                  type="text"
                  name="stat_2_value"
                  defaultValue={settings["stat_2_value"] || "18+"}
                  className="w-1/3 px-4 py-2.5 bg-white border border-[#E6E6E4] text-[13px] rounded-[2px]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                STAT 3: LABEL & VALUE
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="stat_3_label"
                  defaultValue={settings["stat_3_label"] || "YEARS CRAFTING"}
                  className="w-2/3 px-4 py-2.5 bg-white border border-[#E6E6E4] text-[13px] rounded-[2px]"
                />
                <input
                  type="text"
                  name="stat_3_value"
                  defaultValue={settings["stat_3_value"] || "5+"}
                  className="w-1/3 px-4 py-2.5 bg-white border border-[#E6E6E4] text-[13px] rounded-[2px]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                STAT 4: LABEL & VALUE
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="stat_4_label"
                  defaultValue={settings["stat_4_label"] || "TECH ECOSYSTEM"}
                  className="w-2/3 px-4 py-2.5 bg-white border border-[#E6E6E4] text-[13px] rounded-[2px]"
                />
                <input
                  type="text"
                  name="stat_4_value"
                  defaultValue={settings["stat_4_value"] || "20+"}
                  className="w-1/3 px-4 py-2.5 bg-white border border-[#E6E6E4] text-[13px] rounded-[2px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4. Contact & Availability */}
        <div className="p-6 sm:p-8 bg-white border border-[#E6E6E4] space-y-6">
          <h2 className="text-[16px] font-medium uppercase tracking-tight text-[#111111] border-b border-[#E6E6E4] pb-3">
            4. AVAILABILITY & COORDINATES
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                CONTACT EMAIL
              </label>
              <input
                type="email"
                name="contact_email"
                defaultValue={settings["contact_email"] || "mirazahmed0619@gmail.com"}
                className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                STUDIO LOCATION
              </label>
              <input
                type="text"
                name="contact_location"
                defaultValue={settings["contact_location"] || "DHAKA / AVAILABLE GLOBALLY"}
                className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                AVAILABILITY NOTICE
              </label>
              <input
                type="text"
                name="contact_availability"
                defaultValue={
                  settings["contact_availability"] ||
                  "ACCEPTING SELECT PROJECTS FOR Q2/Q3 2026"
                }
                className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-8 py-3.5 bg-[#111111] hover:bg-[#222222] text-white text-[11px] font-medium uppercase tracking-[0.16em] rounded-[2px] transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <span>SAVE SITE SETTINGS</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
