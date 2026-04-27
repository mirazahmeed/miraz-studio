"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import contentData from "@/data/content.json";
import { fetchContent } from "@/lib/api";
import { config } from "@/lib/config";

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
  loading: boolean;
  error: string | null;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(contentData as SiteContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadContent() {
      if (config.useApi) {
        try {
          const data = await fetchContent();
          setContent(data);
        } catch (e) {
          setError(e instanceof Error ? e.message : 'Failed to load content');
          setContent(contentData as SiteContent);
        }
      } else {
        setContent(contentData as SiteContent);
      }
      setLoading(false);
    }
    loadContent();
  }, []);

  return (
    <ContentContext.Provider value={{ content, loading, error }}>
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
