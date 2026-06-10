import { Progress } from "@/components/ui/progress";

interface CareerHealthScoreProps {
  score: number;
}

export function CareerHealthScore({ score }: CareerHealthScoreProps) {
  const label = score >= 80 ? "Strong" : score >= 60 ? "Developing" : "At risk";

  return (
    <div className="premium-card relative overflow-hidden rounded-lg p-5">
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#EAF0F5] blur-2xl" />
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="relative">
          <p className="text-sm text-slate-400">Career health score</p>
          <p className="mt-1 text-4xl font-semibold text-[#132238]">{score}</p>
        </div>
        <span className="relative rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-[#15803D]">
          {label}
        </span>
      </div>
      <Progress value={score} className="relative h-2" />
    </div>
  );
}
