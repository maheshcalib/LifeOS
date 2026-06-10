export interface AnalysisResult {
  atsScore: number;
  skills: {
    technical: string[];
    soft: string[];
    gaps: string[];
  };
  aiImpact: {
    riskLevel: "low" | "medium" | "high";
    summary: string;
    affectedTasks: string[];
    resilientStrengths: string[];
  };
  upskilling: {
    title: string;
    priority: "low" | "medium" | "high";
    timeframe: string;
    resources: string[];
  }[];
  improvements: string[];
  careerHealthScore: number;
}

export interface LifePlan {
  events: {
    id: string;
    title: string;
    year: number;
    cost?: number;
    notes?: string;
  }[];
  salary: number;
  results: Record<string, unknown>;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  plan: "free" | "pro";
}

export type CareerGoal = "specialist" | "leadership" | "ai-career" | "entrepreneurship";
export type CareerPriority = "salary" | "stability" | "impact" | "flexibility";
export type WorkStyle = "remote" | "hybrid" | "office" | "flexible";
export type ScenarioPreference = "stable" | "high-growth" | "leadership" | "startup";
export type CareerStage = "student" | "early-career" | "mid-career" | "senior";
export type RiskTolerance = "conservative" | "balanced" | "ambitious";

export interface JourneyLifeEvent {
  id: string;
  title: string;
  year: number;
  cost: number;
}

export interface JourneyState {
  currentStep: number;
  analysisId: string | null;
  analysis: AnalysisResult | null;
  resumeText: string;
  careerStage: CareerStage | null;
  currentRole: string;
  industry: string;
  location: string;
  targetRoles: string[];
  transitionMonths: number;
  riskTolerance: RiskTolerance;
  careerGoal: CareerGoal | null;
  careerPriority: CareerPriority | null;
  workStyle: WorkStyle | null;
  weeklyLearningHours: number;
  currentSalary: number;
  targetSalary: number;
  lifeEvents: JourneyLifeEvent[];
  scenarioPreference: ScenarioPreference | null;
}

export interface JobMatch {
  role: string;
  readiness: number;
  salaryMin: number;
  salaryMax: number;
  transferableSkills: string[];
  missingSkills: string[];
  nextStep: string;
}

export interface ActionPlanItem {
  horizon: "30 days" | "90 days" | "12 months";
  title: string;
  actions: string[];
}

export interface AIResilientRole {
  role: string;
  fit: number;
  aiResilience: number;
  salaryMin: number;
  salaryMax: number;
  transitionDifficulty: "Low" | "Medium" | "High";
  transferableSkills: string[];
  missingSkills: string[];
  whyResilient: string;
  proofProject: string;
}

export interface AIUpskillItem {
  skill: string;
  whyItMatters: string;
  aiChange: string;
  learningTask: string;
  proofProject: string;
  timeframe: string;
}

export interface AIAdvantage {
  automate: string[];
  augment: string[];
  differentiate: string[];
  upskillPlan: AIUpskillItem[];
}

export type CareerPathKind = "best-fit" | "ai-resilient" | "ambitious";

export interface CareerPathMilestone {
  year: number;
  title: string;
  description: string;
  salary: number;
  skill: string;
}

export interface CareerPath {
  kind: CareerPathKind;
  label: string;
  role: string;
  summary: string;
  readiness: number;
  aiResilience: number;
  salaryEnd: number;
  milestones: CareerPathMilestone[];
}

export interface JobDescription {
  title: string;
  company: string;
  text: string;
  sourceUrl?: string;
}

export interface ResumeRewrite {
  id: string;
  section: "summary" | "skills" | "experience";
  original: string;
  suggested: string;
  reason: string;
  sourceEvidence: string;
}

export interface TailoredResume {
  targetRole: string;
  headline: string;
  summary: string;
  skills: string[];
  experienceBullets: string[];
  education: string[];
}

export interface KeywordRecommendation {
  keyword: string;
  evidence: string;
  suggestedPlacement: "summary" | "skills" | "experience";
}

export interface TailoringResult {
  source: "gemini" | "demo";
  matchScore: number;
  jdPriorities: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
  unsupportedRequirements: string[];
  keywordRecommendations: KeywordRecommendation[];
  rewrites: ResumeRewrite[];
  tailoredResume: TailoredResume;
}

export type FinancialRiskPreference = "conservative" | "balanced" | "growth";
export type FinancialGoalType = "emergency" | "education" | "home" | "retirement" | "custom";

export interface FinancialAssumptions {
  inflation: number;
  liquidReturn: number;
  debtReturn: number;
  growthReturn: number;
  currentIncomeGrowth: number;
}

export interface FinancialGoal {
  id: string;
  type: FinancialGoalType;
  title: string;
  targetAmount: number;
  targetYear: number;
  existingCorpus: number;
  priority: number;
}

export interface FinancialPlanInput {
  monthlyIncome: number;
  monthlyExpenses: number;
  debtEmi: number;
  existingSavings: number;
  existingInvestments: number;
  riskPreference: FinancialRiskPreference;
  emergencyFundMonths: number;
  selectedPathIncomeGrowth: number;
  assumptions: FinancialAssumptions;
  goals: FinancialGoal[];
}

export interface GoalProjection extends FinancialGoal {
  years: number;
  futureTarget: number;
  requiredMonthly: number;
  allocatedMonthly: number;
  fundingRatio: number;
  status: "on-track" | "gap" | "not-feasible";
  categoryGuidance: string;
}

export interface FinancialPlanResult {
  availableMonthlySavings: number;
  currentPathFiveYearCorpus: number;
  selectedPathFiveYearCorpus: number;
  careerPathAdvantage: number;
  goals: GoalProjection[];
}
