import { NextResponse } from "next/server";
import { getAnthropicClient } from "@/lib/anthropic";
import { getGeminiClient } from "@/lib/gemini";
import type { AnalysisResult } from "@/types";

const fallbackResult: AnalysisResult = {
  atsScore: 78,
  skills: {
    technical: ["Analytics", "AI tools", "SQL"],
    soft: ["Leadership", "Communication"],
    gaps: ["Automation design", "Portfolio storytelling"]
  },
  aiImpact: {
    riskLevel: "medium",
    summary:
      "The resume shows exposure to automatable workflows, but strategic and cross-functional strengths reduce displacement risk.",
    affectedTasks: ["Reporting", "Drafting documentation", "Routine analysis"],
    resilientStrengths: ["Stakeholder judgment", "Domain context", "Decision framing"]
  },
  upskilling: [
    {
      title: "AI workflow automation",
      priority: "high",
      timeframe: "30 days",
      resources: ["Build one internal workflow prototype", "Document before/after impact"]
    }
  ],
  improvements: ["Quantify business impact", "Add AI-enabled project examples"],
  careerHealthScore: 82
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { resumeText?: string }
    | null;

  if (!body?.resumeText) {
    return NextResponse.json({ error: "resumeText is required" }, { status: 400 });
  }

  const provider = process.env.AI_PROVIDER?.toLowerCase();

  if (provider === "gemini") {
    const gemini = getGeminiClient();

    if (gemini) {
      try {
        const response = await gemini.models.generateContent({
          model: process.env.GEMINI_MODEL || "gemini-2.5-flash-lite",
          contents: `Analyze this resume and return actionable career analysis. Scores must be integers from 0 to 100. Return JSON only.\n\n${body.resumeText}`,
          config: {
            responseMimeType: "application/json",
            responseJsonSchema: {
              type: "object",
              properties: {
                atsScore: { type: "integer" },
                skills: {
                  type: "object",
                  properties: {
                    technical: { type: "array", items: { type: "string" } },
                    soft: { type: "array", items: { type: "string" } },
                    gaps: { type: "array", items: { type: "string" } }
                  },
                  required: ["technical", "soft", "gaps"]
                },
                aiImpact: {
                  type: "object",
                  properties: {
                    riskLevel: { type: "string", enum: ["low", "medium", "high"] },
                    summary: { type: "string" },
                    affectedTasks: { type: "array", items: { type: "string" } },
                    resilientStrengths: { type: "array", items: { type: "string" } }
                  },
                  required: ["riskLevel", "summary", "affectedTasks", "resilientStrengths"]
                },
                upskilling: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      priority: { type: "string", enum: ["low", "medium", "high"] },
                      timeframe: { type: "string" },
                      resources: { type: "array", items: { type: "string" } }
                    },
                    required: ["title", "priority", "timeframe", "resources"]
                  }
                },
                improvements: { type: "array", items: { type: "string" } },
                careerHealthScore: { type: "integer" }
              },
              required: [
                "atsScore",
                "skills",
                "aiImpact",
                "upskilling",
                "improvements",
                "careerHealthScore"
              ]
            }
          }
        });

        return NextResponse.json({
          result: JSON.parse(response.text ?? "{}") as AnalysisResult,
          source: "gemini"
        });
      } catch {
        return NextResponse.json({
          result: fallbackResult,
          source: "demo",
          warning: "Gemini analysis failed; returning demo analysis."
        });
      }
    }
  }

  const anthropic = getAnthropicClient();

  if (!anthropic) {
    return NextResponse.json({
      result: fallbackResult,
      source: "demo",
      warning: "ANTHROPIC_API_KEY is not configured; returning scaffold analysis."
    });
  }

  const message = await anthropic.messages.create({
    model: "claude-3-5-sonnet-latest",
    max_tokens: 1200,
    messages: [
      {
        role: "user",
        content: `Analyze this resume for ATS score, skills, AI impact, upskilling, improvements, and career health. Return concise JSON only.\n\n${body.resumeText}`
      }
    ]
  });

  return NextResponse.json({ raw: message.content });
}
