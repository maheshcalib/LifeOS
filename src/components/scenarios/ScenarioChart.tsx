interface ScenarioChartProps {
  scenarios: {
    label: string;
    salary: number;
    confidence: number;
  }[];
}

const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);

export function ScenarioChart({ scenarios }: ScenarioChartProps) {
  const maxSalary = Math.max(...scenarios.map((scenario) => scenario.salary));

  return (
    <div className="premium-card overflow-hidden rounded-lg p-5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="font-semibold text-[#132238]">Five-year scenarios</h3>
        <span className="rounded-full bg-[#EDF2F7] px-3 py-1 text-xs font-medium text-[#3E6B89]">
          Live model
        </span>
      </div>
      <div className="space-y-4">
        {scenarios.map((scenario, index) => (
          <div key={scenario.label} className="animate-rise" style={{ animationDelay: `${index * 0.08}s` }}>
            <div className="mb-2 flex justify-between gap-4 text-sm">
              <span className="font-medium text-[#132238]">{scenario.label}</span>
              <span className="text-slate-500">
                {formatINR(scenario.salary)} · {scenario.confidence}% confidence
              </span>
            </div>
            <div className="h-3 rounded-full bg-slate-100">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-[#3E6B89] to-sky-400 animate-progress-fill"
                style={{ width: `${(scenario.salary / maxSalary) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
