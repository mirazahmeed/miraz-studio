import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    title: "Project Fission : Fashion E-commerce Web App",
    slug: "project-fission-fashion-e-commerce-web-app",
    subtitle: "Modern, responsive fashion e-commerce storefront with fluid shopping journeys",
    excerpt:
      "A modern, responsive fashion e-commerce web application focused on clean UI, strong visual hierarchy, and brand-driven design.",
    description:
      "A modern, responsive fashion e-commerce web application focused on clean UI, strong visual hierarchy, and brand-driven design. Built with React and Tailwind CSS, the project showcases product collections, best sellers, and customer engagement sections using reusable components and a scalable frontend architecture.",
    technologies: JSON.stringify(["React", "Tailwind CSS", "JavaScript"]),
    liveUrl: "https://fission.surge.sh/",
    githubUrl: "https://github.com/mirazahmeed/fission",
    heroImage: "/projects/fission.png",
    featured: true,
    category: "WEBSITES",
    type: "FASHION E-COMMERCE",
    role: "FRONTEND ENGINEERING / UI DESIGN",
    client: "Fission Apparel",
    year: "2026",
    sortOrder: 1,
    specifications: JSON.stringify({
      architecture: "Component-Driven React Architecture",
      styling: "Tailwind CSS Responsive Utilities",
      deployment: "Surge.sh CDN",
      catalog: "Latest Collections & Best Sellers",
      speed: "Fast First Contentful Paint",
    }),
    challenge:
      "Balancing high-fashion brand expression with intuitive catalog filtering and responsive mobile navigation without UI lag.",
    approach:
      "Structured a modular component tree with reusable product cards, sticky navigation, and clear visual hierarchy for featured arrivals.",
    solution:
      "A high-contrast editorial storefront featuring clean typography, structured product grids, and rapid client-side browsing.",
  },
  {
    title: "ROSELYRA Fashion",
    slug: "roselyra-fashion",
    subtitle: "High-fashion e-commerce platform with Stripe checkout, Firebase auth & admin dashboard",
    excerpt:
      "A modern fashion e-commerce platform built with Next.js 14, featuring product collections, categories, and curated browsing.",
    description:
      "A modern fashion e-commerce platform built with Next.js 14, featuring product collections, categories, and curated browsing. Includes shopping cart with drawer UI, wishlist, user authentication (Firebase + JWT), order management, and Stripe-powered checkout flow. Fully responsive UI with Tailwind CSS and Radix UI components, smooth animations via Framer Motion, admin dashboard for managing products/categories/collections/media, Cloudinary for media storage, email notifications via Nodemailer, and newsletter subscription.",
    technologies: JSON.stringify(["Next.js", "Firebase", "Stripe", "Tailwind CSS", "MongoDB"]),
    liveUrl: "https://roselyra-fashion.vercel.app/",
    githubUrl: null,
    heroImage: "/projects/roselyra.png",
    featured: true,
    category: "WEBSITES",
    type: "FULL-STACK E-COMMERCE",
    role: "FULL-STACK ARCHITECTURE / UI/UX",
    client: "Roselyra Paris",
    year: "2026",
    sortOrder: 2,
    specifications: JSON.stringify({
      framework: "Next.js 14 App Router",
      database: "MongoDB with Mongoose",
      authentication: "Firebase Auth + JWT",
      payments: "Stripe Checkout & Webhooks",
      media: "Cloudinary Image Pipeline",
      email: "Nodemailer Notification Engine",
    }),
    challenge:
      "Integrating complex e-commerce state (drawer cart, wishlist, multi-tier admin CMS, Stripe webhooks) into a cohesive, high-fashion aesthetic.",
    approach:
      "Engineered a full-stack Next.js 14 architecture with server-side validation, Radix UI accessible primitives, and fluid Framer Motion transitions.",
    solution:
      "A production-grade luxury commerce experience featuring seamless checkout, real-time inventory management, and automated order notifications.",
  },
  {
    title: "DocMeet (Doctor Appointment Booking Platform)",
    slug: "docmeet-doctor-appointment-booking-platform",
    subtitle: "Healthcare discovery and doctor appointment booking platform with real-time analytics",
    excerpt:
      "Doctor discovery and appointment booking system with profile details and real-time availability.",
    description:
      "Doctor discovery and appointment booking system with profile details and real-time availability, Sorting, filtering, and interactive charts for better user insights, Persistent booking and cancellation functionality with a clean, responsive UI.",
    technologies: JSON.stringify(["React", "Node.js", "MongoDB", "REST API"]),
    liveUrl: "https://doctors-meet.netlify.app/",
    githubUrl: null,
    heroImage: "/projects/docmeet.png",
    featured: false,
    category: "WEB APPS",
    type: "HEALTHCARE PLATFORM",
    role: "FULL-STACK DEVELOPMENT / UI DESIGN",
    client: "DocMeet Health",
    year: "2026",
    sortOrder: 3,
    specifications: JSON.stringify({
      frontend: "React SPA with Modular Components",
      backend: "Node.js & Express REST API",
      database: "MongoDB Document Store",
      analytics: "Interactive Telemetry Charts",
      scheduling: "Real-time Slot Booking & Cancellation",
    }),
    challenge:
      "Simplifying the doctor booking journey so patients can find specialists, compare availability, and confirm appointments with zero friction.",
    approach:
      "Designed an ergonomic multi-filter directory with instant calendar slot selection and dynamic doctor profile telemetry.",
    solution:
      "A reliable healthcare portal featuring clean typography, persistent appointment state management, and real-time practitioner scheduling.",
  },
  {
    title: "The Daily Chronicle (Newspaper)",
    slug: "the-daily-chronicle-newspaper",
    subtitle: "Digital news publication platform with category streaming and multi-provider auth",
    excerpt:
      "A modern online newspaper platform featuring category-based news, trending articles, and dynamic content rendering.",
    description:
      "A modern online newspaper platform featuring category-based news, trending articles, and dynamic content rendering. Supports Firebase authentication with email/password, Google, and GitHub login. Fully responsive UI built with React and Tailwind CSS, following a clean digital newspaper layout.",
    technologies: JSON.stringify(["React", "Firebase", "Tailwind CSS"]),
    liveUrl: "https://the-daily-chronicle-news.web.app/category/0",
    githubUrl: null,
    heroImage: "/projects/daily-chronicle.png",
    featured: false,
    category: "WEBSITES",
    type: "EDITORIAL PUBLISHING",
    role: "FRONTEND ENGINEERING / AUTHENTICATION",
    client: "The Daily Chronicle",
    year: "2026",
    sortOrder: 4,
    specifications: JSON.stringify({
      platform: "React Single Page Application",
      authentication: "Firebase Auth (Email, Google, GitHub)",
      styling: "Tailwind CSS Editorial Typography",
      content: "Dynamic Category Routing & Feed Rendering",
      responsive: "Mobile, Tablet & Desktop Newspaper Layout",
    }),
    challenge:
      "Replicating the visual balance of a broadsheet newspaper while delivering rapid category navigation and secure user bookmarking.",
    approach:
      "Built a multi-column editorial layout utilizing CSS grid and Firebase real-time data binding for trending breaking stories.",
    solution:
      "A distraction-free digital publication with multi-provider social authentication, reader-friendly font scales, and instant section filtering.",
  },
  {
    title: "ForgeUI : Craft Beautiful Interfaces",
    slug: "forgeui-craft-beautiful-interfaces",
    subtitle: "Open-source UI ecosystem with 100+ dark-mode components, CLI installer & AI prompt engine",
    excerpt:
      "A premium, open-source UI ecosystem for modern web development, built on Next.js, React 19, and Tailwind CSS v4.",
    description:
      "A premium, open-source UI ecosystem for modern web development, built on Next.js, React 19, and Tailwind CSS v4. ForgeUI ships 100+ accessible, dark-mode-first components with full source code and documentation, 12 full-page templates, 10 preset themes with a live CSS-variable theme builder, and Framer Motion primitives for rich animations.\nBeyond components, it includes a CLI installer (npx forgeui add button), an AI-powered prompt-to-UI generator, and developer tools like a color palette generator, gradient/shadow generators, and animation playgrounds — all organized behind a scalable App Router architecture with reusable components, TypeScript type safety, and a dedicated admin dashboard for managing components, templates, and themes.",
    technologies: JSON.stringify(["Next.js 16", "React 19", "Tailwind CSS v4", "TypeScript", "Framer Motion"]),
    liveUrl: "https://forgeui.mirazstudio.xyz/",
    githubUrl: null,
    heroImage: "/projects/forgeui.png",
    featured: true,
    category: "UI/UX",
    type: "DESIGN SYSTEM & ECOSYSTEM",
    role: "DESIGN SYSTEM ARCHITECTURE / CLI DEVELOPMENT",
    client: "ForgeUI Open Source",
    year: "2026",
    sortOrder: 5,
    specifications: JSON.stringify({
      components: "100+ Accessible Primitives",
      templates: "12 Full-Page Application Templates",
      cli: "npx forgeui add <component>",
      aiEngine: "Prompt-to-UI Code Generation",
      theming: "Live CSS-Variable Theme Studio",
      performance: "100% Tree-Shakeable React 19 & Tailwind v4",
    }),
    challenge:
      "Creating an enterprise-grade component library that feels as beautiful as bespoke studio code while maintaining 100% copy-paste portability and CLI convenience.",
    approach:
      "Architected accessible Radix-based primitives styled with Tailwind CSS v4 design tokens, complemented by a custom CLI installer and real-time theme customizer.",
    solution:
      "A modern developer platform offering instantaneous UI scaffolding, interactive playground previews, and full TypeScript strict adherence.",
  },
  {
    title: "FileForge: Privacy-First PDF, Image & ZIP Toolkit",
    slug: "fileforge-privacy-first-pdf-image-zip-toolkit",
    subtitle: "Client-side WebAssembly file conversion suite with zero-upload local privacy",
    excerpt:
      "FileForge is a privacy-first, browser-based file conversion web application focused on local processing, clean UI, and zero-upload security.",
    description:
      "FileForge is a privacy-first, browser-based file conversion web application focused on local processing, clean UI, and zero-upload security. Built with Next.js, React, and Tailwind CSS, the project offers PDF merging/splitting/rotating, image conversion/resizing/compression, and ZIP compression tools powered by WebAssembly, all running entirely in the user's browser with a reusable component architecture and scalable tool layout.",
    technologies: JSON.stringify(["Next.js 16", "jszip", "Tailwind CSS v4", "pdf-lib + pdfjs-dist", "zustand", "clsx / tailwind-merge", "Web Workers"]),
    liveUrl: "https://fileforge.mirazstudio.xyz/",
    githubUrl: null,
    heroImage: "/projects/fileforge.png",
    featured: true,
    category: "SAAS",
    type: "WEB UTILITY & WASM",
    role: "FULL-STACK / WEB WORKERS / CLIENT PROCESSING",
    client: "FileForge Tools",
    year: "2026",
    sortOrder: 6,
    specifications: JSON.stringify({
      privacy: "100% Client-Side / Zero File Uploads",
      engines: "WebAssembly + Web Workers Background Pipeline",
      pdfTools: "Merge, Split, Rotate, Compress, Extract",
      imageTools: "WebP, PNG, JPEG, AVIF Local Transcoding",
      zipEngine: "Multi-thread JSZip Local Archiver",
      state: "Zustand Reactive Workspace Store",
    }),
    challenge:
      "Executing heavy multi-megabyte PDF and image manipulations in the browser without freezing the UI thread or sending sensitive user files to a cloud server.",
    approach:
      "Delegated all WebAssembly parsing, PDF generation, and canvas rendering to background Web Workers managed via Zustand state streams.",
    solution:
      "A blazing-fast, secure file utility suite that guarantees 100% confidentiality, zero cloud bandwidth costs, and instant local processing.",
  },
  {
    title: "ETHEREA — Luxury Botanical Skincare",
    slug: "etherea",
    subtitle: "Editorial high-end botanical skincare e-commerce with testing sandbox & MongoDB Atlas admin dashboard",
    excerpt:
      "An editorial, high-end botanical skincare e-commerce web application featuring a curated storefront, interactive ingredient showcases, and customer rituals.",
    description:
      "An editorial, high-end botanical skincare e-commerce web application featuring a curated storefront, interactive ingredient showcases, and customer rituals. It includes a slide-out botanical cart drawer, customer profile and order history portal (/profile), a buyer/client testing sandbox (/testing-admin), and a secure store administration dashboard (/admin) for live product catalogue, inventory, and order fulfillment management backed by MongoDB Atlas.",
    technologies: JSON.stringify([
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "Framer Motion",
      "Lucide React",
      "Canvas Confetti",
      "Node.js",
    ]),
    liveUrl: null,
    githubUrl: "https://github.com/mirazahmeed/etherea",
    heroImage: "/projects/etherea.png",
    featured: true,
    category: "WEBSITES",
    type: "BOTANICAL E-COMMERCE",
    role: "FULL-STACK ARCHITECTURE / UI/UX / BACKEND",
    client: "Etherea Botanicals",
    year: "2026",
    sortOrder: 7,
    specifications: JSON.stringify({
      cart: "Slide-Out Botanical Cart Drawer",
      portal: "Customer Profile & Order History (/profile)",
      sandbox: "Buyer / Client Testing Sandbox (/testing-admin)",
      admin: "Store Administration & Inventory Dashboard (/admin)",
      database: "MongoDB Atlas Cluster",
      motion: "Framer Motion & Canvas Confetti Celebrations",
    }),
    challenge:
      "Creating a sensory, editorial beauty buying experience while ensuring robust cart persistence, customer account management, and real-time inventory administration.",
    approach:
      "Constructed an integrated full-stack Next.js application backed by MongoDB Atlas with dedicated client testing sandboxes and seamless drawer shopping.",
    solution:
      "A luxury e-commerce platform blending serene aesthetic pacing with complete administrative power, real-time inventory management, and zero customer friction.",
  },
];

async function main() {
  console.log("Upserting user's real products into SQLite database...");

  // Delete obsolete placeholder seed projects if they exist
  const obsoleteSlugs = [
    "nexus-platform",
    "forge-design-system",
    "synapse-ai-engine",
    "aura-atelier",
    "kinetic-capital",
    "chroma-monograph",
    "fexion",
    "roselyra",
  ];
  await prisma.project.deleteMany({
    where: {
      slug: { in: obsoleteSlugs },
    },
  });

  for (const p of products) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
    console.log(`Upserted: ${p.title} (${p.slug})`);
  }

  console.log("All real products successfully synchronized!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
