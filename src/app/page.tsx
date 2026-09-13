import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsRow } from "@/components/home/StatsRow";
import { StudioStorySection } from "@/components/home/StudioStorySection";
import { FeaturedProjectSection } from "@/components/home/FeaturedProjectSection";
import { WhyWorkWithMe } from "@/components/home/WhyWorkWithMe";
import { VisualBreaker } from "@/components/home/VisualBreaker";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { SelectedWorkSection } from "@/components/home/SelectedWorkSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProofAndTestimonials } from "@/components/home/ProofAndTestimonials";
import { FinalCTA } from "@/components/home/FinalCTA";
import {
  getSiteSettings,
  getFeaturedProjects,
  getPublishedProjects,
  getServices,
  getTestimonials,
} from "@/lib/queries";

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  const [settings, featuredProjects, allProjects, services, testimonials] =
    await Promise.all([
      getSiteSettings(),
      getFeaturedProjects(),
      getPublishedProjects(),
      getServices(),
      getTestimonials(),
    ]);

  const featured = featuredProjects[0] || allProjects[0];

  const stats = [
    {
      label: settings["stat_1_label"] || "PROJECTS DELIVERED",
      value: settings["stat_1_value"] || "24+",
      color: settings["stat_1_color"] || "#2563EB",
    },
    {
      label: settings["stat_2_label"] || "AMBITIOUS CLIENTS",
      value: settings["stat_2_value"] || "18+",
      color: settings["stat_2_color"] || "#EF4444",
    },
    {
      label: settings["stat_3_label"] || "YEARS CRAFTING",
      value: settings["stat_3_value"] || "5+",
      color: settings["stat_3_color"] || "#EAB308",
    },
    {
      label: settings["stat_4_label"] || "TECH ECOSYSTEM",
      value: settings["stat_4_value"] || "20+",
      color: settings["stat_4_color"] || "#10B981",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#111111] selection:bg-[#111111] selection:text-white flex flex-col">
      <Header studioName={settings["studio_name"] || "MIRAZ STUDIO™"} />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          eyebrow={settings["hero_eyebrow"]}
          description={settings["hero_description"]}
        />

        {/* 2. 4-Column Stats Row */}
        <StatsRow stats={stats} />

        {/* 3. Interactive Studio Story / About Section */}
        <StudioStorySection
          label={settings["about_label"] || "About Miraz Studio"}
          statement={settings["about_statement"]}
          bio={settings["about_bio"]}
          email={settings["contact_email"]}
          location={settings["contact_location"]}
        />

        {/* 4. Featured Project Showcase */}
        {featured && (
          <FeaturedProjectSection
            project={featured}
            indexText="FEATURED PROJECT • 01 / 06"
          />
        )}

        {/* 5. Why Work With Me (Principles + Connected Photos) */}
        <WhyWorkWithMe />

        {/* 6. Panoramic Visual Breaker */}
        <VisualBreaker />

        {/* 7. Design Philosophy (Asymmetrical Layout) */}
        <PhilosophySection />

        {/* 8. Selected Work (Database Projects) */}
        <SelectedWorkSection projects={allProjects} />

        {/* 9. Services & Capabilities */}
        <ServicesSection services={services} />

        {/* 10. Proof, Certifications & Testimonials */}
        <ProofAndTestimonials testimonials={testimonials} />

        {/* 11. Final Collaboration CTA */}
        <FinalCTA />
      </main>

      {/* 12. Minimal Studio Footer */}
      <Footer
        studioName={settings["studio_name"]}
        tagline={settings["studio_tagline"]}
        email={settings["contact_email"]}
        location={settings["contact_location"]}
      />
    </div>
  );
}
