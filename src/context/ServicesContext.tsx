"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import servicesData from "@/data/services.json";

export interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
}

interface ServicesContextType {
  services: Service[];
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export function ServicesProvider({ children }: { children: ReactNode }) {
  const [services] = useState<Service[]>(servicesData);

  return (
    <ServicesContext.Provider value={{ services }}>
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
