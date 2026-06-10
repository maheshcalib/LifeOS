"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ExternalLink, LoaderCircle, Printer, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loadJourney } from "@/lib/journey-store";
import type { JobDescription, ResumeRewrite, TailoredResume, TailoringResult } from "@/types";

const fieldClass =
  "w-full rounded-md border border-[#D9E2EC] bg-white px-3 py-2 text-sm text-[#102A43] outline-none focus:border-[#3E6B89] focus:ring-2 focus:ring-[#D9E2EC]";

export function ResumeTailor({ initialRole }: { initialRole: string }) {
  const [resumeText, setResumeText] = useState("");
  const [role, setRole] = useState(initialRole);
  const [url, setUrl] = useState("");
  const [job, setJob] = useState<JobDescription | null>(null);
  const [pasteMode, setPasteMode] = useState(false);
  const [jdText, setJdText] = useState("");
  const [result, setResult] = useState<TailoringResult | null>(null);
  const [draft, setDraft] = useState<TailoredResume | null>(null);
  const [accepted, setAccepted] = useState<string[]>([]);
  const [busy, setBusy] = useState<"import" | "tailor" | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const journey = loadJourney();
    setResumeText(journey.resumeText);
    if (!initialRole) setRole(journey.targetRoles[0] || "");
  }, [initialRole]);

  const jobDescription = job?.text || jdText;
  const canTailor = Boolean(resumeText && role && jobDescription.trim().length > 80);

  async function importJob() {
    try {
      setBusy("import");
      setError("");
      const response = await fetch("/api/import-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      });
      const data = (await response.json()) as { job?: JobDescription; error?: string; pasteFallback?: boolean };
      if (!response.ok || !data.job) {
        if (data.pasteFallback) setPasteMode(true);
        throw new Error(data.error || "Could not import this job listing.");
      }
      setJob(data.job);
      if (!role && data.job.title) setRole(data.job.title);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not import this job listing.");
    } finally {
      setBusy(null);
    }
  }

  async function tailorResume() {
    try {
      setBusy("tailor");
      setError("");
      const response = await fetch("/api/tailor-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription, targetRole: role })
      });
      const data = (await response.json()) as { result?: TailoringResult; error?: string };
      if (!response.ok || !data.result) throw new Error(data.error || "Could not tailor this resume.");
      setResult(data.result);
      setDraft(data.result.tailoredResume);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not tailor this resume.");
    } finally {
      setBusy(null);
    }
  }

  function acceptRewrite(rewrite: ResumeRewrite) {
    setAccepted((current) => current.includes(rewrite.id) ? current : [...current, rewrite.id]);
    if (rewrite.section === "summary") {
      setDraft((current) => current ? { ...current, summary: rewrite.suggested } : current);
    }
    if (rewrite.section === "experience") {
      setDraft((current) => current ? { ...current, experienceBullets: [...current.experienceBullets, rewrite.suggested] } : current);
    }
  }

  const scoreTone = useMemo(() => {
    if (!result) return "";
    return result.matchScore >= 75 ? "text-[#157347]" : result.matchScore >= 50 ? "text-[#9A6700]" : "text-[#B42318]";
  }, [result]);

  return (
    <div className="min-h-screen bg-[#F4F7FA]">
      <div className="container py-8">
        <div className="mx-auto max-w-7xl">
          <div className="no-print">
            <p className="text-xs font-semibold uppercase text-[#3E6B89]">Evidence-backed resume tailoring</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#102A43]">Align your resume to a real job.</h1>
            <p className="mt-2 max-w-2xl text-[#64748B]">CareerLens rewrites only what your source resume can support. You approve every change.</p>
          </div>

          {!resumeText ? (
            <div className="mt-8 rounded-lg border border-[#D9E2EC] bg-white p-6">
              <h2 className="font-semibold text-[#102A43]">Upload a resume first</h2>
              <p className="mt-2 text-sm text-[#64748B]">Resume content is kept only for the current browser session.</p>
              <Button asChild className="mt-4 bg-[#102A43] hover:bg-[#071A2B]"><a href="/journey">Open guided plan</a></Button>
            </div>
          ) : null}

          {resumeText && !result ? (
            <div className="mt-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
              <section className="rounded-lg border border-[#D9E2EC] bg-white p-5">
                <p className="text-xs font-semibold uppercase text-[#3E6B89]">1. Target role</p>
                <label className="mt-4 block text-sm font-medium text-[#102A43]">
                  Role
                  <input className={`mt-2 ${fieldClass}`} value={role} onChange={(event) => setRole(event.target.value)} />
                </label>
                <label className="mt-4 block text-sm font-medium text-[#102A43]">
                  Job listing URL
                  <div className="mt-2 flex gap-2">
                    <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://company.com/jobs/..." />
                    <Button variant="outline" size="icon" title="Import job listing" disabled={!url || busy === "import"} onClick={importJob}>
                      {busy === "import" ? <LoaderCircle className="animate-spin" /> : <ExternalLink />}
                    </Button>
                  </div>
                </label>
                {job ? (
                  <div className="mt-4 rounded-md bg-[#E8EFF4] p-4 text-sm text-[#102A43]">
                    <p className="font-semibold">{job.title}</p><p className="mt-1 text-[#526D82]">{job.company}</p>
                  </div>
                ) : null}
                <button type="button" className="mt-4 text-sm font-medium text-[#3E6B89] underline underline-offset-4" onClick={() => setPasteMode((value) => !value)}>
                  {pasteMode ? "Hide pasted description" : "Paste job description instead"}
                </button>
              </section>

              <section className="rounded-lg border border-[#D9E2EC] bg-white p-5">
                <p className="text-xs font-semibold uppercase text-[#3E6B89]">2. Job description</p>
                {job && !pasteMode ? (
                  <div className="mt-4 max-h-72 overflow-y-auto whitespace-pre-wrap rounded-md bg-[#F4F7FA] p-4 text-sm leading-6 text-[#526D82]">{job.text}</div>
                ) : (
                  <textarea className={`mt-4 min-h-72 ${fieldClass}`} value={jdText} onChange={(event) => setJdText(event.target.value)} placeholder="Paste the complete job description here..." />
                )}
                {error ? <p className="mt-3 text-sm text-[#B42318]">{error}</p> : null}
                <Button className="mt-5 w-full bg-[#102A43] hover:bg-[#071A2B]" disabled={!canTailor || busy === "tailor"} onClick={tailorResume}>
                  {busy === "tailor" ? <><LoaderCircle className="animate-spin" /> Comparing evidence...</> : "Analyse match and suggest rewrites"}
                </Button>
              </section>
            </div>
          ) : null}

          {result && draft ? (
            <div className="mt-8 grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
              <div className="no-print space-y-5">
                <section className="rounded-lg border border-[#D9E2EC] bg-white p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div><p className="text-xs font-semibold uppercase text-[#3E6B89]">JD match</p><p className={`mt-2 text-4xl font-semibold ${scoreTone}`}>{result.matchScore}%</p></div>
                    <span className="rounded-full bg-[#E8EFF4] px-3 py-1 text-xs font-medium text-[#3E6B89]">{result.source === "demo" ? "Demo result" : "Gemini analysis"}</span>
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div><p className="text-xs font-semibold uppercase text-[#157347]">Supported</p><div className="mt-2 flex flex-wrap gap-2">{result.matchedKeywords.map((item) => <span key={item} className="rounded-full bg-green-50 px-2 py-1 text-xs text-[#157347]">{item}</span>)}</div></div>
                    <div><p className="text-xs font-semibold uppercase text-[#B42318]">Do not claim</p><div className="mt-2 flex flex-wrap gap-2">{result.unsupportedRequirements.map((item) => <span key={item} className="rounded-full bg-red-50 px-2 py-1 text-xs text-[#B42318]">{item}</span>)}</div></div>
                  </div>
                </section>

                <section className="rounded-lg border border-[#D9E2EC] bg-white p-5">
                  <h2 className="font-semibold text-[#102A43]">Review suggested rewrites</h2>
                  <div className="mt-4 space-y-4">
                    {result.rewrites.map((rewrite) => {
                      const isAccepted = accepted.includes(rewrite.id);
                      return (
                        <article key={rewrite.id} className="rounded-md border border-[#D9E2EC] p-4">
                          <p className="text-xs font-semibold uppercase text-[#3E6B89]">{rewrite.section}</p>
                          <p className="mt-3 text-xs text-[#64748B]">Source evidence</p>
                          <p className="mt-1 text-sm text-[#526D82]">{rewrite.sourceEvidence}</p>
                          <p className="mt-3 text-xs text-[#64748B]">Suggested rewrite</p>
                          <p className="mt-1 text-sm font-medium text-[#102A43]">{rewrite.suggested}</p>
                          <div className="mt-4 flex gap-2">
                            <Button size="sm" className="bg-[#102A43] hover:bg-[#071A2B]" disabled={isAccepted} onClick={() => acceptRewrite(rewrite)}><Check />{isAccepted ? "Accepted" : "Accept"}</Button>
                            <Button size="sm" variant="outline"><X />Skip</Button>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              </div>

              <section className="ats-resume rounded-lg border border-[#D9E2EC] bg-white p-7 md:p-10">
                <div className="no-print mb-6 flex justify-between gap-3 border-b border-[#D9E2EC] pb-4">
                  <div className="flex items-center gap-2 text-sm text-[#526D82]"><ShieldCheck className="h-4 w-4" />Clean ATS preview</div>
                  <Button variant="outline" size="sm" onClick={() => window.print()}><Printer />Print / PDF</Button>
                </div>
                <input className="w-full border-0 text-2xl font-semibold text-[#102A43] outline-none" value={draft.headline} onChange={(event) => setDraft({ ...draft, headline: event.target.value })} />
                <p className="mt-1 text-sm text-[#64748B]">{draft.targetRole}</p>
                <div className="mt-7 border-t border-[#102A43] pt-4">
                  <h2 className="text-xs font-bold uppercase text-[#102A43]">Professional summary</h2>
                  <textarea className="mt-3 min-h-24 w-full resize-y border-0 text-sm leading-6 text-[#3F5364] outline-none" value={draft.summary} onChange={(event) => setDraft({ ...draft, summary: event.target.value })} />
                </div>
                <div className="mt-5 border-t border-[#102A43] pt-4">
                  <h2 className="text-xs font-bold uppercase text-[#102A43]">Core skills</h2>
                  <input className="mt-3 w-full border-0 text-sm text-[#3F5364] outline-none" value={draft.skills.join(" • ")} onChange={(event) => setDraft({ ...draft, skills: event.target.value.split("•").map((item) => item.trim()).filter(Boolean) })} />
                </div>
                <div className="mt-5 border-t border-[#102A43] pt-4">
                  <h2 className="text-xs font-bold uppercase text-[#102A43]">Selected experience</h2>
                  {draft.experienceBullets.map((bullet, index) => (
                    <div key={`${index}-${bullet.slice(0, 12)}`} className="mt-3 flex gap-2 text-sm text-[#3F5364]">
                      <span>•</span>
                      <textarea className="min-h-16 w-full resize-y border-0 leading-6 outline-none" value={bullet} onChange={(event) => setDraft({ ...draft, experienceBullets: draft.experienceBullets.map((item, itemIndex) => itemIndex === index ? event.target.value : item) })} />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
