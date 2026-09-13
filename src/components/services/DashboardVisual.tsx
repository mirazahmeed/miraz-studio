"use client";

import React from "react";
import { Activity, ShieldCheck, Cpu, HardDrive } from "lucide-react";

export function DashboardVisual() {
  return (
    <div className="relative w-full h-full min-h-[300px] sm:min-h-[320px] p-4 sm:p-5 bg-[#FAFAF9] rounded-2xl border border-[#E6E6E4] flex flex-col justify-between overflow-hidden select-none font-sans">
      {/* Top Application Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E6E6E4]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-[11px] font-mono font-medium text-[#111111]">
            SYSTEM_MONITOR.v2
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[#E4E4E7] text-[#52525B] text-[9px] font-mono">
            PROD-US-EAST
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-[#71717A]">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          <span>UPTIME 99.98%</span>
        </div>
      </div>

      {/* Main Dashboard Body: Mini Sidebar + Metrics Grid */}
      <div className="grid grid-cols-12 gap-3 py-3 flex-1 items-center">
        {/* Compact Sidebar navigation mockup */}
        <div className="col-span-3 sm:col-span-3 border-r border-[#E6E6E4] pr-2 flex flex-col gap-1.5 text-[10px] font-mono text-[#71717A]">
          <div className="px-2 py-1 rounded bg-[#111111] text-white font-medium flex items-center justify-between">
            <span>METRICS</span>
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
          </div>
          <div className="px-2 py-1 rounded hover:bg-white text-[#52525B]">
            DATABASE
          </div>
          <div className="px-2 py-1 rounded hover:bg-white text-[#52525B]">
            CLUSTER
          </div>
          <div className="px-2 py-1 rounded hover:bg-white text-[#52525B]">
            LOGS
          </div>
        </div>

        {/* Real-time Telemetry Metrics */}
        <div className="col-span-9 sm:col-span-9 pl-1 flex flex-col gap-2.5">
          {/* Top 3 Stat Cards */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 sm:p-2.5 rounded-lg bg-white border border-[#E6E6E4] shadow-2xs">
              <div className="flex items-center justify-between text-[#71717A] text-[9px] font-mono mb-1">
                <span>LATENCY</span>
                <Activity className="w-2.5 h-2.5 text-blue-500" />
              </div>
              <div className="text-[14px] sm:text-[16px] font-medium text-[#111111] tracking-tight">
                38ms
              </div>
              <div className="text-[8.5px] text-emerald-600 font-mono">
                ↓ 12ms faster
              </div>
            </div>

            <div className="p-2 sm:p-2.5 rounded-lg bg-white border border-[#E6E6E4] shadow-2xs">
              <div className="flex items-center justify-between text-[#71717A] text-[9px] font-mono mb-1">
                <span>THROUGHPUT</span>
                <Cpu className="w-2.5 h-2.5 text-amber-500" />
              </div>
              <div className="text-[14px] sm:text-[16px] font-medium text-[#111111] tracking-tight">
                4.2k/s
              </div>
              <div className="text-[8.5px] text-[#71717A] font-mono">
                Stable load
              </div>
            </div>

            <div className="p-2 sm:p-2.5 rounded-lg bg-white border border-[#E6E6E4] shadow-2xs">
              <div className="flex items-center justify-between text-[#71717A] text-[9px] font-mono mb-1">
                <span>MEMORY</span>
                <HardDrive className="w-2.5 h-2.5 text-emerald-500" />
              </div>
              <div className="text-[14px] sm:text-[16px] font-medium text-[#111111] tracking-tight">
                18%
              </div>
              <div className="text-[8.5px] text-emerald-600 font-mono">
                Optimal
              </div>
            </div>
          </div>

          {/* SVG Real-time Activity Histogram */}
          <div className="p-2.5 rounded-lg bg-white border border-[#E6E6E4] shadow-2xs">
            <div className="flex items-center justify-between text-[9.5px] font-mono text-[#71717A] mb-2">
              <span>LOAD DISTRIBUTION (60s)</span>
              <span className="text-[#111111] font-medium">99.9% HEALTHY</span>
            </div>
            {/* SVG Bars */}
            <div className="h-9 flex items-end gap-1 sm:gap-1.5 w-full">
              {[
                35, 42, 60, 50, 75, 40, 85, 95, 70, 60, 80, 55, 68, 72, 88, 92,
                65, 58, 80, 74, 82, 90, 60, 70, 85,
              ].map((val, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-[#E4E4E7] rounded-xs transition-all hover:bg-[#111111]"
                  style={{
                    height: `${val}%`,
                    backgroundColor: idx > 20 ? "#111111" : undefined,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Ticker */}
      <div className="pt-2 border-t border-[#E6E6E4] flex items-center justify-between text-[10px] font-mono text-[#71717A]">
        <span>ARCHITECTED WITH NEXT.JS 15 + POSTGRESQL</span>
        <span className="text-emerald-700 font-medium">CLUSTER HEALTHY</span>
      </div>
    </div>
  );
}
