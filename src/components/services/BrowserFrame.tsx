"use client";

import React from "react";
import { Lock } from "lucide-react";

interface BrowserFrameProps {
  url?: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export function BrowserFrame({
  url = "preview.mirazstudio.xyz",
  children,
  className = "",
  headerClassName = "",
}: BrowserFrameProps) {
  return (
    <div
      className={`rounded-2xl border border-[#E6E6E4] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col transition-all duration-500 ${className}`}
    >
      {/* Browser Chrome Header */}
      <div
        className={`px-4 py-2.5 bg-[#FAFAF9] border-b border-[#E6E6E4] flex items-center justify-between gap-3 select-none ${headerClassName}`}
      >
        {/* Window Controls */}
        <div className="flex items-center gap-1.5 w-14">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E5] border border-[#D4D4D4]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E5] border border-[#D4D4D4]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E5] border border-[#D4D4D4]" />
        </div>

        {/* URL Pill */}
        <div className="flex-1 max-w-[240px] mx-auto flex items-center justify-center gap-1.5 py-1 px-3 rounded-md bg-white border border-[#E6E6E4] text-[10.5px] font-mono text-[#71717A]">
          <Lock className="w-2.5 h-2.5 text-[#A1A1AA]" />
          <span className="truncate">{url}</span>
        </div>

        {/* Balance Spacer */}
        <div className="w-14" />
      </div>

      {/* Browser Viewport */}
      <div className="relative w-full flex-1 overflow-hidden bg-[#F4F4F5]">
        {children}
      </div>
    </div>
  );
}
