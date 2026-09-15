"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface HeroSectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
}

const wordAnimation = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.15 + i * 0.04,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

const imageReveal = {
  hidden: { opacity: 0, scale: 0.8, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      delay: 0.6 + i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export function HeroSection({
  eyebrow = "INDEPENDENT DIGITAL PRODUCT & CREATIVE ENGINEERING STUDIO",
  description = "Operating at the intersection of architectural discipline and technical precision.",
}: HeroSectionProps) {
  // Split the hero text into animatable segments
  const textSegments = [
    { text: "AT MIRAZ STUDIO, WE BRING ", className: "" },
    { text: "PASSION AND PURPOSE ", className: "font-semibold text-[#111111]" },
    { text: "TO EVERYTHING ", className: "text-[#8E8E93]" },
    { text: "WE BUILD — FROM ", className: "" },
    { text: "SCALABLE WEB APPS ", className: "text-[#8E8E93]" },
  ];

  const textSegments2 = [
    { text: "THAT MAKE ROOM FOR ", className: "" },
    { text: "BOLD IDEAS ", className: "text-[#111111] font-medium" },
    { text: "TO EDITORIAL ", className: "" },
  ];

  const textSegments3 = [
    { text: "PLATFORMS AND BESPOKE ", className: "text-[#8E8E93]" },
    { text: "SYSTEMS ", className: "text-[#111111] font-semibold" },
  ];

  const textSegments4 = [
    { text: "THAT HELP AMBITIOUS TEAMS ", className: "" },
    { text: "GROW.", className: "text-[#111111] font-semibold" },
  ];

  let wordIndex = 0;
  const getWordIndex = () => wordIndex++;

  return (
    <section className="relative pt-32 pb-16 border-b border-[#E6E6E4]">
      <div className="studio-container">
        {/* Top Boundary with Corner Pluses */}
        <motion.div
          className="flex justify-between items-center pb-8 border-b border-[#E6E6E4]/70"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0 }}
        >
          <span className="text-[13px] font-light text-[#71717A] select-none">+</span>
          <motion.span
            className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#71717A]"
            initial={{ opacity: 0, letterSpacing: "0.3em" }}
            animate={{ opacity: 1, letterSpacing: "0.16em" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {eyebrow}
          </motion.span>
          <span className="text-[13px] font-light text-[#71717A] select-none">+</span>
        </motion.div>

        {/* Massive Editorial Typographic Composition */}
        <div className="py-14 sm:py-20 lg:py-24 max-w-6xl mx-auto text-center lg:text-left">
          <h1 className="text-[32px] sm:text-[48px] md:text-[58px] lg:text-[68px] leading-[1.08] tracking-[-0.035em] font-normal text-[#111111] uppercase select-text">
            {textSegments.map((seg) => (
              <motion.span
                key={seg.text}
                className={seg.className}
                variants={wordAnimation}
                initial="hidden"
                animate="visible"
                custom={getWordIndex()}
              >
                {seg.text}
              </motion.span>
            ))}

            {/* Inline image badge 1 */}
            <motion.span
              className="inline-block align-middle mx-2 my-1 relative w-14 h-7 sm:w-20 sm:h-9 rounded-[2px] overflow-hidden border border-neutral-300 shadow-xs"
              variants={imageReveal}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              <Image
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=300&q=80"
                alt="Code on screen"
                fill
                className="object-cover"
                sizes="80px"
              />
            </motion.span>

            {textSegments2.map((seg) => (
              <motion.span
                key={seg.text}
                className={seg.className}
                variants={wordAnimation}
                initial="hidden"
                animate="visible"
                custom={getWordIndex()}
              >
                {seg.text}
              </motion.span>
            ))}

            {/* Inline image badge 2 */}
            <motion.span
              className="inline-block align-middle mx-2 my-1 relative w-14 h-7 sm:w-20 sm:h-9 rounded-[2px] overflow-hidden border border-neutral-300 shadow-xs"
              variants={imageReveal}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <Image
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=300&q=80"
                alt="Web development code editor"
                fill
                className="object-cover"
                sizes="80px"
              />
            </motion.span>

            {textSegments3.map((seg) => (
              <motion.span
                key={seg.text}
                className={seg.className}
                variants={wordAnimation}
                initial="hidden"
                animate="visible"
                custom={getWordIndex()}
              >
                {seg.text}
              </motion.span>
            ))}

            {/* Inline image badge 3 */}
            <motion.span
              className="inline-block align-middle mx-2 my-1 relative w-14 h-7 sm:w-20 sm:h-9 rounded-[2px] overflow-hidden border border-neutral-300 shadow-xs"
              variants={imageReveal}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <Image
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=300&q=80"
                alt="AI technology neural network"
                fill
                className="object-cover"
                sizes="80px"
              />
            </motion.span>

            {textSegments4.map((seg) => (
              <motion.span
                key={seg.text}
                className={seg.className}
                variants={wordAnimation}
                initial="hidden"
                animate="visible"
                custom={getWordIndex()}
              >
                {seg.text}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-8 text-[15px] sm:text-[17px] text-[#71717A] max-w-2xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
          >
            {description}
          </motion.p>
        </div>

        {/* Bottom Boundary with Downward Indicator Marks */}
        <motion.div
          className="flex justify-between items-center pt-8 border-t border-[#E6E6E4]/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <motion.div
            className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[#71717A]"
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <span>↓</span>
            <span>DISCOVER STUDIO WORK</span>
          </motion.div>
          <span className="text-[11px] uppercase tracking-[0.14em] text-[#8E8E93]">
            ARCHITECTURAL DISCIPLINE • DIGITAL PRECISION
          </span>
          <motion.span
            className="text-[11px] text-[#71717A]"
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
