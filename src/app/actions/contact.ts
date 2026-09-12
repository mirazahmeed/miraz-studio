"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitContactMessage(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company") || undefined,
      projectType: formData.get("projectType") || undefined,
      budget: formData.get("budget") || undefined,
      timeline: formData.get("timeline") || undefined,
      message: formData.get("message"),
    };

    const validated = contactSchema.safeParse(rawData);
    if (!validated.success) {
      return {
        success: false,
        error: "Please correct the highlighted errors.",
        fieldErrors: validated.error.flatten().fieldErrors,
      };
    }

    await prisma.contactMessage.create({
      data: {
        name: validated.data.name,
        email: validated.data.email,
        company: validated.data.company,
        projectType: validated.data.projectType,
        budget: validated.data.budget,
        timeline: validated.data.timeline,
        message: validated.data.message,
        status: "new",
      },
    });

    return {
      success: true,
    };
  } catch (err) {
    console.error("Failed to save contact message:", err);
    return {
      success: false,
      error: "An unexpected error occurred while sending your message. Please try again or email us directly.",
    };
  }
}
