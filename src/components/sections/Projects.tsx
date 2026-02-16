"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import Section, { SectionHeader } from "../ui/Section";
import { useProjects } from "@/context/ProjectsContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function Projects() {
  const { projects } = useProjects();

  return (
    <Section id="projects" className="bg-[#0A0A0A]">
      <SectionHeader
        title="Featured Projects"
        subtitle="Our Work"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-2 gap-8"
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={cardVariants}
            className="group bg-[#141414] border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                width={800}
                height={500}
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4">
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white text-black rounded-full hover:bg-[#FAFAFA] transition-colors"
                  aria-label="View live demo"
                >
                  <ExternalLink size={20} />
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 text-white border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors"
                  aria-label="View GitHub"
                >
                  <Github size={20} />
                </a>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold font-[family-name:var(--font-syne)] mb-2 text-white">
                {project.title}
              </h3>
              <p className="text-[#A3A3A3] mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
