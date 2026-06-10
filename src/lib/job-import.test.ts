import { describe, expect, it } from "vitest";
import { extractJobDescription, validateJobUrl } from "@/lib/job-import";

describe("job import", () => {
  it("accepts public https URLs", () => {
    expect(validateJobUrl("https://careers.example.com/jobs/123").hostname).toBe(
      "careers.example.com"
    );
  });

  it("rejects localhost and private-network URLs", () => {
    expect(() => validateJobUrl("http://localhost:3000/job")).toThrow(/public job listing/i);
    expect(() => validateJobUrl("http://192.168.1.5/job")).toThrow(/public job listing/i);
    expect(() => validateJobUrl("ftp://example.com/job")).toThrow(/http/i);
  });

  it("extracts structured JobPosting content before visible page text", () => {
    const html = `
      <html><head><script type="application/ld+json">
      {"@type":"JobPosting","title":"AI Product Manager","description":"Lead AI products and partner with engineering.","hiringOrganization":{"name":"Example Labs"}}
      </script></head><body>Generic careers page</body></html>
    `;

    expect(extractJobDescription(html)).toEqual({
      title: "AI Product Manager",
      company: "Example Labs",
      text: "Lead AI products and partner with engineering."
    });
  });
});
