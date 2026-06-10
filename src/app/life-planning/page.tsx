import { GoalCard } from "@/components/life/GoalCard";
import { LifeEventWizard } from "@/components/life/LifeEventWizard";
import { MetricOrbit } from "@/components/visuals/MetricOrbit";

export default function LifePlanningPage() {
  return (
    <div className="bg-[#F7F9FC]">
      <section className="container grid gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-3 inline-flex rounded-full bg-[#EDF2F7] px-3 py-1 text-sm font-medium text-[#3E6B89]">
            Life-aware career modeling
          </p>
          <h1 className="text-4xl font-semibold tracking-normal text-[#132238]">
            Plan the career around the life, not the other way around.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Combine career growth, income goals, and major life events into a
            single planning model with clearer tradeoffs.
          </p>
        </div>
        <MetricOrbit
          metrics={[
            { label: "Salary", value: "₹18L" },
            { label: "Savings", value: "18%" },
            { label: "Events", value: "3" },
            { label: "Runway", value: "42mo" }
          ]}
        />
      </section>
      <section className="container grid gap-5 pb-12 lg:grid-cols-[1fr_0.8fr]">
        <LifeEventWizard />
        <div className="space-y-4">
          <GoalCard title="Graduate program" year={2027} cost={28000} />
          <GoalCard title="Relocation" year={2028} cost={12000} />
          <GoalCard title="Home down payment" year={2030} cost={90000} />
        </div>
      </section>
    </div>
  );
}
