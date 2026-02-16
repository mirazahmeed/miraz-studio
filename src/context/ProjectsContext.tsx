"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: number, project: Partial<Project>) => void;
  deleteProject: (id: number) => void;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

const defaultProjects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform with seamless shopping experience, real-time inventory management, and secure payment integration.",
    techStack: ["Next.js", "React", "Tailwind CSS", "Stripe"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    liveDemo: "https://example.com",
    github: "https://github.com",
  },
  {
    id: 2,
    title: "SaaS Dashboard",
    description: "Analytics dashboard with data visualization, user management, and real-time updates using WebSockets.",
    techStack: ["Next.js", "TypeScript", "Framer Motion", "Recharts"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    liveDemo: "https://example.com",
    github: "https://github.com",
  },
  {
    id: 3,
    title: "Portfolio Generator",
    description: "A creative tool that allows users to build stunning portfolios with customizable themes and export options.",
    techStack: ["React", "Node.js", "MongoDB", "AWS S3"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    liveDemo: "https://example.com",
    github: "https://github.com",
  },
  {
    id: 4,
    title: "Task Management App",
    description: "Collaborative project management tool with real-time updates, drag-and-drop kanban boards, and team features.",
    techStack: ["Next.js", "Prisma", "PostgreSQL", "Clerk"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    liveDemo: "https://example.com",
    github: "https://github.com",
  },
];

const STORAGE_KEY = "mirazstudio_projects";

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setProjects(JSON.parse(stored));
        } catch {
          setProjects(defaultProjects);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    }
  }, [projects, mounted]);

  const addProject = (project: Omit<Project, "id">) => {
    const newProject = {
      ...project,
      id: Math.max(0, ...projects.map((p) => p.id)) + 1,
    };
    setProjects((prev) => [...prev, newProject]);
  };

  const updateProject = (id: number, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProject = (id: number) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProjectsContext.Provider
      value={{ projects, addProject, updateProject, deleteProject }}
    >
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
