"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { BrowserFrame } from "@/components/services/BrowserFrame";
import { StatusPill } from "@/components/services/StatusPill";
import { SimulatedCursor } from "@/components/services/SimulatedCursor";
import { Sparkles, ShoppingBag, Globe, Palette } from "lucide-react";

export type ShowcaseVariant =
  | "browser"
  | "product-design"
  | "layered-ecommerce"
  | "long-page";

interface ProjectShowcaseProps {
  variant: ShowcaseVariant;
  primaryImage: string;
  secondaryImage?: string;
  title: string;
  url?: string;
  statusLabel?: string;
  statusIcon?: React.ReactNode;
  showCursor?: boolean;
}

export function ProjectShowcase({
  variant,
  primaryImage,
  secondaryImage,
  title,
  url,
  statusLabel,
  statusIcon,
  showCursor = false,
}: ProjectShowcaseProps) {
  const shouldReduceMotion = useReducedMotion();

  // 1. BROWSER VARIANT (FEXION / Web Design & Development)
  if (variant === "browser") {
    return (
      <div className="relative w-full h-full min-h-[290px] sm:min-h-[320px] flex items-center justify-center p-3 sm:p-5 bg-[#FAFAF9] rounded-2xl border border-[#E6E6E4] overflow-hidden group/browser select-none">
        <BrowserFrame
          url={url || "fexion.store"}
          className="w-full max-w-[500px] h-[260px] sm:h-[285px] shadow-[0_16px_40px_rgba(0,0,0,0.08)] group-hover/browser:shadow-[0_20px_48px_rgba(0,0,0,0.12)] transition-all duration-500"
        >
          <div className="relative w-full h-full overflow-hidden bg-white">
            <Image
              src={primaryImage}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/browser:scale-[1.03]"
              priority
            />
          </div>
        </BrowserFrame>

        {/* Floating Status Pill */}
        {statusLabel && (
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 transition-transform duration-300 group-hover/browser:-translate-y-1">
            <StatusPill
              label={statusLabel}
              icon={statusIcon || <Globe className="w-3 h-3 text-emerald-600" />}
            />
          </div>
        )}
      </div>
    );
  }

  // 2. PRODUCT DESIGN VARIANT (ROSELYRA / UI/UX & Product Design)
  if (variant === "product-design") {
    return (
      <div className="relative w-full h-full min-h-[290px] sm:min-h-[320px] flex items-center justify-center p-3 sm:p-5 bg-[#FAFAF9] rounded-2xl border border-[#E6E6E4] overflow-hidden group/product select-none">
        {/* Background Design Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #E4E4E7 1px, transparent 1px), linear-gradient(to bottom, #E4E4E7 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Floating Spec Chips (Product Design Polish) */}
        <div className="absolute top-4 left-4 z-20 hidden sm:flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-white border border-[#E6E6E4] text-[10px] font-mono text-[#52525B] shadow-2xs">
            12-COL GRID
          </span>
          <span className="px-2.5 py-1 rounded-md bg-white border border-[#E6E6E4] text-[10px] font-mono text-[#52525B] shadow-2xs">
            TYPO: SERIF
          </span>
        </div>

        {/* Product Device Mockup Container */}
        <div className="relative w-full max-w-[420px] h-[255px] sm:h-[280px] rounded-xl border border-[#111111]/15 bg-white shadow-[0_16px_36px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/product:scale-[1.02] group-hover/product:shadow-[0_22px_48px_rgba(0,0,0,0.12)]">
          {/* Subtle Mobile/Device Top Bar */}
          <div className="h-6 bg-white border-b border-[#E6E6E4] px-3 flex items-center justify-between text-[9px] font-mono text-[#71717A]">
            <span>ROSELYRA LOOKBOOK</span>
            <span>MOBILE / RETINA</span>
          </div>

          <div className="relative w-full h-[calc(100%-24px)] overflow-hidden bg-[#F4F4F5]">
            <Image
              src={primaryImage}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/product:scale-[1.04]"
            />
          </div>
        </div>

        {/* Floating Status Pill */}
        {statusLabel && (
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 transition-transform duration-300 group-hover/product:-translate-y-1">
            <StatusPill
              label={statusLabel}
              icon={statusIcon || <Palette className="w-3 h-3 text-purple-600" />}
            />
          </div>
        )}
      </div>
    );
  }

  // 3. LAYERED E-COMMERCE VARIANT (ROSELYRA + ETHEREA / E-commerce & Digital Experiences)
  if (variant === "layered-ecommerce") {
    return (
      <div className="relative w-full h-full min-h-[290px] sm:min-h-[320px] flex items-center justify-center p-3 sm:p-5 bg-[#FAFAF9] rounded-2xl border border-[#E6E6E4] overflow-hidden group/layered select-none">
        {/* Layered Multi-Project Showcase Container */}
        <div className="relative w-full max-w-[480px] h-[255px] sm:h-[280px] flex items-center justify-center">
          {/* Secondary Stacked Card (Etherea behind, offset right & top) */}
          {secondaryImage && (
            <div className="absolute right-2 sm:right-6 top-3 w-[60%] h-[200px] sm:h-[220px] rounded-xl border border-[#E6E6E4] bg-white shadow-md overflow-hidden opacity-70 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/layered:translate-x-2 group-hover/layered:opacity-90">
              <div className="h-5 bg-[#FAFAF9] border-b border-[#E6E6E4] px-2 flex items-center">
                <span className="text-[8px] font-mono text-[#71717A]">
                  ETHEREA SKINCARE
                </span>
              </div>
              <div className="relative w-full h-full">
                <Image
                  src={secondaryImage}
                  alt="Etherea project preview"
                  fill
                  sizes="30vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
          )}

          {/* Primary Front Card (Roselyra editorial e-commerce, offset left & bottom) */}
          <div className="relative z-10 left-[-8px] sm:left-[-16px] w-[68%] sm:w-[65%] h-[225px] sm:h-[245px] rounded-xl border border-[#111111]/20 bg-white shadow-[0_16px_36px_rgba(0,0,0,0.12)] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/layered:scale-[1.02] group-hover/layered:-translate-y-1">
            <div className="h-6 bg-white border-b border-[#E6E6E4] px-3 flex items-center justify-between">
              <span className="text-[9px] font-mono font-medium text-[#111111]">
                ROSELYRA STOREFRONT
              </span>
              <span className="text-[8px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                CART READY
              </span>
            </div>
            <div className="relative w-full h-[calc(100%-24px)] overflow-hidden bg-white">
              <Image
                src={primaryImage}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top transition-transform duration-700 group-hover/layered:scale-[1.03]"
              />
            </div>
          </div>
        </div>

        {/* Floating Status Pill */}
        {statusLabel && (
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 transition-transform duration-300 group-hover/layered:-translate-y-1">
            <StatusPill
              label={statusLabel}
              icon={statusIcon || <ShoppingBag className="w-3 h-3 text-blue-600" />}
            />
          </div>
        )}
      </div>
    );
  }

  // 4. LONG-PAGE SCROLLING VARIANT (ETHEREA / Interactive Experiences - LARGE FEATURED CARD)
  if (variant === "long-page") {
    return (
      <div className="relative w-full h-full min-h-[420px] sm:min-h-[500px] lg:min-h-[540px] flex items-center justify-center p-4 sm:p-8 lg:p-12 bg-[#FAFAF9] rounded-2xl border border-[#E6E6E4] overflow-hidden group/featured select-none">
        {/* Subtle Architectural Grid & Ambient Gradient */}
        <div
          className="absolute inset-0 opacity-[0.35] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(#D4D4D8 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute inset-0 bg-radial from-emerald-50/50 via-transparent to-transparent opacity-70 pointer-events-none" />

        {/* Floating Ambient Craft Chips (Left Side) */}
        <div className="absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3 z-10 pointer-events-none">
          <div className="px-3 py-1.5 rounded-full bg-white border border-[#E6E6E4] shadow-xs text-[11px] font-mono text-[#52525B] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Fluid Botanical Motion</span>
          </div>
          <div className="px-3 py-1.5 rounded-full bg-white border border-[#E6E6E4] shadow-xs text-[11px] font-mono text-[#52525B]">
            Sub-second LCP (0.38s)
          </div>
        </div>

        {/* Floating Ambient Craft Chips (Right Side) */}
        <div className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3 z-10 pointer-events-none items-end">
          <div className="px-3 py-1.5 rounded-full bg-white border border-[#E6E6E4] shadow-xs text-[11px] font-mono text-[#52525B] flex items-center gap-2">
            <span>98% User Engagement</span>
            <span className="w-2 h-2 rounded-full bg-amber-400" />
          </div>
          <div className="px-3 py-1.5 rounded-full bg-white border border-[#E6E6E4] shadow-xs text-[11px] font-mono text-[#52525B]">
            Interactive Hotspots
          </div>
        </div>

        {/* Centered Device / Browser Viewport Frame for ETHEREA */}
        <div className="relative z-20 w-[300px] sm:w-[350px] md:w-[380px] h-[360px] sm:h-[440px] lg:h-[460px] rounded-2xl border border-[#111111]/20 bg-white shadow-[0_24px_60px_rgba(0,0,0,0.12)] group-hover/featured:shadow-[0_32px_72px_rgba(0,0,0,0.16)] transition-all duration-700 overflow-hidden flex flex-col">
          {/* Top Browser / Device Bar */}
          <div className="px-3.5 py-2 bg-white border-b border-[#E6E6E4] flex items-center justify-between select-none">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#E5E5E5] border border-[#D4D4D4]" />
              <div className="w-2 h-2 rounded-full bg-[#E5E5E5] border border-[#D4D4D4]" />
              <div className="w-2 h-2 rounded-full bg-[#E5E5E5] border border-[#D4D4D4]" />
            </div>
            <span className="text-[10px] font-mono text-[#71717A]">
              etherea.organics / flagship
            </span>
            <span className="w-3" />
          </div>

          {/* Viewport with Slow Vertical Scroll Animation */}
          <div className="relative w-full flex-1 overflow-hidden bg-[#FAF6F3]">
            {/* The tall image scrolls serenely */}
            <motion.div
              className="relative w-full"
              style={{
                height: "380%", // proper proportion for 140x1024 tall page
              }}
              animate={
                shouldReduceMotion
                  ? { y: "0%" }
                  : {
                      y: ["0%", "-62%", "0%"],
                    }
              }
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src={primaryImage}
                alt={title}
                fill
                sizes="(max-width: 768px) 300px, 380px"
                className="object-contain object-top"
                priority
              />
            </motion.div>

            {/* Simulated "You" Blue Cursor floating over the preview */}
            {showCursor && (
              <SimulatedCursor
                label="You"
                className="top-[38%] left-[30%]"
              />
            )}
          </div>
        </div>

        {/* Floating Status Pill */}
        {statusLabel && (
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 transition-transform duration-300 group-hover/featured:-translate-y-1">
            <StatusPill
              label={statusLabel}
              icon={statusIcon || <Sparkles className="w-3.5 h-3.5 text-amber-500" />}
              className="px-4 py-2 text-[12px]"
            />
          </div>
        )}
      </div>
    );
  }

  return null;
}
