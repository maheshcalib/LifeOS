import { describe, expect, it } from "vitest";
import {
  calculateFinancialPlan,
  futureValue,
  requiredMonthlyContribution
} from "@/lib/financial-plan";
import type { FinancialPlanInput } from "@/types";

const input: FinancialPlanInput = {
  monthlyIncome: 120000,
  monthlyExpenses: 65000,
  debtEmi: 5000,
  existingSavings: 250000,
  existingInvestments: 300000,
  riskPreference: "balanced",
  emergencyFundMonths: 6,
  selectedPathIncomeGrowth: 12,
  assumptions: {
    inflation: 6,
    liquidReturn: 4,
    debtReturn: 7,
    growthReturn: 11,
    currentIncomeGrowth: 6
  },
  goals: [
    { id: "emergency", type: "emergency", title: "Emergency fund", targetAmount: 420000, targetYear: 2027, existingCorpus: 100000, priority: 1 },
    { id: "home", type: "home", title: "Home down payment", targetAmount: 3000000, targetYear: 2031, existingCorpus: 200000, priority: 2 }
  ]
};

describe("financial plan calculations", () => {
  it("calculates inflation-adjusted future value", () => {
    expect(Math.round(futureValue(100000, 0.06, 5))).toBe(133823);
  });

  it("calculates required monthly contribution", () => {
    expect(requiredMonthlyContribution(1000000, 0, 0.07, 60)).toBeGreaterThan(13000);
  });

  it("allocates savings by priority and compares career paths", () => {
    const result = calculateFinancialPlan(input, 2026);

    expect(result.availableMonthlySavings).toBe(50000);
    expect(result.goals[0].allocatedMonthly).toBeGreaterThan(0);
    expect(result.goals[0].allocatedMonthly).toBeLessThanOrEqual(50000);
    expect(result.selectedPathFiveYearCorpus).toBeGreaterThan(result.currentPathFiveYearCorpus);
    expect(result.goals[1].categoryGuidance).toBeTruthy();
  });
});
