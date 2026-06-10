import { describe, expect, it } from "vitest";
import type { AnalysisResult } from "@/types";
import { loadAnalysis, saveAnalysis } from "@/lib/analysis-store";

const result: AnalysisResult = {
  atsScore: 78,
  skills: { technical: ["SQL"], soft: ["Leadership"], gaps: ["AI"] },
  aiImpact: {
    riskLevel: "medium",
    summary: "Summary",
    affectedTasks: ["Reporting"],
    resilientStrengths: ["Judgment"]
  },
  upskilling: [
    { title: "AI workflows", priority: "high", timeframe: "30 days", resources: [] }
  ],
  improvements: ["Quantify impact"],
  careerHealthScore: 82
};

describe("analysis store", () => {
  it("saves and loads an analysis by id", () => {
    saveAnalysis("analysis-1", result);

    expect(loadAnalysis("analysis-1")).toEqual(result);
  });
});
