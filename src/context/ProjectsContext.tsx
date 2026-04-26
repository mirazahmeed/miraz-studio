"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import projectsData from "@/data/projects.json";

export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  liveDemo: string;
  github: string;
}

interface ProjectsContextType {
  projects: Project[];
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects] = useState<Project[]>(projectsData);

  return (
    <ProjectsContext.Provider value={{ projects }}>
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
