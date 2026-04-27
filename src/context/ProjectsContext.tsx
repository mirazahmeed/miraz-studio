"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import projectsData from "@/data/projects.json";
import { fetchProjects } from "@/lib/api";
import { config } from "@/lib/config";

export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  liveDemo?: string;
  github?: string;
  order?: number;
  visible?: boolean;
}

interface ProjectsContextType {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      if (config.useApi) {
        try {
          const data = await fetchProjects();
          setProjects(data);
        } catch (e) {
          setError(e instanceof Error ? e.message : 'Failed to load projects');
          setProjects(projectsData);
        }
      } else {
        setProjects(projectsData);
      }
      setLoading(false);
    }
    loadProjects();
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, loading, error }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
}
