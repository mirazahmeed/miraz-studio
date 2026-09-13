"use client";

import React from "react";

interface StatusPillProps {
  label: string;
  dotColor?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatusPill({
  label,
  dotColor = "#10B981",
  icon,
  className = "",
}: StatusPillProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E6E6E4] shadow-[0_4px_16px_rgba(0,0,0,0.06)] text-[11px] font-medium tracking-tight text-[#111111] select-none transition-all duration-300 hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)] ${className}`}
    >
      {icon ? (
        <span className="text-[#111111]">{icon}</span>
      ) : (
        <span className="relative flex h-2 w-2">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ backgroundColor: dotColor }}
          />
          <span
            className="relative inline-flex rounded-full h-2 w-2"
            style={{ backgroundColor: dotColor }}
          />
        </span>
      )}
      <span>{label}</span>
    </div>
  );
}
