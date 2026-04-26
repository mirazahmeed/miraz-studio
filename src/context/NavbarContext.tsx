"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import navbarData from "@/data/navbar.json";

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
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [config] = useState<NavbarConfig>(navbarData as NavbarConfig);

  return (
    <NavbarContext.Provider value={{ config }}>
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
