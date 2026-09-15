"use client";

import { AnimateIn } from "@/components/ui/AnimateIn";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

interface StatItem {
  label: string;
  value: string;
  color: string;
}

interface StatsRowProps {
  stats?: StatItem[];
}

export function StatsRow({
  stats = [
    { label: "PROJECTS DELIVERED", value: "24+", color: "#2563EB" },
    { label: "AMBITIOUS CLIENTS", value: "18+", color: "#EF4444" },
    { label: "YEARS CRAFTING", value: "5+", color: "#EAB308" },
    { label: "TECH ECOSYSTEM", value: "20+", color: "#10B981" },
  ],
}: StatsRowProps) {
  return (
    <section className="border-b border-[#E6E6E4] bg-white">
      <div className="studio-container">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, idx) => (
            <AnimateIn
              key={stat.label}
              variant="fade-up"
              delay={0.1 + idx * 0.12}
              className={`py-8 sm:py-10 px-4 sm:px-8 flex flex-col justify-between ${
                idx !== stats.length - 1 ? "md:border-r border-[#E6E6E4]" : ""
              } ${idx % 2 === 0 ? "border-r md:border-r" : ""} ${
                idx < 2 ? "border-b md:border-b-0" : ""
              } border-[#E6E6E4]`}
            >
              {/* Category label */}
              <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A] mb-4">
                {stat.label}
              </span>

              {/* Number with colored bar indicator */}
              <div className="flex items-center gap-3.5">
                <span
                  className="w-1.5 h-7 sm:h-8 rounded-[1px]"
                  style={{ backgroundColor: stat.color }}
                />
                <AnimatedCounter
                  value={stat.value}
                  className="text-[34px] sm:text-[44px] font-normal tracking-[-0.04em] text-[#111111] leading-none"
                />
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
