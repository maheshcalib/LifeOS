"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Banknote,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  Home,
  Laptop,
  LoaderCircle,
  Rocket,
  ShieldCheck,
  Target,
  TrendingUp,
  UploadCloud,
  Users
} from "lucide-react";
import { AIImpactCard } from "@/components/career/AIImpactCard";
import { CareerHealthScore } from "@/components/career/CareerHealthScore";
import { SkillsGrid } from "@/components/career/SkillsGrid";
import { UpskillRoadmap } from "@/components/career/UpskillRoadmap";
import { JourneyProgress } from "@/components/journey/JourneyProgress";
import { LifeTimeline } from "@/components/journey/LifeTimeline";
import { OptionCard } from "@/components/journey/OptionCard";
import { SalaryProjection } from "@/components/journey/SalaryProjection";
import { ExecutiveBrief } from "@/components/journey/ExecutiveBrief";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/currency";
import { createInitialJourney, loadJourney, resetJourney, saveJourney } from "@/lib/journey-store";
import { validateResumeFile } from "@/lib/upload";
import type {
  AnalysisResult,
  CareerGoal,
  CareerPriority,
  CareerStage,
  JourneyLifeEvent,
  JourneyState,
  RiskTolerance,
  ScenarioPreference,
  WorkStyle
} from "@/types";

const fieldClass =
  "mt-2 h-11 w-full rounded-md border border-[#DCE3EA] bg-white px-3 text-sm text-[#132238] outline-none focus:border-[#155E75] focus:ring-2 focus:ring-[#D9E2EC]";

const careerStages: { value: CareerStage; label: string }[] = [
  { value: "student", label: "Student" },
  { value: "early-career", label: "Early career" },
  { value: "mid-career", label: "Mid-career" },
  { value: "senior", label: "Senior professional" }
];

const careerGoals: { value: CareerGoal; title: string; description: string; icon: typeof Target }[] = [
  { value: "specialist", title: "Deepen expertise", description: "Become known for a valuable specialty.", icon: Target },
  { value: "leadership", title: "Move into leadership", description: "Build management scope and influence.", icon: Users },
  { value: "ai-career", title: "Shift into AI", description: "Move toward AI-enabled roles.", icon: TrendingUp },
  { value: "entrepreneurship", title: "Build a venture", description: "Create an independent business.", icon: Rocket }
];

const priorities: { value: CareerPriority; title: string; description: string; icon: typeof Banknote }[] = [
  { value: "salary", title: "Higher salary", description: "Increase compensation.", icon: Banknote },
  { value: "stability", title: "Stability", description: "Reduce career risk.", icon: ShieldCheck },
  { value: "impact", title: "Meaningful work", description: "Work on important problems.", icon: Target },
  { value: "flexibility", title: "Flexibility", description: "Gain time and location freedom.", icon: Laptop }
];

const roles = [
  "Product Manager",
  "Data Product Manager",
  "AI Product Manager",
  "Engineering Manager",
  "Data Analyst",
  "Software Engineer"
];

const lifeEvents = [
  { title: "Higher education", year: 2027, cost: 800000, icon: GraduationCap },
  { title: "Relocation", year: 2028, cost: 300000, icon: BriefcaseBusiness },
  { title: "Home purchase", year: 2030, cost: 2500000, icon: Home }
];

const scenarios: { value: ScenarioPreference; title: string; description: string; icon: typeof TrendingUp }[] = [
  { value: "stable", title: "Stable growth", description: "Consistent progression with lower risk.", icon: ShieldCheck },
  { value: "high-growth", title: "High growth", description: "Faster advancement through targeted skills.", icon: TrendingUp },
  { value: "leadership", title: "Leadership", description: "Build teams and strategic ownership.", icon: Users },
  { value: "startup", title: "Entrepreneurship", description: "Trade stability for ownership.", icon: Rocket }
];

