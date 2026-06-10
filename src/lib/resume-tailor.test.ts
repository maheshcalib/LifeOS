import { describe, expect, it } from "vitest";
import { buildDemoTailoringResult } from "@/lib/resume-tailor";

describe("resume tailoring fallback", () => {
  it("returns reviewable rewrites with source evidence and unsupported requirements", () => {
    const result = buildDemoTailoringResult({
      resumeText:
        "Business Analyst\nSummary\nAnalytics professional.\nExperience\nBuilt weekly SQL reports for stakeholders.",
      jobDescription:
        "We need an AI Product Manager with SQL, stakeholder leadership, Kubernetes, and product strategy.",
      targetRole: "AI Product Manager"
    });

    expect(result.source).toBe("demo");
    expect(result.rewrites.length).toBeGreaterThan(0);
    expect(result.rewrites.every((rewrite) => rewrite.sourceEvidence.length > 0)).toBe(true);
    expect(result.unsupportedRequirements).toContain("Kubernetes");
    expect(result.tailoredResume.targetRole).toBe("AI Product Manager");
  });
});
