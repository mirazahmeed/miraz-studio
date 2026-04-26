"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import contentData from "@/data/content.json";

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
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content] = useState<SiteContent>(contentData as SiteContent);

  return (
    <ContentContext.Provider value={{ content }}>
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
