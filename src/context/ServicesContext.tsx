"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import servicesData from "@/data/services.json";
import { fetchServices } from "@/lib/api";
import { config } from "@/lib/config";

export interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
  order?: number;
  visible?: boolean;
}

interface ServicesContextType {
  services: Service[];
  loading: boolean;
  error: string | null;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export function ServicesProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadServices() {
      if (config.useApi) {
        try {
          const data = await fetchServices();
          setServices(data);
        } catch (e) {
          setError(e instanceof Error ? e.message : 'Failed to load services');
          setServices(servicesData);
        }
      } else {
        setServices(servicesData);
      }
      setLoading(false);
    }
    loadServices();
  }, []);

  return (
    <ServicesContext.Provider value={{ services, loading, error }}>
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
