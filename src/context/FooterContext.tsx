"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import footerData from "@/data/footer.json";

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
}

const FooterContext = createContext<FooterContextType | undefined>(undefined);

export function FooterProvider({ children }: { children: ReactNode }) {
  const [config] = useState<FooterConfig>(footerData as FooterConfig);

  return (
    <FooterContext.Provider value={{ config }}>
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
