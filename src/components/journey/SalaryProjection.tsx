import { formatINR } from "@/lib/currency";

export function SalaryProjection({
  currentSalary,
  targetSalary
}: {
  currentSalary: number;
  targetSalary: number;
}) {
  const values = Array.from({ length: 6 }, (_, index) =>
    Math.round(currentSalary + ((targetSalary - currentSalary) * index) / 5)
  );
  const max = Math.max(...values);

  return (
    <div className="premium-card rounded-lg p-5">
      <h3 className="font-semibold text-[#132238]">Five-year salary projection</h3>
      <div className="mt-6 flex h-52 items-end gap-3">
        {values.map((value, index) => (
          <div key={index} className="flex min-w-0 flex-1 flex-col items-center gap-2">
            <span className="hidden text-[10px] text-[#64748B] sm:block">
              {formatINR(value)}
            </span>
            <div className="flex h-36 w-full items-end rounded-md bg-[#EEF2F6]">
              <div
                className="w-full rounded-md bg-[#0F766E] animate-progress-fill"
                style={{ height: `${Math.max(20, (value / max) * 100)}%` }}
              />
            </div>
            <span className="text-xs font-medium text-[#64748B]">Y{index}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
