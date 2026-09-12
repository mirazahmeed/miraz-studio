import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding fresh database...");

  // 1. Clear existing data
  await prisma.projectGallery.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.testimonial.deleteMany({});
  await prisma.siteSetting.deleteMany({});
  await prisma.contactMessage.deleteMany({});
  await prisma.adminUser.deleteMany({});

  // 2. Create Admin User
  const passwordHash = await bcrypt.hash("Zero00Zero", 10);
  await prisma.adminUser.create({
    data: {
      email: "admin@miraz.studio",
      name: "Miraz Ahmed",
      passwordHash,
      role: "admin",
    },
  });
  console.log("Admin user created: admin@miraz.studio / Zero00Zero");

  // 3. Site Settings
  const settings = [
    { key: "studio_name", value: "MIRAZ STUDIO™" },
    { key: "studio_tagline", value: "DESIGNING AND BUILDING DIGITAL EXPERIENCES WITH INTENTION." },
    { key: "hero_eyebrow", value: "INDEPENDENT DIGITAL PRODUCT & CREATIVE ENGINEERING STUDIO" },
    {
      key: "hero_title",
      value: "AT MIRAZ STUDIO, WE BRING PASSION AND PURPOSE TO EVERYTHING WE BUILD — FROM SCALABLE WEB PRODUCTS THAT MAKE ROOM FOR BOLD IDEAS TO EDITORIAL INTERFACES AND BESPOKE SYSTEMS THAT HELP AMBITIOUS TEAMS GROW.",
    },
    {
      key: "hero_description",
      value: "Operating at the intersection of architectural discipline and technical precision. We partner with founders, brands, and creative leaders to engineer digital products that perform undeniably in production.",
    },
    { key: "hero_cta_text", value: "EXPLORE WORK" },
    { key: "hero_cta_secondary", value: "GET IN TOUCH" },
    { key: "stat_1_label", value: "PROJECTS DELIVERED" },
    { key: "stat_1_value", value: "24+" },
    { key: "stat_1_color", value: "#3B82F6" }, // Blue
    { key: "stat_2_label", value: "AMBITIOUS CLIENTS" },
    { key: "stat_2_value", value: "18+" },
    { key: "stat_2_color", value: "#EF4444" }, // Red
    { key: "stat_3_label", value: "YEARS CRAFTING" },
    { key: "stat_3_value", value: "5+" },
    { key: "stat_3_color", value: "#EAB308" }, // Amber
    { key: "stat_4_label", value: "STACK & TOOLS" },
    { key: "stat_4_value", value: "20+" },
    { key: "stat_4_color", value: "#10B981" }, // Emerald
    { key: "about_label", value: "01 / INTRODUCTION" },
    {
      key: "about_statement",
      value: "WE DON'T JUST MAKE WEBSITES. WE BUILD DIGITAL PRODUCTS PEOPLE REMEMBER.",
    },
    {
      key: "about_bio",
      value: "Miraz Studio is an independent creative engineering practice founded by Miraz Ahmed. We specialize in bespoke digital products, high-performance web applications, and architectural design systems. By bridging rigorous aesthetics with full-stack engineering, we build products that solve real business problems without sacrificing an ounce of visual sophistication.",
    },
    { key: "contact_email", value: "hello@miraz.studio" },
    { key: "contact_location", value: "DHAKA / AVAILABLE GLOBALLY" },
    { key: "contact_availability", value: "ACCEPTING SELECT PROJECTS FOR Q2/Q3 2026" },
    { key: "social_github", value: "https://github.com/mirazahmed" },
    { key: "social_linkedin", value: "https://linkedin.com/in/mirazahmed" },
    { key: "social_x", value: "https://x.com/mirazahmed" },
  ];

  for (const s of settings) {
    await prisma.siteSetting.create({ data: s });
  }

  // 4. Create Projects
  const p1 = await prisma.project.create({
    data: {
      title: "NEXUS PLATFORM",
      slug: "nexus-platform",
      subtitle: "Next-generation workspace for high-velocity engineering and product teams.",
      excerpt: "Architectural web application delivering sub-50ms data interactions and intuitive canvas collaboration.",
      description: "Nexus is a flagship digital product designed to harmonize complex technical workflows into a calm, typography-first interface. Built using Next.js Server Components, real-time Supabase subscriptions, and custom WebGL telemetry visualizers.",
      year: "2026",
      client: "Nexus Systems Inc",
      type: "DIGITAL PRODUCT",
      role: "DESIGN / FULL-STACK DEVELOPMENT / STRATEGY",
      duration: "4 MONTHS",
      status: "PUBLISHED",
      featured: true,
      sortOrder: 1,
      category: "WEB APPS",
      heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85",
      technologies: JSON.stringify(["NEXT.JS 15", "TYPESCRIPT", "TAILWIND CSS", "SUPABASE", "POSTGRESQL", "FRAMER MOTION"]),
      specifications: JSON.stringify({
        architecture: "Next.js App Router & Server Actions",
        database: "PostgreSQL with Row Level Security",
        realtime: "Supabase Realtime Broadcasts",
        typography: "Custom Editorial Grotesk",
        lighthouse: "99 Performance / 100 SEO",
        outcome: "+48% Task Completion Rate",
      }),
      challenge: "Enterprise software frequently prioritizes utility over visual ergonomics, resulting in bloated, cognitive-heavy interfaces that slow developers down. Nexus required zero-compromise performance under massive concurrent data streams, while feeling as serene as an architectural blueprint.",
      approach: "We stripped away decorative chrome, replacing cards and shadows with a structural 12-column grid and 1px hairline rules. Every interactive state relies on micro-motion and typographic contrast, guiding the user's eye naturally without visual noise.",
      solution: "Engineered a custom virtualized grid engine capable of rendering 10,000+ data nodes with 60fps fluidity. Combined with edge-cached server components and an aggressive optimistic UI pipeline, user interactions register virtually instantaneously.",
      process: "From initial low-fidelity architectural sketches to interactive Figma prototypes and direct production code in React and Next.js. We conducted 14 usability benchmarks with principal engineers to refine keyboard shortcuts and layout hierarchy.",
      results: "Adopted by 3 enterprise pilot teams within the first month of deployment. Average user workflow latency dropped by 38%, and system load time decreased from 2.8s to 420ms.",
      learnings: "Minimalism is not the lack of elements—it is the highest concentration of intentionality. Restricting the palette to monochrome with selective functional accents dramatically increased user focus.",
      liveUrl: "https://nexus-preview.miraz.studio",
      githubUrl: "https://github.com/mirazahmed/nexus-platform",
      figmaUrl: "https://figma.com/@miraz/nexus-system",
      caseStudyUrl: "https://miraz.studio/work/nexus-platform",
      gallery: {
        create: [
          {
            imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
            caption: "Architectural spatial layout showcasing minimalist workspace controls",
            alt: "Nexus interface layout",
            sortOrder: 1,
          },
          {
            imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
            caption: "Clean typographic specifications and high-density telemetry viewport",
            alt: "Nexus telemetry screen",
            sortOrder: 2,
          },
          {
            imageUrl: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
            caption: "Refined dark mode detail and contextual action drawers",
            alt: "Nexus drawer preview",
            sortOrder: 3,
          },
        ],
      },
    },
  });

  const p2 = await prisma.project.create({
    data: {
      title: "FORGE DESIGN SYSTEM",
      slug: "forge-design-system",
      subtitle: "Multi-brand UI foundation and tokenized architectural framework.",
      excerpt: "Complete design system and accessible component infrastructure powering 12 discrete web applications.",
      description: "Forge is a comprehensive enterprise design system crafted for rapid scalability. Spanning over 80 production-grade components, automated token synchronization from Figma to code, and WCAG AAA compliance.",
      year: "2026",
      client: "Forge Global Architecture",
      type: "DESIGN SYSTEM",
      role: "ART DIRECTION / DESIGN SYSTEMS / FRONTEND",
      duration: "3 MONTHS",
      status: "PUBLISHED",
      featured: true,
      sortOrder: 2,
      category: "UI/UX",
      heroImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=85",
      technologies: JSON.stringify(["TYPESCRIPT", "REACT", "TAILWIND CSS", "RADIX UI", "STORYBOOK", "FIGMA TOKENS"]),
      specifications: JSON.stringify({
        components: "84 Fully Documented Primitives",
        accessibility: "WCAG AAA Certified",
        coverage: "100% TypeScript Strict",
        adoption: "12 Engineering Teams",
        reduction: "-65% Design Debt",
      }),
      challenge: "The client suffered from fragmented brand identities across multiple acquired software platforms, causing inconsistent customer experiences and redundant development overhead.",
      approach: "Established a unified mathematical spacing scale, modular type ramp, and semantic CSS variable architecture that allows themes to change dynamically without breaking layouts.",
      solution: "Engineered an open-source-ready component library published via private npm registry with automated visual regression tests and comprehensive interactive documentation.",
      process: "Audited over 200 existing screens, consolidated duplicate patterns, formalized 12 fundamental primitives, and established automated CI/CD token pipelines.",
      results: "Cut front-end feature delivery time by 45% across all 12 teams while establishing unified aesthetic coherence.",
      learnings: "Design systems succeed when they embrace constraints and prioritize developer ergonomics as fiercely as visual polish.",
      liveUrl: "https://forge-ds.miraz.studio",
      githubUrl: "https://github.com/mirazahmed/forge-design-system",
      figmaUrl: "https://figma.com/@miraz/forge-tokens",
      caseStudyUrl: "https://miraz.studio/work/forge-design-system",
      gallery: {
        create: [
          {
            imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
            caption: "Tokenized typography hierarchy and modular spacing matrix",
            alt: "Forge design system matrix",
            sortOrder: 1,
          },
        ],
      },
    },
  });

  const p3 = await prisma.project.create({
    data: {
      title: "SYNAPSE AI ENGINE",
      slug: "synapse-ai-engine",
      subtitle: "Autonomous workflow orchestration and multi-agent synthesis platform.",
      excerpt: "Full-stack intelligent orchestration platform executing distributed background automations with human-in-the-loop controls.",
      description: "Synapse enables product teams to compose, deploy, and inspect complex AI agents visually. Featuring streaming event logs, deterministic fallback paths, and end-to-end telemetry monitoring.",
      year: "2026",
      client: "Synapse Intelligence Labs",
      type: "AI AUTOMATION",
      role: "FULL-STACK DEVELOPMENT / AI INTEGRATION / UI/UX",
      duration: "5 MONTHS",
      status: "PUBLISHED",
      featured: true,
      sortOrder: 3,
      category: "AUTOMATION",
      heroImage: "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1800&q=85",
      technologies: JSON.stringify(["NEXT.JS 15", "PYTHON", "N8N", "OPENAI", "SUPABASE", "REDIS"]),
      specifications: JSON.stringify({
        latency: "120ms Pipeline Overhead",
        throughput: "50,000 Events / Day",
        reliability: "99.98% Execution Success",
        models: "Multi-model fallback (Claude / GPT-4o)",
      }),
      challenge: "AI automations are notoriously opaque; when a pipeline fails, finding the root cause in unstructured agent transcripts is excruciating.",
      approach: "Designed a clean temporal scrubber interface that lets operators rewind, inspect token states, and intervene manually at any step of an autonomous execution.",
      solution: "Constructed an event-driven architecture with PostgreSQL change data capture (CDC), Redis queues, and a reactive Next.js dashboard.",
      results: "Automated 85% of tier-1 customer data verification flows without a single undetected hallucination.",
      liveUrl: "https://synapse.miraz.studio",
      githubUrl: "https://github.com/mirazahmed/synapse-ai-engine",
      gallery: {
        create: [
          {
            imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80",
            caption: "Visual graph inspection interface for autonomous execution runs",
            alt: "Synapse graph screen",
            sortOrder: 1,
          },
        ],
      },
    },
  });

  const p4 = await prisma.project.create({
    data: {
      title: "AURA ATELIER",
      slug: "aura-atelier",
      subtitle: "Spatial editorial experience for an international architectural studio.",
      excerpt: "Minimalist, typography-led digital portfolio featuring custom WebGL architectural canvas transitions.",
      description: "Aura Atelier is an award-winning digital monograph created for a contemporary architecture practice. Emphasizing massive architectural crops, silent smooth scrolling, and strict asymmetric rhythm.",
      year: "2025",
      client: "Aura Architecture Group",
      type: "WEBSITES",
      role: "CREATIVE DIRECTION / FRONTEND ENGINEERING",
      duration: "2 MONTHS",
      status: "PUBLISHED",
      featured: false,
      sortOrder: 4,
      category: "WEBSITES",
      heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85",
      technologies: JSON.stringify(["NEXT.JS", "THREE.JS", "TAILWIND CSS", "LENIS SCROLL", "FRAMER MOTION"]),
      specifications: JSON.stringify({
        fps: "Rock solid 60fps animation",
        seo: "100 Lighthouse Performance",
        award: "Featured on Mindsparkle Mag",
      }),
      challenge: "Capturing the tactile monumentality of physical stone and glass architecture inside a browser window without heavy loading screens.",
      approach: "Leveraged pre-compressed modern WebP assets, fluid clamp() typography, and progressive image hydration.",
      solution: "Created an asymmetric split-screen layout that feels like turning the pages of an oversized hardcover architectural monograph.",
      results: "+220% inquiry conversion rate from premium commercial property developers.",
      liveUrl: "https://aura.miraz.studio",
      caseStudyUrl: "https://miraz.studio/work/aura-atelier",
    },
  });

  const p5 = await prisma.project.create({
    data: {
      title: "KINETIC CAPITAL",
      slug: "kinetic-capital",
      subtitle: "Institutional quantitative analytics and asset allocation terminal.",
      excerpt: "Zero-latency financial dashboard visualizing real-time market liquidity and risk exposure.",
      description: "A secure, desktop-first web application designed for quantitative traders. Provides configurable multi-monitor viewports, custom keyboard macro navigation, and sub-millisecond chart re-renders.",
      year: "2025",
      client: "Kinetic Fund Management",
      type: "SAAS",
      role: "PRODUCT DESIGN / FULL-STACK ENGINEERING",
      duration: "4 MONTHS",
      status: "PUBLISHED",
      featured: false,
      sortOrder: 5,
      category: "SAAS",
      heroImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1800&q=85",
      technologies: JSON.stringify(["TYPESCRIPT", "REACT", "WEBSOCKETS", "CANVAS API", "POSTGRESQL"]),
      specifications: JSON.stringify({
        dataRate: "10,000 Ticks / Sec",
        charts: "Custom Canvas2D Pipeline",
        security: "Role-Based Hardware Key Auth",
      }),
      liveUrl: "https://kinetic.miraz.studio",
    },
  });

  const p6 = await prisma.project.create({
    data: {
      title: "CHROMA MONOGRAPH",
      slug: "chroma-monograph",
      subtitle: "Generative typography and algorithmic layout experiments.",
      excerpt: "Open-source computational design laboratory exploring kinetic editorial layouts and math-driven grids.",
      description: "An ongoing creative coding exploration interrogating how computational algorithms can inform traditional Swiss typographical principles in digital space.",
      year: "2025",
      client: "Self-Initiated / Open Source",
      type: "EXPERIMENTS",
      role: "RESEARCH / CREATIVE CODING",
      duration: "ONGOING",
      status: "PUBLISHED",
      featured: false,
      sortOrder: 6,
      category: "EXPERIMENTS",
      heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=85",
      technologies: JSON.stringify(["TYPESCRIPT", "WEBGL", "GLSL", "CANVAS API", "SVG"]),
      githubUrl: "https://github.com/mirazahmed/chroma-monograph",
      liveUrl: "https://chroma.miraz.studio",
    },
  });

  // 5. Create Services
  const servicesData = [
    {
      number: "01",
      title: "DIGITAL PRODUCT ENGINEERING",
      description: "From concept to scalable production code. We architect web applications, SaaS platforms, and bespoke internal tools engineered with Next.js, TypeScript, and high-performance databases.",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      technologies: JSON.stringify(["NEXT.JS", "TYPESCRIPT", "POSTGRESQL", "SERVER ACTIONS", "SUPABASE"]),
      sortOrder: 1,
    },
    {
      number: "02",
      title: "ARCHITECTURAL UI/UX & DESIGN SYSTEMS",
      description: "We craft quiet, high-density interfaces rooted in Swiss typography, asymmetric grids, and meticulous design tokens that scale harmoniously across enterprise software suites.",
      imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      technologies: JSON.stringify(["DESIGN TOKENS", "FIGMA", "TAILWIND CSS", "RADIX UI", "ACCESSIBILITY"]),
      sortOrder: 2,
    },
    {
      number: "03",
      title: "AI WORKFLOWS & AUTOMATION",
      description: "Intelligent autonomous pipeline design. We integrate LLM orchestration, structured document extraction, and custom webhook engines that turn manual operational friction into automated precision.",
      imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=800&q=80",
      technologies: JSON.stringify(["OPENAI", "CLAUDE", "N8N", "PYTHON", "VECTOR SEARCH", "API INTEGRATION"]),
      sortOrder: 3,
    },
    {
      number: "04",
      title: "HIGH-END EDITORIAL WEB EXPERIENCES",
      description: "Bespoke digital monographs for architecture studios, high-growth startups, and creative brands demanding uncompromised art direction and sub-second load times.",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      technologies: JSON.stringify(["NEXT.JS 15", "FRAMER MOTION", "LENIS SCROLL", "SEO OPTIMIZATION"]),
      sortOrder: 4,
    },
    {
      number: "05",
      title: "TECHNICAL ARCHITECTURE & AUDITS",
      description: "Rigorous code reviews, performance bottleneck diagnosis, and database schema modernization. We evaluate existing codebases to establish clarity, security, and scalability.",
      imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
      technologies: JSON.stringify(["LIGHTHOUSE 100", "CORE WEB VITALS", "POSTGRESQL TUNING", "SECURITY"]),
      sortOrder: 5,
    },
  ];

  for (const s of servicesData) {
    await prisma.service.create({ data: s });
  }

  // 6. Create Testimonials
  const testimonialsData = [
    {
      name: "Marcus Vance",
      role: "VP of Product Engineering",
      company: "Nexus Systems",
      quote: "Working with Miraz felt less like hiring an external contractor and more like embedding a principal product engineer who also possesses world-class taste. He took our complex telemetry requirements and delivered an interface that is both blazing fast and stunningly elegant.",
      sortOrder: 1,
    },
    {
      name: "Elena Rostova",
      role: "Creative Director",
      company: "Aura Atelier",
      quote: "The visual discipline and typographic precision Miraz brought to our studio monograph exceeded our expectations. He understands negative space, proportional rhythm, and architectural weight like few developers in the world do.",
      sortOrder: 2,
    },
    {
      name: "David Chen",
      role: "Founder & CEO",
      company: "Synapse Labs",
      quote: "Miraz bridged the gap between our complex AI agent pipelines and an intuitive, calm visual interface. His ability to move from high-level architecture down to 1px alignment is truly rare.",
      sortOrder: 3,
    },
  ];

  for (const t of testimonialsData) {
    await prisma.testimonial.create({ data: t });
  }

  console.log("Database seeded successfully with projects, services, testimonials, and settings!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
