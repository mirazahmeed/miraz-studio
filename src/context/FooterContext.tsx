"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import footerData from "@/data/footer.json";
import { fetchContent } from "@/lib/api";
import { config as appConfig } from "@/lib/config";

export interface SocialLink {
  id: string;
  name: string;
  href: string;
  icon: string;
  visible: boolean;
}

export interface FooterConfig {
  logo: {
    text: string;
    highlight: string;
    description: string;
  };
  quickLinks: {
    visible: boolean;
  };
  socialLinks: SocialLink[];
  copyright: {
    text: string;
    showYear: boolean;
  };
  legalLinks: {
    privacy: { visible: boolean; text: string };
    terms: { visible: boolean; text: string };
  };
}

interface FooterContextType {
  config: FooterConfig;
  loading: boolean;
}

const FooterContext = createContext<FooterContextType | undefined>(undefined);

export function FooterProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<FooterConfig>(footerData as FooterConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFooter() {
      if (appConfig.useApi) {
        try {
          const data = await fetchContent();
          if (data.footer) {
            setConfig(data.footer);
          }
        } catch {
          // Fallback to static data
        }
      }
      setLoading(false);
    }
    loadFooter();
  }, [appConfig.useApi]);

  return (
    <FooterContext.Provider value={{ config, loading }}>
      {children}
    </FooterContext.Provider>
  );
}

export function useFooter() {
  const context = useContext(FooterContext);
  if (!context) {
    throw new Error("useFooter must be used within a FooterProvider");
  }
  return context;
}