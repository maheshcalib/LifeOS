import { describe, expect, it } from "vitest";
import { buildJourneyFinancialInput, financialGoalToLifeEvent } from "@/lib/journey-financial";
import { createInitialJourney } from "@/lib/journey-store";

describe("journey financial mapping", () => {
  it("turns ordered life events and essential money inputs into a financial plan", () => {
    const journey = {
      ...createInitialJourney(),
      currentSalary: 1800000,
      monthlyExpenses: 70000,
      debtEmi: 8000,
      existingSavings: 300000,
      existingInvestments: 450000,
      riskTolerance: "ambitious" as const,
      scenarioPreference: "high-growth" as const,
      lifeEvents: [
        { id: "home", title: "Home purchase", year: 2031, cost: 2500000 },
        { id: "education", title: "Higher education", year: 2028, cost: 800000 }
      ]
    };

    const input = buildJourneyFinancialInput(journey);

    expect(input.monthlyIncome).toBe(150000);
    expect(input.monthlyExpenses).toBe(70000);
    expect(input.riskPreference).toBe("growth");
    expect(input.selectedPathIncomeGrowth).toBe(14);
    expect(input.goals.map((goal) => goal.id)).toEqual(["education", "home"]);
    expect(input.goals[0]).toMatchObject({ type: "education", targetAmount: 800000, priority: 1 });
  });

  it("maps planner goal edits back into journey life events", () => {
    expect(financialGoalToLifeEvent({
      id: "custom",
      type: "custom",
      title: "Family milestone",
      targetAmount: 500000,
      targetYear: 2029,
      existingCorpus: 0,
      priority: 2
    })).toEqual({ id: "custom", title: "Family milestone", year: 2029, cost: 500000 });
  });
});
