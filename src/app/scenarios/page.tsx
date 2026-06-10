import { ScenarioChart } from "@/components/scenarios/ScenarioChart";
import { MetricOrbit } from "@/components/visuals/MetricOrbit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ScenariosPage() {
  return (
    <div className="bg-[#F7F9FC]">
      <section className="mesh-bg text-white">
        <div className="container grid gap-8 py-12 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase text-[#D9E2EC]">
              Future simulation
            </p>
            <h1 className="text-4xl font-semibold tracking-normal">
              Five-year scenarios
            </h1>
            <p className="mt-3 max-w-2xl text-slate-200">
              Compare possible career paths across salary, resilience, and
              learning investment.
            </p>
          </div>
          <MetricOrbit
            metrics={[
              { label: "Upside", value: "₹18L" },
              { label: "Risk", value: "Med" },
              { label: "Paths", value: "3" },
              { label: "Horizon", value: "5Y" }
            ]}
          />
        </div>
      </section>
      <section className="container -mt-8 grid gap-5 pb-12 lg:grid-cols-[1fr_0.8fr]">
        <ScenarioChart
          scenarios={[
            { label: "Stay and specialize", salary: 2200000, confidence: 72 },
            { label: "Move into AI product", salary: 3200000, confidence: 64 },
            { label: "Leadership track", salary: 4000000, confidence: 58 }
          ]}
        />
        <Card className="premium-card rounded-lg">
          <CardHeader>
            <CardTitle className="text-[#132238]">Scenario notes</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-6 text-slate-600">
            The AI product path has higher upside but requires faster portfolio
            building. The leadership path depends more heavily on management
            scope and timing.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
