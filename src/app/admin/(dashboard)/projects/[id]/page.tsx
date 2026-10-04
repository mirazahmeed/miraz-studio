import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { ProjectEditor } from "@/components/admin/ProjectEditor";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      gallery: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <div>
      <ProjectEditor
        initialData={project}
        galleryImages={project.gallery}
      />
    </div>
  );
}
