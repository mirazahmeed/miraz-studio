"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Zap, Bot, Mail, Database, Send, CheckCircle2 } from "lucide-react";

export function WorkflowVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full h-full min-h-[300px] sm:min-h-[320px] p-6 flex flex-col items-center justify-center bg-[#FAFAF9] rounded-2xl border border-[#E6E6E4] overflow-hidden select-none">
      {/* Background Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.45] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#D4D4D8 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* SVG Connecting Flow Lines with animated traveling signal pulses */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E4E4E7" />
            <stop offset="50%" stopColor="#A1A1AA" />
            <stop offset="100%" stopColor="#E4E4E7" />
          </linearGradient>
        </defs>

        {/* Vertical Line: Trigger -> Agent */}
        <line
          x1="50%"
          y1="22%"
          x2="50%"
          y2="42%"
          stroke="url(#lineGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Branch Lines: Agent -> Destinations */}
        {/* Left branch to Email */}
        <path
          d="M 50% 58% C 50% 68%, 20% 68%, 20% 78%"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        {/* Center branch to Data */}
        <path
          d="M 50% 58% L 50% 78%"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        {/* Right branch to Telegram */}
        <path
          d="M 50% 58% C 50% 68%, 80% 68%, 80% 78%"
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
      </svg>

      {/* NODES CONTAINER */}
      <div className="relative z-10 w-full max-w-[340px] flex flex-col items-center gap-6 sm:gap-7">
        {/* 1. Trigger Node */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  boxShadow: [
                    "0 2px 8px rgba(0,0,0,0.04)",
                    "0 4px 16px rgba(0,0,0,0.08)",
                    "0 2px 8px rgba(0,0,0,0.04)",
                  ],
                }
          }
          transition={{ duration: 3, repeat: Infinity }}
          className="px-3.5 py-1.5 rounded-full bg-white border border-[#E6E6E4] flex items-center gap-2 text-[11px] font-medium text-[#111111]"
        >
          <span className="w-5 h-5 rounded-full bg-[#111111] text-white flex items-center justify-center">
            <Zap className="w-3 h-3 text-amber-300" />
          </span>
          <span className="tracking-tight">Webhook / Inbound Trigger</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </motion.div>

        {/* 2. Central AI Orchestration Agent Node */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.02, 1],
                }
          }
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="px-5 py-3 rounded-xl bg-white border border-[#111111]/20 shadow-[0_8px_24px_rgba(0,0,0,0.06)] flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center shadow-xs">
            <Bot className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-semibold text-[#111111]">
                Autonomous AI Agent
              </span>
              <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-mono">
                ACTIVE
              </span>
            </div>
            <p className="text-[10px] text-[#71717A] font-mono">
              LLM parsing • context synthesis
            </p>
          </div>
        </motion.div>

        {/* 3. Branching Endpoints Row: Email, Data Lake, Telegram */}
        <div className="w-full grid grid-cols-3 gap-2 sm:gap-3 text-center">
          {/* Email */}
          <div className="p-2.5 rounded-xl bg-white border border-[#E6E6E4] shadow-xs flex flex-col items-center gap-1.5">
            <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10.5px] font-medium text-[#111111]">Email</span>
            <span className="text-[9px] text-[#71717A] font-mono">Dispatched</span>
          </div>

          {/* Database */}
          <div className="p-2.5 rounded-xl bg-white border border-[#E6E6E4] shadow-xs flex flex-col items-center gap-1.5">
            <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
              <Database className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10.5px] font-medium text-[#111111]">Postgres</span>
            <span className="text-[9px] text-[#71717A] font-mono">Indexed</span>
          </div>

          {/* Telegram */}
          <div className="p-2.5 rounded-xl bg-white border border-[#E6E6E4] shadow-xs flex flex-col items-center gap-1.5">
            <div className="w-6 h-6 rounded-md bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
              <Send className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10.5px] font-medium text-[#111111]">Telegram</span>
            <span className="text-[9px] text-[#71717A] font-mono">Notified</span>
          </div>
        </div>

        {/* Flow Completed Badge */}
        <div className="flex items-center gap-1.5 text-[10.5px] font-mono text-[#52525B]">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Pipeline latency: 240ms • 0 manual friction</span>
        </div>
      </div>
    </div>
  );
}
