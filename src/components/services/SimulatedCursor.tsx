"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SimulatedCursorProps {
  label?: string;
  className?: string;
}

export function SimulatedCursor({
  label = "You",
  className = "",
}: SimulatedCursorProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`pointer-events-none absolute z-30 flex items-start gap-1 select-none ${className}`}
      initial={{ x: 0, y: 0 }}
      animate={
        shouldReduceMotion
          ? { x: 0, y: 0 }
          : {
              x: [0, 18, -12, 14, 0],
              y: [0, -16, 12, -8, 0],
            }
      }
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Blue Pointer SVG Cursor */}
      <svg
        width="18"
        height="22"
        viewBox="0 0 18 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_2px_8px_rgba(37,99,235,0.35)]"
      >
        <path
          d="M0.5 0.5L16.5 11.5L8.5 13.5L4.5 21.5L0.5 0.5Z"
          fill="#2563EB"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* "You" Tag */}
      <div className="px-2 py-0.5 rounded-full bg-[#2563EB] text-white text-[10px] font-semibold tracking-wide shadow-md uppercase">
        {label}
      </div>
    </motion.div>
  );
}
