import type { JourneyState } from "@/types";

const JOURNEY_KEY = "lifeos:guided-journey";
const LEGACY_JOURNEY_KEY = "careerlens:guided-journey";

export function createInitialJourney(): JourneyState {
  return {
    currentStep: 1,
    analysisId: null,
    analysis: null,
    resumeText: "",
    careerStage: null,
    currentRole: "",
    industry: "",
    location: "",
    targetRoles: [],
    transitionMonths: 12,
    riskTolerance: "balanced",
    careerGoal: null,
    careerPriority: null,
    workStyle: null,
    weeklyLearningHours: 5,
    currentSalary: 1200000,
    targetSalary: 2000000,
    lifeEvents: [],
    scenarioPreference: null
  };
}

export function saveJourney(journey: JourneyState) {
  sessionStorage.setItem(JOURNEY_KEY, JSON.stringify(journey));
}

export function loadJourney(): JourneyState {
  const value = sessionStorage.getItem(JOURNEY_KEY) ?? sessionStorage.getItem(LEGACY_JOURNEY_KEY);

  if (!value) {
    return createInitialJourney();
  }

  try {
    return { ...createInitialJourney(), ...(JSON.parse(value) as Partial<JourneyState>) };
  } catch {
    return createInitialJourney();
  }
}

export function resetJourney() {
  sessionStorage.removeItem(JOURNEY_KEY);
  sessionStorage.removeItem(LEGACY_JOURNEY_KEY);
}
