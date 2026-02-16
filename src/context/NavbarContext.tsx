"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
  updateConfig: (updates: Partial<NavbarConfig>) => void;
  updateItem: (id: string, updates: Partial<NavItem>) => void;
  addItem: (item: Omit<NavItem, "id" | "order">) => void;
  removeItem: (id: string) => void;
  reorderItems: (items: NavItem[]) => void;
}

const defaultConfig: NavbarConfig = {
  logo: {
    text: "MIRAZ",
    highlight: "STUDIO",
  },
  cta: {
    text: "Let's Talk",
    visible: true,
  },
  items: [
    { id: "about", name: "About", href: "#about", visible: true, order: 1 },
    { id: "services", name: "Services", href: "#services", visible: true, order: 2 },
    { id: "projects", name: "Projects", href: "#projects", visible: true, order: 3 },
    { id: "contact", name: "Contact", href: "#contact", visible: true, order: 4 },
  ],
  mobileMenu: {
    enabled: true,
  },
};

const NAVBAR_CONFIG_KEY = "mirazstudio_navbar_config";

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<NavbarConfig>(defaultConfig);

  useEffect(() => {
    const stored = localStorage.getItem(NAVBAR_CONFIG_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setConfig({ ...defaultConfig, ...parsed });
      } catch {
        setConfig(defaultConfig);
      }
    }
  }, []);

  const saveConfig = (newConfig: NavbarConfig) => {
    setConfig(newConfig);
    localStorage.setItem(NAVBAR_CONFIG_KEY, JSON.stringify(newConfig));
  };

  const updateConfig = (updates: Partial<NavbarConfig>) => {
    saveConfig({ ...config, ...updates });
  };

  const updateItem = (id: string, updates: Partial<NavItem>) => {
    const newItems = config.items.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
    saveConfig({ ...config, items: newItems });
  };

  const addItem = (item: Omit<NavItem, "id" | "order">) => {
    const newItem: NavItem = {
      ...item,
      id: `nav_${Date.now()}`,
      order: config.items.length + 1,
    };
    saveConfig({ ...config, items: [...config.items, newItem] });
  };

  const removeItem = (id: string) => {
    const newItems = config.items
      .filter((item) => item.id !== id)
      .map((item, index) => ({ ...item, order: index + 1 }));
    saveConfig({ ...config, items: newItems });
  };

  const reorderItems = (items: NavItem[]) => {
    const reordered = items.map((item, index) => ({ ...item, order: index + 1 }));
    saveConfig({ ...config, items: reordered });
  };

  return (
    <NavbarContext.Provider
      value={{ config, updateConfig, updateItem, addItem, removeItem, reorderItems }}
    >
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
