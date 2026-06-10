import { describe, expect, it } from "vitest";
import { buildAIAdvantage, buildAIResilientRoles } from "@/lib/ai-resilience";
import type { AnalysisResult, JourneyState } from "@/types";

const analysis: AnalysisResult = {
  atsScore: 72,
  skills: {
    technical: ["SQL", "Analytics", "AI Tools"],
    soft: ["Leadership", "Communication", "Problem Solving"],
    gaps: ["AI Governance", "Product Strategy"]
  },
  aiImpact: {
    riskLevel: "medium",
    summary: "Routine reporting can be automated.",
    affectedTasks: ["Routine reporting", "Documentation"],
    resilientStrengths: ["Judgment", "Stakeholder leadership"]
  },
  upskilling: [
    { title: "AI Governance", priority: "high", timeframe: "60 days", resources: [] }
  ],
  improvements: ["Quantify outcomes"],
  careerHealthScore: 75
};

const journey = {
  currentRole: "Business Analyst",
  currentSalary: 1200000,
  targetSalary: 2400000,
  targetRoles: []
} as unknown as JourneyState;

describe("AI resilience recommendations", () => {
  it("automatically recommends AI-resilient roles", () => {
    const roles = buildAIResilientRoles(journey, analysis);

    expect(roles.length).toBeGreaterThanOrEqual(3);
    expect(roles[0].aiResilience).toBeGreaterThanOrEqual(70);
    expect(roles[0].proofProject.length).toBeGreaterThan(10);
  });

  it("separates automate, augment, and differentiate skills", () => {
    const advantage = buildAIAdvantage(analysis);

    expect(advantage.automate).toContain("Routine reporting");
    expect(advantage.augment.length).toBeGreaterThan(0);
    expect(advantage.differentiate).toContain("Judgment");
    expect(advantage.upskillPlan[0].proofProject).toBeTruthy();
  });
});
