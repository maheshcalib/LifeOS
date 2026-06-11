import type {
  FinancialGoal,
  FinancialGoalType,
  FinancialPlanInput,
  FinancialRiskPreference,
  JourneyLifeEvent,
  JourneyState,
  ScenarioPreference
} from "@/types";

const scenarioGrowth: Record<ScenarioPreference, number> = {
  stable: 8,
  "high-growth": 14,
  leadership: 12,
  startup: 16
};

function goalType(title: string): FinancialGoalType {
  const normalized = title.toLowerCase();
  if (normalized.includes("education")) return "education";
  if (normalized.includes("home")) return "home";
  if (normalized.includes("retire")) return "retirement";
  if (normalized.includes("emergency")) return "emergency";
  return "custom";
}

function riskPreference(risk: JourneyState["riskTolerance"]): FinancialRiskPreference {
  if (risk === "ambitious") return "growth";
  return risk;
}

export function lifeEventToFinancialGoal(event: JourneyLifeEvent, priority: number): FinancialGoal {
  return {
    id: event.id,
    type: goalType(event.title),
    title: event.title,
    targetAmount: event.cost,
    targetYear: event.year,
    existingCorpus: 0,
    priority
  };
}

export function financialGoalToLifeEvent(goal: FinancialGoal): JourneyLifeEvent {
  return {
    id: goal.id,
    title: goal.title,
    year: goal.targetYear,
    cost: goal.targetAmount
  };
}

export function buildJourneyFinancialInput(journey: JourneyState): FinancialPlanInput {
  const events = [...journey.lifeEvents].sort((a, b) => a.year - b.year);
  const previousGoals = new Map(journey.financialPlanInput?.goals.map((goal) => [goal.id, goal]));
  return {
    monthlyIncome: Math.round(journey.currentSalary / 12),
    monthlyExpenses: journey.monthlyExpenses,
    debtEmi: journey.debtEmi,
    existingSavings: journey.existingSavings,
    existingInvestments: journey.existingInvestments,
    riskPreference: riskPreference(journey.riskTolerance),
    emergencyFundMonths: journey.financialPlanInput?.emergencyFundMonths ?? 6,
    selectedPathIncomeGrowth: journey.scenarioPreference ? scenarioGrowth[journey.scenarioPreference] : 10,
    assumptions: journey.financialPlanInput?.assumptions ?? {
      inflation: 6,
      liquidReturn: 4,
      debtReturn: 7,
      growthReturn: 11,
      currentIncomeGrowth: 6
    },
    goals: events.map((event, index) => ({
      ...lifeEventToFinancialGoal(event, index + 1),
      existingCorpus: previousGoals.get(event.id)?.existingCorpus ?? 0
    }))
  };
}
