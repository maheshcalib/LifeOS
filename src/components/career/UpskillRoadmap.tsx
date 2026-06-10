import { CheckCircle2 } from "lucide-react";

interface RoadmapItem {
  title: string;
  timeframe: string;
  priority: string;
}

export function UpskillRoadmap({ items }: { items: RoadmapItem[] }) {
  return (
    <div className="premium-card rounded-lg p-5">
      <h3 className="mb-5 font-semibold text-[#132238]">Upskilling roadmap</h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={item.title} className="flex gap-3 animate-rise" style={{ animationDelay: `${index * 0.08}s` }}>
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-[#15803D]" aria-hidden="true" />
            <div>
              <p className="font-medium text-[#132238]">{item.title}</p>
              <p className="text-sm text-slate-400">
                {item.timeframe} · {item.priority} priority
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
