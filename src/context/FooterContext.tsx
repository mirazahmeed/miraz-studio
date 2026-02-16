"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
  updateConfig: (updates: Partial<FooterConfig>) => void;
  updateSocialLink: (id: string, updates: Partial<SocialLink>) => void;
  addSocialLink: (link: Omit<SocialLink, "id">) => void;
  removeSocialLink: (id: string) => void;
}

const defaultConfig: FooterConfig = {
  logo: {
    text: "MIRAZ",
    highlight: "STUDIO",
    description: "A modern digital studio focused on designing and building scalable, user-centered web applications with clean architecture and thoughtful UI/UX.",
  },
  quickLinks: {
    visible: true,
  },
  socialLinks: [
    { id: "github", name: "GitHub", href: "#", icon: "Github", visible: true },
    { id: "linkedin", name: "LinkedIn", href: "#", icon: "Linkedin", visible: true },
    { id: "twitter", name: "Twitter", href: "#", icon: "Twitter", visible: true },
    { id: "instagram", name: "Instagram", href: "#", icon: "Instagram", visible: true },
  ],
  copyright: {
    text: "All rights reserved.",
    showYear: true,
  },
  legalLinks: {
    privacy: { visible: true, text: "Privacy Policy" },
    terms: { visible: true, text: "Terms of Service" },
  },
};

const FOOTER_CONFIG_KEY = "mirazstudio_footer_config";

const FooterContext = createContext<FooterContextType | undefined>(undefined);

export function FooterProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<FooterConfig>(defaultConfig);

  useEffect(() => {
    const stored = localStorage.getItem(FOOTER_CONFIG_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setConfig({ ...defaultConfig, ...parsed });
      } catch {
        setConfig(defaultConfig);
      }
    }
  }, []);

  const saveConfig = (newConfig: FooterConfig) => {
    setConfig(newConfig);
    localStorage.setItem(FOOTER_CONFIG_KEY, JSON.stringify(newConfig));
  };

  const updateConfig = (updates: Partial<FooterConfig>) => {
    saveConfig({ ...config, ...updates });
  };

  const updateSocialLink = (id: string, updates: Partial<SocialLink>) => {
    const newLinks = config.socialLinks.map((link) =>
      link.id === id ? { ...link, ...updates } : link
    );
    saveConfig({ ...config, socialLinks: newLinks });
  };

  const addSocialLink = (link: Omit<SocialLink, "id">) => {
    const newLink: SocialLink = {
      ...link,
      id: `social_${Date.now()}`,
    };
    saveConfig({ ...config, socialLinks: [...config.socialLinks, newLink] });
  };

  const removeSocialLink = (id: string) => {
    saveConfig({ ...config, socialLinks: config.socialLinks.filter((link) => link.id !== id) });
  };

  return (
    <FooterContext.Provider
      value={{ config, updateConfig, updateSocialLink, addSocialLink, removeSocialLink }}
    >
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