export function GuidedJourney() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [journey, setJourney] = useState<JourneyState>(createInitialJourney);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setJourney(loadJourney());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveJourney(journey);
  }, [journey, loaded]);

  function updateJourney(patch: Partial<JourneyState>) {
    setJourney((current) => ({ ...current, ...patch }));
  }

  function toggleRole(role: string) {
    const selected = journey.targetRoles.includes(role);
    updateJourney({
      targetRoles: selected
        ? journey.targetRoles.filter((item) => item !== role)
        : journey.targetRoles.length < 3
          ? [...journey.targetRoles, role]
          : journey.targetRoles
    });
  }

  function toggleEvent(option: (typeof lifeEvents)[number]) {
    const selected = journey.lifeEvents.some((event) => event.title === option.title);
    const next: JourneyLifeEvent[] = selected
      ? journey.lifeEvents.filter((event) => event.title !== option.title)
      : [...journey.lifeEvents, { id: option.title, title: option.title, year: option.year, cost: option.cost }];
    updateJourney({ lifeEvents: next });
  }

  async function analyzeResume() {
    if (!file) return setError("Choose a resume before continuing.");
    if (!journey.careerStage || !journey.currentRole || !journey.industry) {
      return setError("Complete your career stage, current role, and industry.");
    }
    try {
      setBusy(true);
      setError("");
      const formData = new FormData();
      formData.append("file", file);
      const parseResponse = await fetch("/api/parse-resume", { method: "POST", body: formData });
      const parsed = (await parseResponse.json()) as { resumeText?: string; error?: string };
      if (!parseResponse.ok || !parsed.resumeText) throw new Error(parsed.error || "Could not read resume.");
      const analysisResponse = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: parsed.resumeText })
      });
      const data = (await analysisResponse.json()) as { result?: AnalysisResult; error?: string };
      if (!analysisResponse.ok || !data.result) throw new Error(data.error || "Could not analyse resume.");
      updateJourney({
        analysis: data.result,
        analysisId: crypto.randomUUID(),
        resumeText: parsed.resumeText,
        currentStep: 2
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Resume analysis failed.");
    } finally {
      setBusy(false);
    }
  }

  const canContinue =
    journey.currentStep === 2
      ? Boolean(journey.careerGoal && journey.careerPriority && journey.workStyle && journey.targetRoles.length)
      : journey.currentStep === 3
        ? journey.targetSalary > journey.currentSalary
        : journey.currentStep === 4
          ? Boolean(journey.scenarioPreference)
          : true;

  const analysis = journey.analysis;
  const inputLabel = "block text-sm font-medium text-[#132238]";

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="container py-8">
        <div className="mx-auto max-w-6xl">
          <div className="premium-card mb-8 rounded-lg p-4">
            <JourneyProgress currentStep={journey.currentStep} />
          </div>

          <motion.div
            key={journey.currentStep}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
          {journey.currentStep === 1 ? (
            <section>
              <p className="text-sm font-semibold uppercase text-[#0F766E]">Step 1 · Profile and resume</p>
              <h1 className="mt-2 text-3xl font-semibold text-[#132238]">Tell us where you are today.</h1>
              <p className="mt-2 max-w-2xl text-[#64748B]">This context improves role matching and makes the final action plan more realistic.</p>
              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div className="premium-card rounded-lg p-6">
                  <h2 className="font-semibold text-[#132238]">Career profile</h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <label className={inputLabel}>Career stage
                      <select className={fieldClass} value={journey.careerStage ?? ""} onChange={(event) => updateJourney({ careerStage: event.target.value as CareerStage })}>
                        <option value="">Select stage</option>
                        {careerStages.map((stage) => <option key={stage.value} value={stage.value}>{stage.label}</option>)}
                      </select>
                    </label>
                    <label className={inputLabel}>Current role or education
                      <input className={fieldClass} value={journey.currentRole} onChange={(event) => updateJourney({ currentRole: event.target.value })} placeholder="Business Analyst" />
                    </label>
                    <label className={inputLabel}>Industry
                      <input className={fieldClass} value={journey.industry} onChange={(event) => updateJourney({ industry: event.target.value })} placeholder="Technology" />
                    </label>
                    <label className={inputLabel}>Location
                      <input className={fieldClass} value={journey.location} onChange={(event) => updateJourney({ location: event.target.value })} placeholder="Bengaluru" />
                    </label>
                  </div>
                </div>
                <div className="premium-card rounded-lg p-6">
                  <h2 className="font-semibold text-[#132238]">Resume</h2>
                  <button type="button" onClick={() => inputRef.current?.click()} className="mt-5 flex min-h-52 w-full flex-col items-center justify-center rounded-lg border border-dashed border-[#DCE3EA] bg-[#F7F9FC] p-6 hover:border-[#155E75]">
                    <input ref={inputRef} type="file" className="sr-only" accept=".pdf,.docx,.txt" onChange={(event) => {
                      const selected = event.target.files?.[0];
                      if (!selected) return;
                      const validationError = validateResumeFile(selected);
                      setError(validationError ?? "");
                      setFile(validationError ? null : selected);
                    }} />
                    <span className="flex h-12 w-12 items-center justify-center rounded-md bg-[#EEF2F6] text-[#155E75]">
                      {busy ? <LoaderCircle className="h-5 w-5 animate-spin" /> : file ? <CheckCircle2 className="h-5 w-5" /> : <UploadCloud className="h-5 w-5" />}
                    </span>
                    <span className="mt-4 font-medium text-[#132238]">{file?.name || "Choose resume"}</span>
                    <span className="mt-1 text-sm text-[#64748B]">PDF, DOCX, or TXT up to 10MB</span>
                  </button>
                  {error ? <p className="mt-3 text-sm text-[#B91C1C]">{error}</p> : null}
                  <Button className="mt-5 w-full bg-[#155E75] hover:bg-[#164E63]" disabled={!file || busy} onClick={analyzeResume}>{busy ? "Analysing..." : "Analyse and continue"}</Button>
                </div>
              </div>
            </section>
          ) : null}

          {journey.currentStep === 2 ? (
            <section>
              <p className="text-sm font-semibold uppercase text-[#0F766E]">Step 2 · Goals and target roles</p>
              <h1 className="mt-2 text-3xl font-semibold text-[#132238]">Define the transition you want.</h1>
              <h2 className="mt-8 font-semibold text-[#132238]">Career direction</h2>
              <div className="mt-3 grid gap-4 md:grid-cols-4">{careerGoals.map((option) => <OptionCard key={option.value} {...option} selected={journey.careerGoal === option.value} onClick={() => updateJourney({ careerGoal: option.value })} />)}</div>
              <h2 className="mt-8 font-semibold text-[#132238]">Target roles · choose up to three</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{roles.map((role) => <button key={role} type="button" onClick={() => toggleRole(role)} className={`rounded-md border p-4 text-left text-sm font-medium ${journey.targetRoles.includes(role) ? "border-[#155E75] bg-[#EAF0F5] text-[#155E75]" : "border-[#DCE3EA] bg-white text-[#132238]"}`}>{role}</button>)}</div>
              <h2 className="mt-8 font-semibold text-[#132238]">Top priority and work style</h2>
              <div className="mt-3 grid gap-4 md:grid-cols-4">{priorities.map((option) => <OptionCard key={option.value} {...option} selected={journey.careerPriority === option.value} onClick={() => updateJourney({ careerPriority: option.value })} />)}</div>
              <div className="mt-5 grid gap-3 sm:grid-cols-4">{(["remote", "hybrid", "office", "flexible"] as WorkStyle[]).map((style) => <button key={style} type="button" onClick={() => updateJourney({ workStyle: style })} className={`rounded-md border p-3 text-sm font-medium capitalize ${journey.workStyle === style ? "border-[#0F766E] bg-[#EDF2F7] text-[#0F766E]" : "border-[#DCE3EA] bg-white text-[#64748B]"}`}>{style}</button>)}</div>
            </section>
          ) : null}

          {journey.currentStep === 3 ? (
            <section>
              <p className="text-sm font-semibold uppercase text-[#0F766E]">Step 3 · Life and financial context</p>
              <h1 className="mt-2 text-3xl font-semibold text-[#132238]">Make the plan realistic for your life.</h1>
              <div className="mt-8 grid gap-5 lg:grid-cols-3">
                <div className="premium-card rounded-lg p-5"><p className="text-sm text-[#64748B]">Current annual salary</p><p className="mt-2 text-2xl font-semibold text-[#132238]">{formatINR(journey.currentSalary)}</p><input className="mt-5 w-full accent-[#155E75]" type="range" min="300000" max="5000000" step="100000" value={journey.currentSalary} onChange={(event) => updateJourney({ currentSalary: Number(event.target.value) })} /></div>
                <div className="premium-card rounded-lg p-5"><p className="text-sm text-[#64748B]">Target annual salary</p><p className="mt-2 text-2xl font-semibold text-[#0F766E]">{formatINR(journey.targetSalary)}</p><input className="mt-5 w-full accent-[#0F766E]" type="range" min="500000" max="10000000" step="100000" value={journey.targetSalary} onChange={(event) => updateJourney({ targetSalary: Number(event.target.value) })} /></div>
                <div className="premium-card rounded-lg p-5"><p className="text-sm text-[#64748B]">Transition timeframe</p><p className="mt-2 text-2xl font-semibold text-[#132238]">{journey.transitionMonths} months</p><input className="mt-5 w-full accent-[#155E75]" type="range" min="3" max="36" step="3" value={journey.transitionMonths} onChange={(event) => updateJourney({ transitionMonths: Number(event.target.value) })} /></div>
              </div>
              <h2 className="mt-8 font-semibold text-[#132238]">Major life events</h2>
              <div className="mt-3 grid gap-4 md:grid-cols-3">{lifeEvents.map((option) => <OptionCard key={option.title} title={option.title} description={`${option.year} · ${formatINR(option.cost)}`} icon={option.icon} selected={journey.lifeEvents.some((event) => event.title === option.title)} onClick={() => toggleEvent(option)} />)}</div>
            </section>
          ) : null}

          {journey.currentStep === 4 ? (
            <section>
              <p className="text-sm font-semibold uppercase text-[#0F766E]">Step 4 · Preferences</p>
              <h1 className="mt-2 text-3xl font-semibold text-[#132238]">Choose how CareerLens should shape the recommendation.</h1>
              <h2 className="mt-8 font-semibold text-[#132238]">Preferred scenario</h2>
              <div className="mt-3 grid gap-4 md:grid-cols-4">{scenarios.map((option) => <OptionCard key={option.value} {...option} selected={journey.scenarioPreference === option.value} onClick={() => updateJourney({ scenarioPreference: option.value })} />)}</div>
              <h2 className="mt-8 font-semibold text-[#132238]">Risk tolerance</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">{(["conservative", "balanced", "ambitious"] as RiskTolerance[]).map((risk) => <button key={risk} type="button" onClick={() => updateJourney({ riskTolerance: risk })} className={`rounded-md border p-4 text-sm font-medium capitalize ${journey.riskTolerance === risk ? "border-[#155E75] bg-[#EAF0F5] text-[#155E75]" : "border-[#DCE3EA] bg-white text-[#64748B]"}`}>{risk}</button>)}</div>
            </section>
          ) : null}

          {journey.currentStep === 5 && analysis ? (
            <ExecutiveBrief
              journey={journey}
              analysis={analysis}
              onEdit={() => updateJourney({ currentStep: 2 })}
              onRestart={() => {
                resetJourney();
                setJourney(createInitialJourney());
                setFile(null);
              }}
            />
          ) : null}
          </motion.div>

          {journey.currentStep > 1 && journey.currentStep < 5 ? (
            <div className="premium-card sticky bottom-4 mt-10 flex items-center justify-between rounded-lg p-4">
              <Button variant="outline" onClick={() => updateJourney({ currentStep: journey.currentStep - 1 })}>Back</Button>
              <Button disabled={!canContinue} className="bg-[#155E75] hover:bg-[#164E63]" onClick={() => updateJourney({ currentStep: journey.currentStep + 1 })}>{journey.currentStep === 4 ? "Build my report" : "Continue"}</Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
