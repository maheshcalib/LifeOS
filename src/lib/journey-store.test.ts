import { describe, expect, it } from "vitest";
import { createInitialJourney, loadJourney, saveJourney } from "@/lib/journey-store";

describe("journey store", () => {
  it("saves and loads guided journey progress", () => {
    const journey = createInitialJourney();
    journey.currentStep = 3;
    journey.careerGoal = "leadership";

    saveJourney(journey);

    expect(loadJourney()).toEqual(journey);
  });
});
