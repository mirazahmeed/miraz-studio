"use client";

import { motion } from "framer-motion";
import Section from "../ui/Section";
import { useContent } from "@/context/ContentContext";

export default function About() {
  const { content } = useContent();
  const { about } = content;

  return (
    <Section id="about" className="bg-[#0A0A0A]">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm text-[#A3A3A3] uppercase tracking-[0.2em] mb-4">
            {about.subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-syne)] mb-6 leading-tight">
            {about.title}
            <br />
            <span className="text-[#A3A3A3]">{about.highlightTitle}</span>
          </h2>
          <div className="space-y-4 text-[#A3A3A3] text-lg leading-relaxed">
            {about.paragraphs.map((paragraph, index) => (
              <p key={index} dangerouslySetInnerHTML={{ 
                __html: paragraph.replace(
                  /{(.*?)}/g, 
                  '<span class="text-white font-semibold">$1</span>'
                ) 
              }} />
            ))}
          </div>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl bg-[#141414] border border-white/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="grid grid-cols-3 gap-4">
                  {about.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <p className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-syne)] text-white">
                        {stat.value}
                      </p>
                      <p className="text-xs md:text-sm text-[#A3A3A3] mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            {about.skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-[#1A1A1A] border border-white/10 rounded-full text-sm text-white/80"
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
