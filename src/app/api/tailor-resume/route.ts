import { NextResponse } from "next/server";
import { getGeminiClient } from "@/lib/gemini";
import { buildDemoTailoringResult } from "@/lib/resume-tailor";
import type { TailoringResult } from "@/types";

export const runtime = "nodejs";

const schema = {
  type: "object",
  properties: {
    matchScore: { type: "integer" },
    matchedKeywords: { type: "array", items: { type: "string" } },
    missingKeywords: { type: "array", items: { type: "string" } },
    unsupportedRequirements: { type: "array", items: { type: "string" } },
    rewrites: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          section: { type: "string", enum: ["summary", "skills", "experience"] },
          original: { type: "string" },
          suggested: { type: "string" },
          reason: { type: "string" },
          sourceEvidence: { type: "string" }
        },
        required: ["id", "section", "original", "suggested", "reason", "sourceEvidence"]
      }
    },
    tailoredResume: {
      type: "object",
      properties: {
        targetRole: { type: "string" },
        headline: { type: "string" },
        summary: { type: "string" },
        skills: { type: "array", items: { type: "string" } },
        experienceBullets: { type: "array", items: { type: "string" } },
        education: { type: "array", items: { type: "string" } }
      },
      required: ["targetRole", "headline", "summary", "skills", "experienceBullets", "education"]
    }
  },
  required: [
    "matchScore",
    "matchedKeywords",
    "missingKeywords",
    "unsupportedRequirements",
    "rewrites",
    "tailoredResume"
  ]
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { resumeText?: string; jobDescription?: string; targetRole?: string }
    | null;
  if (!body?.resumeText || !body.jobDescription || !body.targetRole) {
    return NextResponse.json(
      { error: "resumeText, jobDescription, and targetRole are required." },
      { status: 400 }
    );
  }

  const input = {
    resumeText: body.resumeText.slice(0, 30000),
    jobDescription: body.jobDescription.slice(0, 30000),
    targetRole: body.targetRole
  };
  const fallback = buildDemoTailoringResult(input);
  const gemini = getGeminiClient();
  if (!gemini || process.env.AI_PROVIDER?.toLowerCase() !== "gemini") {
    return NextResponse.json({ result: fallback, warning: "Demo tailoring result." });
  }

  try {
    const response = await gemini.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash-lite",
      contents: `Tailor the resume to the job description. Never invent claims, skills, metrics, or experience. Every rewrite must quote source evidence from the resume. Unsupported requirements must be listed, not added to the resume. Return concise JSON only.

TARGET ROLE:
${input.targetRole}

JOB DESCRIPTION:
${input.jobDescription}

SOURCE RESUME:
${input.resumeText}`,
      config: { responseMimeType: "application/json", responseJsonSchema: schema }
    });
    const parsed = JSON.parse(response.text || "{}") as Omit<TailoringResult, "source">;
    return NextResponse.json({ result: { ...parsed, source: "gemini" } satisfies TailoringResult });
  } catch {
    return NextResponse.json({
      result: fallback,
      warning: "Gemini tailoring failed; showing a labelled demo result."
    });
  }
}
