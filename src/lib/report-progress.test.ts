import { describe, expect, it } from "vitest";
import { loadReportProgress, saveReportProgress } from "@/lib/report-progress";

describe("report progress", () => {
  it("saves completed report actions", () => {
    saveReportProgress(["30 days:Update resume", "90 days:Build portfolio"]);

    expect(loadReportProgress()).toEqual([
      "30 days:Update resume",
      "90 days:Build portfolio"
    ]);
  });
});
