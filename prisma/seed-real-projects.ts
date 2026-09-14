import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Upserting real projects: FEXION, ROSELYRA...");

  // 1. FEXION (Web Design & Development / E-commerce)
  await prisma.project.upsert({
    where: { slug: "fexion" },
    update: {
      title: "FEXION",
      subtitle: "High-performance contemporary fashion & apparel e-commerce storefront",
      excerpt: "Conversion-focused fashion storefront engineered with fluid shopping journeys, curated collections, and sub-second page transitions.",
      description: "Fexion is an editorial fashion and apparel e-commerce platform designed to balance high-end visual brand expression with aggressive conversion performance. Built using Next.js, fluid filter matrices, and instantaneous checkout flows.",
      year: "2026",
      client: "Fexion Apparel",
      type: "E-COMMERCE & WEB PLATFORM",
      role: "WEB DESIGN & DEVELOPMENT",
      duration: "2 MONTHS",
      status: "PUBLISHED",
      featured: true,
      sortOrder: 1,
      category: "WEBSITES",
      heroImage: "/projects/fexion.png",
      technologies: JSON.stringify(["NEXT.JS 15", "TYPESCRIPT", "TAILWIND CSS", "SHOPIFY / STRIPE", "FRAMER MOTION"]),
      specifications: JSON.stringify({
        architecture: "Next.js App Router & Edge Cache",
        checkout: "Sub-second 1-Click Checkout Flow",
        speed: "99 Performance / 0.4s LCP",
        catalog: "Curated Multi-Category Collections",
        conversion: "+34% Mobile Cart Completion",
      }),
      challenge: "Fashion e-commerce frequently suffers from heavy assets and slow multi-step filters that degrade mobile purchasing velocity.",
      approach: "Implemented optimistic client-side filtering, lightweight responsive image delivery, and modular lookbook layouts that let products shine.",
      solution: "A clean, modern storefront pairing bold typography with intuitive catalog ergonomics and frictionless bag drawer interactions.",
      liveUrl: "https://fexion.com",
      caseStudyUrl: "/work/fexion",
    },
    create: {
      title: "FEXION",
      slug: "fexion",
      subtitle: "High-performance contemporary fashion & apparel e-commerce storefront",
      excerpt: "Conversion-focused fashion storefront engineered with fluid shopping journeys, curated collections, and sub-second page transitions.",
      description: "Fexion is an editorial fashion and apparel e-commerce platform designed to balance high-end visual brand expression with aggressive conversion performance. Built using Next.js, fluid filter matrices, and instantaneous checkout flows.",
      year: "2026",
      client: "Fexion Apparel",
      type: "E-COMMERCE & WEB PLATFORM",
      role: "WEB DESIGN & DEVELOPMENT",
      duration: "2 MONTHS",
      status: "PUBLISHED",
      featured: true,
      sortOrder: 1,
      category: "WEBSITES",
      heroImage: "/projects/fexion.png",
      technologies: JSON.stringify(["NEXT.JS 15", "TYPESCRIPT", "TAILWIND CSS", "SHOPIFY / STRIPE", "FRAMER MOTION"]),
      specifications: JSON.stringify({
        architecture: "Next.js App Router & Edge Cache",
        checkout: "Sub-second 1-Click Checkout Flow",
        speed: "99 Performance / 0.4s LCP",
        catalog: "Curated Multi-Category Collections",
        conversion: "+34% Mobile Cart Completion",
      }),
      challenge: "Fashion e-commerce frequently suffers from heavy assets and slow multi-step filters that degrade mobile purchasing velocity.",
      approach: "Implemented optimistic client-side filtering, lightweight responsive image delivery, and modular lookbook layouts that let products shine.",
      solution: "A clean, modern storefront pairing bold typography with intuitive catalog ergonomics and frictionless bag drawer interactions.",
      liveUrl: "https://fexion.com",
      caseStudyUrl: "/work/fexion",
    },
  });

  // 2. ROSELYRA (UI/UX & Product Design / Editorial E-commerce)
  await prisma.project.upsert({
    where: { slug: "roselyra" },
    update: {
      title: "ROSELYRA",
      subtitle: "Luxury fashion editorial lookbook and tactile digital brand showcase",
      excerpt: "Bespoke high-fashion digital experience bridging editorial art direction, dynamic photography grids, and luxury storytelling.",
      description: "Roselyra is a high-fashion digital monograph designed to immerse visitors in curated seasonal collections. Blending asymmetric editorial typography with rich responsive imagery to create an unforgettable brand universe.",
      year: "2026",
      client: "Roselyra Paris",
      type: "EDITORIAL E-COMMERCE",
      role: "UI/UX & PRODUCT DESIGN",
      duration: "3 MONTHS",
      status: "PUBLISHED",
      featured: true,
      sortOrder: 2,
      category: "UI/UX",
      heroImage: "/projects/roselyra.png",
      technologies: JSON.stringify(["PRODUCT DESIGN", "FIGMA TOKENS", "NEXT.JS 15", "TAILWIND CSS", "FRAMER MOTION"]),
      specifications: JSON.stringify({
        disciplines: "Art Direction, Design Systems, Frontend",
        typography: "Custom High-Contrast Editorial Serif",
        responsiveness: "Fluid Micro-Breakpoints",
        artDirection: "Haute Couture Visual Hierarchy",
        experience: "Immersive Infinite Lookbook",
      }),
      challenge: "Capturing the tactile, prestigious intimacy of print editorial magazines in a fluid, digital responsive environment without compromising brand prestige.",
      approach: "Crafted an asymmetric typography system paired with curated photo matrices, subtle hover reveals, and high-craft device frames.",
      solution: "An editorial digital experience that turns browsing into an art-book experience, boosting user engagement and time on site.",
      caseStudyUrl: "/work/roselyra",
    },
    create: {
      title: "ROSELYRA",
      slug: "roselyra",
      subtitle: "Luxury fashion editorial lookbook and tactile digital brand showcase",
      excerpt: "Bespoke high-fashion digital experience bridging editorial art direction, dynamic photography grids, and luxury storytelling.",
      description: "Roselyra is a high-fashion digital monograph designed to immerse visitors in curated seasonal collections. Blending asymmetric editorial typography with rich responsive imagery to create an unforgettable brand universe.",
      year: "2026",
      client: "Roselyra Paris",
      type: "EDITORIAL E-COMMERCE",
      role: "UI/UX & PRODUCT DESIGN",
      duration: "3 MONTHS",
      status: "PUBLISHED",
      featured: true,
      sortOrder: 2,
      category: "UI/UX",
      heroImage: "/projects/roselyra.png",
      technologies: JSON.stringify(["PRODUCT DESIGN", "FIGMA TOKENS", "NEXT.JS 15", "TAILWIND CSS", "FRAMER MOTION"]),
      specifications: JSON.stringify({
        disciplines: "Art Direction, Design Systems, Frontend",
        typography: "Custom High-Contrast Editorial Serif",
        responsiveness: "Fluid Micro-Breakpoints",
        artDirection: "Haute Couture Visual Hierarchy",
        experience: "Immersive Infinite Lookbook",
      }),
      challenge: "Capturing the tactile, prestigious intimacy of print editorial magazines in a fluid, digital responsive environment without compromising brand prestige.",
      approach: "Crafted an asymmetric typography system paired with curated photo matrices, subtle hover reveals, and high-craft device frames.",
      solution: "An editorial digital experience that turns browsing into an art-book experience, boosting user engagement and time on site.",
      caseStudyUrl: "/work/roselyra",
    },
  });

  console.log("Projects upserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
