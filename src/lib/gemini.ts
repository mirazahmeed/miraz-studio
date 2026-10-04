// ─── Gemini AI Integration ───
// Generates case study narratives from project context via Gemini REST API.
// No SDK dependency — uses fetch directly.

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

// ─── Types ───

export interface CaseStudyContext {
  title: string;
  client: string;
  type: string;
  role: string;
  category: string;
  duration?: string;
  technologies: string;
  excerpt: string;
  description: string;
}

export interface CaseStudyResult {
  challenge: string;
  approach: string;
  solution: string;
  process: string;
  results: string;
  learnings: string;
}

// ─── Prompt Template ───

function buildPrompt(context: CaseStudyContext): string {
  return `You are a senior creative technologist and portfolio copywriter. You write case studies for a premium design & development studio called "MIRAZ STUDIO™".

Your writing style is:
- Confident, precise, and slightly editorial
- Technical but accessible — you explain complex decisions clearly
- Uses active voice and strong verbs
- Never uses generic filler, buzzwords, or clichés
- Every sentence adds specific value
- Professional but not corporate — you sound like a skilled craftsman proud of their work

PROJECT CONTEXT:
- Project Title: ${context.title}
- Client: ${context.client}
- Project Type: ${context.type}
- My Role: ${context.role}
- Category: ${context.category}
${context.duration ? `- Duration: ${context.duration}` : ""}
- Technology Stack: ${context.technologies}
- Brief Overview: ${context.excerpt}
- Full Description: ${context.description}

TASK: Generate all 6 case study sections for this project. Each section should be 2-3 concise paragraphs. Write in first person plural ("we") perspective.

Return your response as a valid JSON object with exactly these keys:

{
  "challenge": "Describe the core problem the client was facing. What pain points existed? What wasn't working? Be specific about the business impact and the gap between where they were and where they needed to be.",
  "approach": "Explain the strategic thinking and methodology. What frameworks or methods were used? How was the problem broken down? What trade-offs were considered? Show the thought process behind the decisions.",
  "solution": "Detail the technical implementation. What architecture decisions were made and why? What specific tools and technologies were leveraged? Focus on the engineering craft and design rationale.",
  "process": "Walk through the design and development process phase by phase. How did the team iterate? Include any pivots, discoveries, or key collaboration moments that shaped the outcome.",
  "results": "Share measurable outcomes and impact. Use plausible specific numbers: performance improvements, load times, user adoption metrics, conversion rates, or cost savings. Mark any estimated metrics with approximate language like 'approximately' or 'projected'.",
  "learnings": "Reflect on key takeaways from the project. What would be done differently? What was surprising? What insight would be valuable for future projects? Be honest and introspective."
}

IMPORTANT:
- Return ONLY the raw JSON object, no markdown code fences, no explanation
- Each value should be 2-3 paragraphs of plain text (no markdown, no bullet points, no headers)
- Be specific to THIS project's context — reference the actual technologies, client name, and project type
- For the results section, generate plausible but clearly approximate metrics based on the project type
- Do NOT wrap the JSON in \`\`\`json code blocks — return the raw JSON only`;
}

// ─── API Call ───

export async function generateCaseStudy(
  context: CaseStudyContext
): Promise<CaseStudyResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not configured. Add it to your .env file."
    );
  }

  // Validate minimum required context
  if (!context.title?.trim() || !context.type?.trim() || !context.description?.trim()) {
    throw new Error(
      "Insufficient project context. Title, type, and description are required to generate a case study."
    );
  }

  const prompt = buildPrompt(context);

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.8,
        topP: 0.95,
        maxOutputTokens: 4096,
        responseMimeType: "application/json",
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Gemini API error:", response.status, errorBody);

    if (response.status === 429) {
      throw new Error("AI rate limit reached. Please wait a moment and try again.");
    }
    if (response.status === 401 || response.status === 403) {
      throw new Error("Invalid Gemini API key. Check your GEMINI_API_KEY in .env.");
    }

    throw new Error(`Gemini API error (${response.status}). Please try again.`);
  }

  const data = await response.json();

  // Extract text from Gemini response structure
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    console.error("Unexpected Gemini response structure:", JSON.stringify(data));
    throw new Error("Received an empty response from AI. Please try again.");
  }

  // Parse the JSON response
  try {
    // Strip any markdown code fences if Gemini adds them despite instructions
    const cleanText = rawText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const parsed = JSON.parse(cleanText) as CaseStudyResult;

    // Validate all expected fields exist
    const requiredFields: (keyof CaseStudyResult)[] = [
      "challenge", "approach", "solution", "process", "results", "learnings",
    ];

    for (const field of requiredFields) {
      if (typeof parsed[field] !== "string" || !parsed[field].trim()) {
        throw new Error(`Missing or empty field: ${field}`);
      }
    }

    return parsed;
  } catch (parseError) {
    console.error("Failed to parse Gemini response:", rawText);
    throw new Error(
      "AI generated an invalid response format. Please try again."
    );
  }
}
