"use client";

import { motion } from "framer-motion";
import { Code, Globe, Figma, Zap, Shield, Rocket, Mail, Phone, MapPin, Palette, Database, Cloud } from "lucide-react";
import Section, { SectionHeader } from "../ui/Section";
import { useServices } from "@/context/ServicesContext";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  Globe,
  Figma,
  Zap,
  Shield,
  Rocket,
  Mail,
  Phone,
  MapPin,
  Palette,
  Database,
  Cloud,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function Services() {
  const { services } = useServices();

  return (
    <Section id="services" className="bg-[#0A0A0A]">
      <SectionHeader
        title="Our Services"
        subtitle="What We Do"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.map((service) => {
          const Icon = iconMap[service.icon] || Code;
          return (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className="group p-8 bg-[#141414] border border-white/5 rounded-2xl hover:border-white/20 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors duration-500">
                <Icon className="w-6 h-6 text-white/60 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-semibold font-[family-name:var(--font-syne)] mb-3 text-white">
                {service.title}
              </h3>
              <p className="text-[#A3A3A3] leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
