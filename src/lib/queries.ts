import prisma from "@/lib/prisma";

export async function getSiteSettings(): Promise<Record<string, string>> {
  try {
    const settings = await prisma.siteSetting.findMany();
    const map: Record<string, string> = {};
    for (const s of settings) {
      map[s.key] = s.value;
    }
    return map;
  } catch (error) {
    console.error("Failed to load site settings:", error);
    return {};
  }
}

export async function getPublishedProjects(category?: string) {
  try {
    return await prisma.project.findMany({
      where: {
        status: "PUBLISHED",
        ...(category && category !== "ALL" ? { category: { equals: category } } : {}),
      },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      include: {
        gallery: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });
  } catch (error) {
    console.error("Failed to fetch published projects:", error);
    return [];
  }
}

export async function getFeaturedProjects() {
  try {
    return await prisma.project.findMany({
      where: {
        status: "PUBLISHED",
        featured: true,
      },
      orderBy: [{ sortOrder: "asc" }],
      include: {
        gallery: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });
  } catch (error) {
    console.error("Failed to fetch featured projects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    return await prisma.project.findUnique({
      where: { slug },
      include: {
        gallery: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });
  } catch (error) {
    console.error(`Failed to fetch project ${slug}:`, error);
    return null;
  }
}

export async function getAdjacentProjects(currentSlug: string) {
  try {
    const all = await prisma.project.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ sortOrder: "asc" }],
      select: { title: true, slug: true, category: true, year: true, heroImage: true },
    });
    const currentIndex = all.findIndex((p) => p.slug === currentSlug);
    if (currentIndex === -1) return { next: null, prev: null };
    const next = all[(currentIndex + 1) % all.length];
    const prev = all[(currentIndex - 1 + all.length) % all.length];
    return { next, prev };
  } catch {
    return { next: null, prev: null };
  }
}

export async function getServices() {
  try {
    return await prisma.service.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    });
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
}

export async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { sortOrder: "asc" },
    });
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return [];
  }
}
