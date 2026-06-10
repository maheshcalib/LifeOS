"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FolderOpen, LoaderCircle, Trash2, WalletCards } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/currency";
import type { FinancialPlanInput, FinancialPlanResult } from "@/types";

interface SavedPlan {
  id: string;
  name: string;
  inputs: FinancialPlanInput;
  results: FinancialPlanResult;
  ai_explanation?: { summary?: string; nextActions?: string[] };
  updated_at: string;
}

export function SavedFinancialPlans() {
  const router = useRouter();
  const [plans, setPlans] = useState<SavedPlan[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "signed-out" | "error">("loading");
  const [deleting, setDeleting] = useState<string | null>(null);

  async function loadPlans() {
    const response = await fetch("/api/financial-plans");
    if (response.status === 401) {
      setState("signed-out");
      return;
    }
    const data = await response.json();
    setPlans(data.plans || []);
    setState(response.ok ? "ready" : "error");
  }

  useEffect(() => {
    void loadPlans();
  }, []);

  function openPlan(plan: SavedPlan) {
    sessionStorage.setItem("lifeos:open-financial-plan", JSON.stringify(plan));
    router.push("/life-planning");
  }

  async function deletePlan(id: string) {
    setDeleting(id);
    const response = await fetch(`/api/financial-plans?id=${id}`, { method: "DELETE" });
    if (response.ok) setPlans((current) => current.filter((plan) => plan.id !== id));
    setDeleting(null);
  }

  if (state === "loading") return <div className="mt-5 flex items-center gap-2 text-sm text-[#526D82]"><LoaderCircle className="h-4 w-4 animate-spin" />Loading saved plans</div>;

  return (
    <section className="mt-5 rounded-lg border border-[#D9E2EC] bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div><p className="text-xs font-bold uppercase text-[#315A75]">Career-to-corpus</p><h2 className="mt-1 text-xl font-semibold text-[#102A43]">Saved financial plans</h2></div>
        <Button className="bg-[#102A43] hover:bg-[#071A2B]" onClick={() => router.push("/life-planning")}><WalletCards />New plan</Button>
      </div>
      {state === "signed-out" ? <p className="mt-5 text-sm text-[#526D82]">Sign in when saving a plan to access it here across devices.</p> : null}
      {state === "error" ? <p className="mt-5 text-sm text-[#9F1C14]">Saved plans could not be loaded.</p> : null}
      {state === "ready" && plans.length === 0 ? <p className="mt-5 text-sm text-[#526D82]">No saved plans yet. Create one to connect your career path with your financial goals.</p> : null}
      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        {plans.map((plan) => (
          <article key={plan.id} className="flex items-center justify-between gap-4 rounded-lg border border-[#D9E2EC] bg-[#F7F9FC] p-4">
            <div className="min-w-0">
              <p className="truncate font-semibold text-[#102A43]">{plan.name}</p>
              <p className="mt-1 text-sm text-[#526D82]">{plan.inputs.goals.length} goals · {formatINR(plan.results.selectedPathFiveYearCorpus)} projected in 5 years</p>
            </div>
            <div className="flex shrink-0 gap-1">
              <Button size="icon" variant="ghost" title="Open plan" onClick={() => openPlan(plan)}><FolderOpen /></Button>
              <Button size="icon" variant="ghost" title="Delete plan" disabled={deleting === plan.id} onClick={() => deletePlan(plan.id)}>{deleting === plan.id ? <LoaderCircle className="animate-spin" /> : <Trash2 />}</Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
