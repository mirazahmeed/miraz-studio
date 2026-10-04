import prisma from "@/lib/prisma";
import { ProjectListClient } from "@/components/admin/ProjectListClient";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
    select: {
      id: true,
      title: true,
      slug: true,
      client: true,
      category: true,
      year: true,
      status: true,
      heroImage: true,
      sortOrder: true,
      featured: true,
      excerpt: true,
      challenge: true,
      approach: true,
      solution: true,
      results: true,
    },
  });

  return <ProjectListClient projects={projects} />;
}
