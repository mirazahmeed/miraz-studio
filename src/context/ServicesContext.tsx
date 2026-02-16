"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
}

interface ServicesContextType {
  services: Service[];
  addService: (service: Omit<Service, "id">) => void;
  updateService: (id: number, service: Partial<Service>) => void;
  deleteService: (id: number) => void;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

const defaultServices: Service[] = [
  {
    id: 1,
    icon: "Code",
    title: "Frontend Development",
    description: "Building performant, scalable interfaces with React, Next.js, and Tailwind CSS. Modern architecture with component-driven development.",
  },
  {
    id: 2,
    icon: "Globe",
    title: "Full Website Development",
    description: "End-to-end web solutions following modern architecture patterns and industry best practices for maintainability.",
  },
  {
    id: 3,
    icon: "Figma",
    title: "UI/UX Implementation",
    description: "Transforming Figma and Adobe XD designs into pixel-perfect, responsive code with attention to detail.",
  },
  {
    id: 4,
    icon: "Zap",
    title: "Performance Optimization",
    description: "Optimizing Core Web Vitals, reducing bundle sizes, and implementing lazy loading for blazing-fast experiences.",
  },
  {
    id: 5,
    icon: "Shield",
    title: "Basic Web Security",
    description: "Implementing protection against XSS, CSRF, and other common vulnerabilities. Security-aware development practices.",
  },
  {
    id: 6,
    icon: "Rocket",
    title: "Deployment & Hosting",
    description: "Setting up CI/CD pipelines with Git, deploying to Netlify, Vercel, and configuring custom domains.",
  },
];

const STORAGE_KEY = "mirazstudio_services";

export function ServicesProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setServices(JSON.parse(stored));
        } catch {
          setServices(defaultServices);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
    }
  }, [services, mounted]);

  const addService = (service: Omit<Service, "id">) => {
    const newService = {
      ...service,
      id: Math.max(0, ...services.map((s) => s.id)) + 1,
    };
    setServices((prev) => [...prev, newService]);
  };

  const updateService = (id: number, updates: Partial<Service>) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const deleteService = (id: number) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <ServicesContext.Provider
      value={{ services, addService, updateService, deleteService }}
    >
      {children}
    </ServicesContext.Provider>
  );
}

export function useServices() {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error("useServices must be used within a ServicesProvider");
  }
  return context;
}
