"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface SiteContent {
  hero: {
    tagline: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    subtitle: string;
    title: string;
    highlightTitle: string;
    paragraphs: string[];
    stats: { value: string; label: string }[];
    skills: string[];
  };
  contact: {
    title: string;
    subtitle: string;
    description: string;
    info: { label: string; value: string }[];
  };
}

interface ContentContextType {
  content: SiteContent;
  updateContent: (section: keyof SiteContent, data: Partial<SiteContent[keyof SiteContent]>) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const defaultContent: SiteContent = {
  hero: {
    tagline: "Digital Product & Web Development Studio",
    titleLine1: "We Build",
    titleLine2: "Digital",
    titleLine3: "Experiences",
    subtitle: "MIRAZSTUDIO is a modern digital studio focused on designing and building scalable, user-centered web applications with clean architecture and thoughtful UI/UX.",
    ctaPrimary: "View Projects",
    ctaSecondary: "Contact Us",
  },
  about: {
    subtitle: "About Us",
    title: "Crafting Premium",
    highlightTitle: "Digital Solutions",
    paragraphs: [
      "MIRAZSTUDIO is a modern digital studio focused on designing and building scalable, user-centered web applications.",
      "We believe in the power of clean architecture, where every line of code serves a purpose. Our approach combines technical excellence with creative innovation to deliver products that not only work flawlessly but also provide exceptional user experiences.",
      "From performance optimization to thoughtful UI/UX design, we handle every aspect of your digital presence with meticulous attention to detail.",
    ],
    stats: [
      { value: "5+", label: "Years Experience" },
      { value: "50+", label: "Projects Delivered" },
      { value: "30+", label: "Happy Clients" },
    ],
    skills: ["React", "Next.js", "TypeScript", "Node.js", "UI/UX"],
  },
  contact: {
    title: "Get In Touch",
    subtitle: "Contact Us",
    description: "Have a project in mind? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    info: [
      { label: "Email", value: "hello@mirazstudio.com" },
      { label: "Phone", value: "+1 (555) 123-4567" },
      { label: "Location", value: "San Francisco, CA" },
    ],
  },
};

const STORAGE_KEY = "mirazstudio_content";

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setContent(JSON.parse(stored));
        } catch {
          setContent(defaultContent);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    }
  }, [content, mounted]);

  const updateContent = (section: keyof SiteContent, data: Partial<SiteContent[keyof SiteContent]>) => {
    setContent((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  return (
    <ContentContext.Provider value={{ content, updateContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
}
