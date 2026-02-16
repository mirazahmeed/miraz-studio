"use client";

import { ProjectsProvider } from "@/context/ProjectsContext";
import { ServicesProvider } from "@/context/ServicesContext";
import { ContentProvider } from "@/context/ContentContext";
import { AuthProvider } from "@/context/AuthContext";
import { NavbarProvider } from "@/context/NavbarContext";
import { FooterProvider } from "@/context/FooterContext";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <NavbarProvider>
        <FooterProvider>
          <ContentProvider>
            <ServicesProvider>
              <ProjectsProvider>{children}</ProjectsProvider>
            </ServicesProvider>
          </ContentProvider>
        </FooterProvider>
      </NavbarProvider>
    </AuthProvider>
  );
}
