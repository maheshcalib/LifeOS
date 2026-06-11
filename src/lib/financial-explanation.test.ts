import { describe, expect, it } from "vitest";
import { normalizeFinancialExplanation } from "@/lib/financial-explanation";

describe("financial explanation normalization", () => {
  it("converts a string next action into a render-safe list", () => {
    expect(normalizeFinancialExplanation({
      summary: "Prioritize the nearest goal.",
      nextActions: "Increase monthly savings."
    })).toEqual({
      summary: "Prioritize the nearest goal.",
      nextActions: ["Increase monthly savings."]
    });
  });

  it("drops invalid action values and uses a fallback summary", () => {
    expect(normalizeFinancialExplanation(
      { summary: 42, nextActions: ["Review goals.", null, 7] },
      "Fallback summary"
    )).toEqual({
      summary: "Fallback summary",
      nextActions: ["Review goals."]
    });
  });
});
