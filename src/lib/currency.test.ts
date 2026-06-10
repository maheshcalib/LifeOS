import { describe, expect, it } from "vitest";
import { formatINR } from "@/lib/currency";

describe("formatINR", () => {
  it("formats currency using Indian grouping", () => {
    expect(formatINR(1200000)).toContain("12,00,000");
    expect(formatINR(1200000)).toContain("₹");
  });
});
