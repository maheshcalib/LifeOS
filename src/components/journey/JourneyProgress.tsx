import { Check } from "lucide-react";

const steps = ["Resume", "Career", "Life", "Scenario", "Report"];

export function JourneyProgress({ currentStep }: { currentStep: number }) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {steps.map((step, index) => {
        const number = index + 1;
        const active = number === currentStep;
        const complete = number < currentStep;
        return (
          <div key={step} className="min-w-0">
            <div className="mb-2 h-1 overflow-hidden rounded-full bg-slate-200">
              <div
                className={`h-full rounded-full transition-all ${
                  complete || active ? "data-line w-full" : "w-0"
                }`}
              />
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  active || complete
                    ? "bg-[#155E75] text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {complete ? <Check className="h-3.5 w-3.5" /> : number}
              </span>
              <span className={`hidden truncate text-xs sm:block ${active ? "font-semibold" : "text-slate-500"}`}>
                {step}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
