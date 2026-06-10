import type {
  FinancialGoal,
  FinancialPlanInput,
  FinancialPlanResult,
  FinancialRiskPreference
} from "@/types";

export function futureValue(amount: number, annualRate: number, years: number) {
  return amount * (1 + annualRate) ** years;
}

export function requiredMonthlyContribution(
  target: number,
  existingCorpus: number,
  annualRate: number,
  months: number
) {
  if (months <= 0) return Math.max(0, target - existingCorpus);
  const monthlyRate = annualRate / 12;
  const existingFuture = existingCorpus * (1 + monthlyRate) ** months;
  const gap = Math.max(0, target - existingFuture);
  if (monthlyRate === 0) return gap / months;
  return gap * monthlyRate / ((1 + monthlyRate) ** months - 1);
}

function returnForGoal(goal: FinancialGoal, risk: FinancialRiskPreference, years: number, input: FinancialPlanInput) {
  if (goal.type === "emergency" || years <= 2) return input.assumptions.liquidReturn / 100;
  if (years <= 5 || risk === "conservative") return input.assumptions.debtReturn / 100;
  return input.assumptions.growthReturn / 100;
}

function categoryForGoal(goal: FinancialGoal, risk: FinancialRiskPreference, years: number) {
  if (goal.type === "emergency" || years <= 2) return "Liquid / cash category";
  if (years <= 5 || risk === "conservative") return "Debt + liquid categories";
  return risk === "growth" ? "Diversified growth category" : "Debt + diversified growth mix";
}

function projectFiveYearCorpus(input: FinancialPlanInput, annualIncomeGrowth: number) {
  let monthlyIncome = input.monthlyIncome;
  let corpus = input.existingSavings + input.existingInvestments;
  const annualReturn = input.assumptions.growthReturn / 100;
  for (let year = 0; year < 5; year += 1) {
    const monthlySavings = Math.max(0, monthlyIncome - input.monthlyExpenses - input.debtEmi);
    corpus = futureValue(corpus + monthlySavings * 12, annualReturn, 1);
    monthlyIncome *= 1 + annualIncomeGrowth / 100;
  }
  return corpus;
}

export function calculateFinancialPlan(input: FinancialPlanInput, currentYear = new Date().getFullYear()): FinancialPlanResult {
  const availableMonthlySavings = Math.max(0, input.monthlyIncome - input.monthlyExpenses - input.debtEmi);
  let remainingMonthly = availableMonthlySavings;
  const sortedGoals = [...input.goals].sort((a, b) => a.priority - b.priority);

  const goals = sortedGoals.map((goal) => {
    const years = Math.max(1, goal.targetYear - currentYear);
    const futureTarget = goal.type === "emergency"
      ? Math.max(goal.targetAmount, (input.monthlyExpenses + input.debtEmi) * input.emergencyFundMonths)
      : futureValue(goal.targetAmount, input.assumptions.inflation / 100, years);
    const annualReturn = returnForGoal(goal, input.riskPreference, years, input);
    const requiredMonthly = requiredMonthlyContribution(futureTarget, goal.existingCorpus, annualReturn, years * 12);
    const allocatedMonthly = Math.min(remainingMonthly, requiredMonthly);
    remainingMonthly = Math.max(0, remainingMonthly - allocatedMonthly);
    const fundingRatio = requiredMonthly === 0 ? 1 : allocatedMonthly / requiredMonthly;

    return {
      ...goal,
      years,
      futureTarget: Math.round(futureTarget),
      requiredMonthly: Math.round(requiredMonthly),
      allocatedMonthly: Math.round(allocatedMonthly),
      fundingRatio,
      status: fundingRatio >= 1 ? "on-track" as const : fundingRatio >= 0.5 ? "gap" as const : "not-feasible" as const,
      categoryGuidance: categoryForGoal(goal, input.riskPreference, years)
    };
  });

  const currentPathFiveYearCorpus = projectFiveYearCorpus(input, input.assumptions.currentIncomeGrowth);
  const selectedPathFiveYearCorpus = projectFiveYearCorpus(input, input.selectedPathIncomeGrowth);

  return {
    availableMonthlySavings,
    currentPathFiveYearCorpus: Math.round(currentPathFiveYearCorpus),
    selectedPathFiveYearCorpus: Math.round(selectedPathFiveYearCorpus),
    careerPathAdvantage: Math.round(selectedPathFiveYearCorpus - currentPathFiveYearCorpus),
    goals
  };
}
