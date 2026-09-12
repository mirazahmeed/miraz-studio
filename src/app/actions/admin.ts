"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import {
  authenticateAdmin,
  createSessionToken,
  setSessionCookie,
  clearSessionCookie,
  getAdminSession,
} from "@/lib/auth";

export async function loginAdminAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const user = await authenticateAdmin(email, password);
  if (!user) {
    return { error: "Invalid credentials. Please try again." };
  }

  const token = await createSessionToken(user);
  await setSessionCookie(token);

  redirect("/admin");
}

export async function logoutAdminAction() {
  await clearSessionCookie();
  redirect("/admin/login");
}

export async function saveProjectAction(formData: FormData) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  const id = formData.get("id") as string | null;
  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const subtitle = (formData.get("subtitle") as string) || null;
  const excerpt = formData.get("excerpt") as string;
  const description = formData.get("description") as string;
  const client = formData.get("client") as string;
  const year = formData.get("year") as string;
  const type = formData.get("type") as string;
  const role = formData.get("role") as string;
  const duration = (formData.get("duration") as string) || null;
  const status = (formData.get("status") as string) || "PUBLISHED";
  const category = (formData.get("category") as string) || "WEBSITES";
  const heroImage = formData.get("heroImage") as string;
  const featured = formData.get("featured") === "true";
  const sortOrder = parseInt((formData.get("sortOrder") as string) || "0", 10);

  const rawTech = (formData.get("technologies") as string) || "";
  const techArray = rawTech
    .split(",")
    .map((t) => t.trim().toUpperCase())
    .filter(Boolean);

  const challenge = (formData.get("challenge") as string) || null;
  const approach = (formData.get("approach") as string) || null;
  const solution = (formData.get("solution") as string) || null;
  const results = (formData.get("results") as string) || null;
  const learnings = (formData.get("learnings") as string) || null;
  const liveUrl = (formData.get("liveUrl") as string) || null;
  const githubUrl = (formData.get("githubUrl") as string) || null;
  const figmaUrl = (formData.get("figmaUrl") as string) || null;
  const caseStudyUrl = (formData.get("caseStudyUrl") as string) || null;

  const dataPayload = {
    title,
    slug,
    subtitle,
    excerpt,
    description,
    client,
    year,
    type,
    role,
    duration,
    status,
    category,
    heroImage,
    featured,
    sortOrder,
    technologies: JSON.stringify(techArray),
    challenge,
    approach,
    solution,
    results,
    learnings,
    liveUrl,
    githubUrl,
    figmaUrl,
    caseStudyUrl,
  };

  if (id) {
    await prisma.project.update({
      where: { id },
      data: dataPayload,
    });
  } else {
    await prisma.project.create({
      data: dataPayload,
    });
  }

  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath(`/work/${slug}`);
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProjectAction(id: string) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/admin/projects");
}

export async function togglePublishAction(id: string, currentStatus: string) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  const newStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
  await prisma.project.update({
    where: { id },
    data: { status: newStatus },
  });

  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/admin/projects");
}

export async function updateSiteSettingsAction(formData: FormData) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  const keys = [
    "studio_name",
    "studio_tagline",
    "hero_eyebrow",
    "hero_title",
    "hero_description",
    "stat_1_label",
    "stat_1_value",
    "stat_2_label",
    "stat_2_value",
    "stat_3_label",
    "stat_3_value",
    "stat_4_label",
    "stat_4_value",
    "about_statement",
    "about_bio",
    "contact_email",
    "contact_location",
    "contact_availability",
  ];

  for (const key of keys) {
    const value = formData.get(key) as string | null;
    if (value !== null) {
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }
  }

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/admin/settings");
}

export async function deleteMessageAction(id: string) {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
}
