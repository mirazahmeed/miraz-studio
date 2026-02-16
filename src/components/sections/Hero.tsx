"use client";

import { motion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Button from "../ui/Button";
import { useContent } from "@/context/ContentContext";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export default function Hero() {
  const { content } = useContent();
  const { hero } = content;

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative px-4 md:px-8 lg:px-12 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-4xl mx-auto"
      >
        <motion.p
          variants={itemVariants}
          className="text-sm md:text-base text-[#A3A3A3] uppercase tracking-[0.3em] mb-6"
        >
          {hero.tagline}
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold font-[family-name:var(--font-syne)] leading-tight mb-8"
        >
          <span className="block">{hero.titleLine1}</span>
          <span className="block text-[#A3A3A3]">{hero.titleLine2}</span>
          <span className="block">{hero.titleLine3}</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-[#A3A3A3] max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button href="#projects" size="lg">
            {hero.ctaPrimary}
          </Button>
          <Button href="#contact" variant="outline" size="lg">
            {hero.ctaSecondary}
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => scrollToSection("#about")}
          className="p-2 text-white/30 hover:text-white/60 transition-colors duration-300"
          aria-label="Scroll down"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown size={32} />
          </motion.div>
        </button>
      </motion.div>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl" />
      </div>
    </section>
  );
}
