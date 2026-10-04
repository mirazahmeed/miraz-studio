import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { generateCaseStudy, type CaseStudyContext } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  // ─── Auth Check ───
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized. Please log in to the admin panel." },
      { status: 401 }
    );
  }

  // ─── Parse Request Body ───
  let body: CaseStudyContext;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  // ─── Validate Required Fields ───
  if (!body.title?.trim() || !body.type?.trim() || !body.description?.trim()) {
    return NextResponse.json(
      {
        error:
          "Missing required fields. Please fill in at least the project title, type, and description before generating.",
      },
      { status: 400 }
    );
  }

  // ─── Generate Case Study via Gemini ───
  try {
    const result = await generateCaseStudy({
      title: body.title,
      client: body.client || "Client",
      type: body.type,
      role: body.role || "Design & Development",
      category: body.category || "WEBSITES",
      duration: body.duration || undefined,
      technologies: body.technologies || "",
      excerpt: body.excerpt || "",
      description: body.description,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("[AI Generate Case Study] Error:", error.message);

    // Return the user-friendly error message from gemini.ts
    return NextResponse.json(
      { error: error.message || "Failed to generate case study. Please try again." },
      { status: 500 }
    );
  }
}
