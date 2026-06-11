import { describe, expect, it } from "vitest";
import { buildActionPlan, buildCareerPaths, buildJobMatches } from "@/lib/report";
import type { AnalysisResult, JourneyState } from "@/types";

const analysis: AnalysisResult = {
  atsScore: 76,
  skills: {
    technical: ["SQL", "Analytics", "AI Tools"],
    soft: ["Leadership", "Communication"],
    gaps: ["System Design", "Product Strategy"]
  },
  aiImpact: {
    riskLevel: "medium",
    summary: "Some tasks can be automated.",
    affectedTasks: ["Reporting"],
    resilientStrengths: ["Judgment"]
  },
  upskilling: [
    { title: "System Design", priority: "high", timeframe: "60 days", resources: [] }
  ],
  improvements: ["Quantify resume impact"],
  careerHealthScore: 74
};

const journey: JourneyState = {
  currentStep: 5,
  analysisId: "1",
  analysis,
  resumeText: "Business Analyst with analytics and stakeholder leadership experience.",
  careerStage: "mid-career",
  currentRole: "Business Analyst",
  industry: "Technology",
  location: "Bengaluru",
  targetRoles: ["Product Manager", "Data Product Manager"],
  transitionMonths: 12,
  riskTolerance: "balanced",
  careerGoal: "leadership",
  careerPriority: "salary",
  workStyle: "hybrid",
  weeklyLearningHours: 6,
  currentSalary: 1200000,
  targetSalary: 2200000,
  monthlyExpenses: 65000,
  debtEmi: 5000,
  existingSavings: 250000,
  existingInvestments: 300000,
  lifeEvents: [],
  scenarioPreference: "leadership",
  financialPlanInput: null,
  financialPlanResult: null
};

describe("report derivation", () => {
  it("builds job matches for selected target roles", () => {
    const matches = buildJobMatches(journey, analysis);

    expect(matches).toHaveLength(2);
    expect(matches[0].readiness).toBeGreaterThanOrEqual(40);
    expect(matches[0].salaryMax).toBeGreaterThan(matches[0].salaryMin);
  });

  it("builds actionable 30, 90, and 365 day plans", () => {
    const plan = buildActionPlan(journey, analysis);

    expect(plan.map((item) => item.horizon)).toEqual(["30 days", "90 days", "12 months"]);
    expect(plan.every((item) => item.actions.length > 0)).toBe(true);
  });

  it("builds three distinct five-year career paths", () => {
    const paths = buildCareerPaths(journey, analysis);

    expect(paths.map((path) => path.kind)).toEqual(["best-fit", "ai-resilient", "ambitious"]);
    expect(paths.every((path) => path.milestones.length === 3)).toBe(true);
    expect(paths.every((path) => path.salaryEnd > journey.currentSalary)).toBe(true);
    expect(paths.every((path) => path.aiResilience >= 60)).toBe(true);
  });
});
