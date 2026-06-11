import { NextResponse } from "next/server";
import { getGeminiClient } from "@/lib/gemini";
import { normalizeFinancialExplanation } from "@/lib/financial-explanation";
import type { FinancialPlanResult } from "@/types";

function fallback(result: FinancialPlanResult) {
  const largestGap = [...result.goals].sort((a, b) => a.fundingRatio - b.fundingRatio)[0];
  return {
    summary: `Your selected career path adds approximately ₹${Math.round(result.careerPathAdvantage).toLocaleString("en-IN")} to the five-year corpus projection.`,
    tradeoffs: largestGap ? [`${largestGap.title} needs the largest adjustment to monthly savings or timing.`] : [],
    nextActions: ["Protect the emergency fund allocation first.", "Review assumptions and goal dates quarterly."],
    warning: "Educational planning only. Returns are assumptions, not guarantees."
  };
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { result?: FinancialPlanResult } | null;
  if (!body?.result) return NextResponse.json({ error: "Calculated result is required." }, { status: 400 });
  const deterministic = fallback(body.result);
  const gemini = getGeminiClient();
  if (!gemini || process.env.AI_PROVIDER?.toLowerCase() !== "gemini") return NextResponse.json({ explanation: deterministic, source: "deterministic" });
  try {
    const response = await gemini.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash-lite",
      contents: `Explain this deterministic financial plan in concise educational language. Do not change numbers, recommend named products, or imply guaranteed returns. Return JSON with summary, tradeoffs, nextActions, warning.\n${JSON.stringify(body.result)}`,
      config: { responseMimeType: "application/json" }
    });
    const generated = normalizeFinancialExplanation(JSON.parse(response.text || "{}"), deterministic.summary);
    return NextResponse.json({ explanation: generated, source: "gemini" });
  } catch {
    return NextResponse.json({ explanation: deterministic, source: "deterministic" });
  }
}
