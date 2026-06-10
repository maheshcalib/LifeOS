"use client";

import { useEffect, useMemo, useState } from "react";
import { Banknote, Home, Landmark, LoaderCircle, Plus, Save, ShieldCheck, Sparkles, Trash2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/currency";
import { calculateFinancialPlan } from "@/lib/financial-plan";
import type { FinancialGoal, FinancialPlanInput, FinancialRiskPreference } from "@/types";

const currentYear = new Date().getFullYear();
const fieldClass = "mt-2 h-10 w-full rounded-md border border-[#D9E2EC] bg-white px-3 text-sm text-[#102A43] outline-none focus:border-[#315A75]";

const demoGoals: FinancialGoal[] = [
  { id: "emergency", type: "emergency", title: "Emergency fund", targetAmount: 450000, targetYear: currentYear + 1, existingCorpus: 100000, priority: 1 },
  { id: "home", type: "home", title: "Home down payment", targetAmount: 3000000, targetYear: currentYear + 5, existingCorpus: 300000, priority: 2 },
  { id: "education", type: "education", title: "Graduate program", targetAmount: 1200000, targetYear: currentYear + 3, existingCorpus: 150000, priority: 3 }
];

export function CorpusPlanner({ selectedGrowth = 12 }: { selectedGrowth?: number }) {
  const [input, setInput] = useState<FinancialPlanInput>({
    monthlyIncome: 120000,
    monthlyExpenses: 65000,
    debtEmi: 5000,
    existingSavings: 250000,
    existingInvestments: 300000,
    riskPreference: "balanced",
    emergencyFundMonths: 6,
    selectedPathIncomeGrowth: selectedGrowth,
    assumptions: { inflation: 6, liquidReturn: 4, debtReturn: 7, growthReturn: 11, currentIncomeGrowth: 6 },
    goals: demoGoals
  });
  const [busy, setBusy] = useState<"explain" | "save" | null>(null);
  const [explanation, setExplanation] = useState<{ summary?: string; nextActions?: string[] } | null>(null);
  const [message, setMessage] = useState("");
  const [planId, setPlanId] = useState<string | null>(null);
  const [planName, setPlanName] = useState(`Life plan · ${new Date().toLocaleDateString("en-IN")}`);
  const result = useMemo(() => calculateFinancialPlan(input, currentYear), [input]);

  useEffect(() => {
    const openPlan = sessionStorage.getItem("lifeos:open-financial-plan");
    const pendingPlan = sessionStorage.getItem("lifeos:pending-financial-plan");
    const stored = openPlan || pendingPlan;
    if (!stored) return;

    try {
      const plan = JSON.parse(stored) as {
        id?: string;
        name?: string;
        inputs?: FinancialPlanInput;
        input?: FinancialPlanInput;
        ai_explanation?: { summary?: string; nextActions?: string[] };
        explanation?: { summary?: string; nextActions?: string[] };
      };
      const restoredInput = plan.inputs || plan.input;
      if (restoredInput) setInput(restoredInput);
      setPlanId(plan.id || null);
      if (plan.name) setPlanName(plan.name);
      setExplanation(plan.ai_explanation || plan.explanation || null);
      setMessage(openPlan ? "Saved plan opened. Changes will update this plan." : "Draft restored after sign-in. Save it to add it to your account.");
    } catch {
      setMessage("The saved draft could not be restored.");
    } finally {
      sessionStorage.removeItem("lifeos:open-financial-plan");
      sessionStorage.removeItem("lifeos:pending-financial-plan");
    }
  }, []);

  function update<K extends keyof FinancialPlanInput>(key: K, value: FinancialPlanInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
  }
  function updateGoal(id: string, patch: Partial<FinancialGoal>) {
    update("goals", input.goals.map((goal) => goal.id === id ? { ...goal, ...patch } : goal));
  }
  function addGoal() {
    update("goals", [...input.goals, { id: crypto.randomUUID(), type: "custom", title: "New goal", targetAmount: 500000, targetYear: currentYear + 3, existingCorpus: 0, priority: input.goals.length + 1 }]);
  }
  async function explain() {
    setBusy("explain");
    try {
      const response = await fetch("/api/financial-explanation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ result }) });
      const data = await response.json();
      setExplanation(data.explanation || null);
    } finally {
      setBusy(null);
    }
  }
  async function save() {
    setBusy("save");
    setMessage("");
    try {
      const response = await fetch("/api/financial-plans", {
        method: planId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: planId, name: planName, inputs: input, results: result, aiExplanation: explanation })
      });
      if (response.status === 401) {
        sessionStorage.setItem("lifeos:pending-financial-plan", JSON.stringify({ name: planName, input, result, explanation }));
        window.location.href = "/login?next=/life-planning";
        return;
      }
      const data = await response.json();
      if (response.ok) {
        setPlanId(data.plan.id);
        setMessage(planId ? "Plan updated." : "Plan saved to your account.");
      } else {
        setMessage(data.error || "Could not save plan.");
      }
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-lg border border-[#D9E2EC] bg-white p-5">
          <div className="flex items-end justify-between gap-4">
            <div><p className="text-xs font-bold uppercase text-[#315A75]">Financial capacity</p><h2 className="mt-1 text-xl font-semibold text-[#102A43]">{planId ? "Editing saved plan" : "Build your plan"}</h2></div>
            <label className="max-w-52 text-xs font-medium text-[#526D82]">Plan name<input className={fieldClass} value={planName} onChange={(event) => setPlanName(event.target.value)} /></label>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              ["Monthly income", "monthlyIncome"],
              ["Monthly expenses", "monthlyExpenses"],
              ["Debt EMI", "debtEmi"],
              ["Existing savings", "existingSavings"],
              ["Current investments", "existingInvestments"]
            ].map(([label, key]) => (
              <label key={key} className="text-sm font-medium text-[#102A43]">{label}
                <input type="number" className={fieldClass} value={input[key as keyof FinancialPlanInput] as number} onChange={(event) => update(key as keyof FinancialPlanInput, Number(event.target.value) as never)} />
              </label>
            ))}
            <label className="text-sm font-medium text-[#102A43]">Risk preference
              <select className={fieldClass} value={input.riskPreference} onChange={(event) => update("riskPreference", event.target.value as FinancialRiskPreference)}>
                <option value="conservative">Conservative</option><option value="balanced">Balanced</option><option value="growth">Growth</option>
              </select>
            </label>
          </div>
        </div>
        <div className="rounded-lg border border-[#315A75] bg-[#102A43] p-5 text-white">
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-xs font-bold uppercase text-[#A9C1D3]">Career-to-corpus comparison</p><h2 className="mt-2 text-2xl font-semibold text-white">Your selected path creates {formatINR(result.careerPathAdvantage)} more corpus.</h2></div>
            <TrendingUp className="h-6 w-6 text-[#A9C1D3]" />
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-md bg-[#071A2B] p-4"><p className="text-xs text-[#A9C1D3]">Available monthly savings</p><p className="mt-2 text-xl font-semibold">{formatINR(result.availableMonthlySavings)}</p></div>
            <div className="rounded-md bg-[#071A2B] p-4"><p className="text-xs text-[#A9C1D3]">Current path · 5 years</p><p className="mt-2 text-xl font-semibold">{formatINR(result.currentPathFiveYearCorpus)}</p></div>
            <div className="rounded-md border border-[#8FB3C9] bg-[#315A75] p-4"><p className="text-xs text-[#D9E2EC]">Selected path · 5 years</p><p className="mt-2 text-xl font-semibold">{formatINR(result.selectedPathFiveYearCorpus)}</p></div>
          </div>
          <label className="mt-6 block text-sm font-medium text-white">Selected career income growth · {input.selectedPathIncomeGrowth}%
            <input type="range" min="6" max="20" value={input.selectedPathIncomeGrowth} onChange={(event) => update("selectedPathIncomeGrowth", Number(event.target.value))} className="mt-3 w-full accent-white" />
          </label>
        </div>
      </section>

      <section className="rounded-lg border border-[#D9E2EC] bg-white p-5">
        <div className="flex items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase text-[#315A75]">Goal feasibility map</p><h2 className="mt-1 text-xl font-semibold text-[#102A43]">Fund goals in priority order</h2></div><Button variant="outline" onClick={addGoal}><Plus />Add goal</Button></div>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {result.goals.map((goal) => (
            <article key={goal.id} className="rounded-lg border border-[#D9E2EC] bg-[#F7F9FC] p-4">
              <div className="flex items-start justify-between gap-3">
                <span className={`flex h-9 w-9 items-center justify-center rounded-md ${goal.status === "on-track" ? "bg-green-100 text-[#116438]" : goal.status === "gap" ? "bg-amber-100 text-[#8A5A00]" : "bg-red-100 text-[#9F1C14]"}`}>{goal.type === "emergency" ? <ShieldCheck /> : goal.type === "home" ? <Home /> : <Landmark />}</span>
                <Button size="icon" variant="ghost" title="Delete goal" onClick={() => update("goals", input.goals.filter((item) => item.id !== goal.id))}><Trash2 /></Button>
              </div>
              <input className="mt-4 w-full bg-transparent font-semibold text-[#102A43] outline-none" value={goal.title} onChange={(event) => updateGoal(goal.id, { title: event.target.value })} />
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#D9E2EC]"><div className={`h-full rounded-full ${goal.status === "on-track" ? "bg-[#157347]" : goal.status === "gap" ? "bg-[#B7791F]" : "bg-[#B42318]"}`} style={{ width: `${Math.min(100, goal.fundingRatio * 100)}%` }} /></div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-[#526D82]">
                <div><p>Future target</p><p className="mt-1 font-semibold text-[#102A43]">{formatINR(goal.futureTarget)}</p></div>
                <div><p>Required monthly</p><p className="mt-1 font-semibold text-[#102A43]">{formatINR(goal.requiredMonthly)}</p></div>
                <div><p>Allocated monthly</p><p className="mt-1 font-semibold text-[#102A43]">{formatINR(goal.allocatedMonthly)}</p></div>
                <div><p>Target year</p><input type="number" className="mt-1 w-full bg-transparent font-semibold text-[#102A43] outline-none" value={goal.targetYear} onChange={(event) => updateGoal(goal.id, { targetYear: Number(event.target.value) })} /></div>
              </div>
              <p className="mt-4 rounded-md bg-white p-3 text-xs font-medium text-[#526D82]">{goal.categoryGuidance}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-lg border border-[#D9E2EC] bg-white p-5">
          <p className="flex items-center gap-2 text-xs font-bold uppercase text-[#315A75]"><Sparkles className="h-4 w-4" />Editable assumptions</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {Object.entries(input.assumptions).map(([key, value]) => <label key={key} className="text-xs font-medium capitalize text-[#526D82]">{key.replace(/([A-Z])/g, " $1")}<input type="number" className={fieldClass} value={value} onChange={(event) => update("assumptions", { ...input.assumptions, [key]: Number(event.target.value) })} /></label>)}
          </div>
        </div>
        <div className="rounded-lg border border-[#D9E2EC] bg-[#F4F7FA] p-5">
          <p className="flex items-center gap-2 text-xs font-bold uppercase text-[#315A75]"><Banknote className="h-4 w-4" />Educational guidance</p>
          <p className="mt-3 text-sm leading-6 text-[#526D82]">LifeOS uses broad savings categories and editable assumptions. Returns are estimates, not guarantees. This planner does not recommend named investment products.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button variant="outline" disabled={busy === "explain"} onClick={explain}>{busy === "explain" ? <LoaderCircle className="animate-spin" /> : <Sparkles />}Explain my plan</Button>
            <Button className="bg-[#102A43] hover:bg-[#071A2B]" disabled={busy === "save"} onClick={save}>{busy === "save" ? <LoaderCircle className="animate-spin" /> : <Save />}Save plan</Button>
          </div>
          {explanation?.summary ? <div className="mt-4 rounded-md bg-white p-4 text-sm leading-6 text-[#526D82]"><p>{explanation.summary}</p>{explanation.nextActions?.map((action) => <p key={action} className="mt-2">• {action}</p>)}</div> : null}
          {message ? <p className="mt-3 text-sm text-[#526D82]">{message}</p> : null}
        </div>
      </section>
    </div>
  );
}
