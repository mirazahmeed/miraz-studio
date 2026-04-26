"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import navbarData from "@/data/navbar.json";
import { fetchContent } from "@/lib/api";
import { config as appConfig } from "@/lib/config";

export interface NavItem {
  id: string;
  name: string;
  href: string;
  visible: boolean;
  order: number;
}

export interface NavbarConfig {
  logo: {
    text: string;
    highlight: string;
  };
  cta: {
    text: string;
    visible: boolean;
  };
  items: NavItem[];
  mobileMenu: {
    enabled: boolean;
  };
}

interface NavbarContextType {
  config: NavbarConfig;
  loading: boolean;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<NavbarConfig>(navbarData as NavbarConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNavbar() {
      if (appConfig.useApi) {
        try {
          const data = await fetchContent();
          if (data.navbar) {
            setConfig(data.navbar);
          }
        } catch {
          // Fallback to static data
        }
      }
      setLoading(false);
    }
    loadNavbar();
  }, [appConfig.useApi]);

  return (
    <NavbarContext.Provider value={{ config, loading }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
}
