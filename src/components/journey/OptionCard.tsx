import type { LucideIcon } from "lucide-react";

interface OptionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  selected: boolean;
  onClick: () => void;
}

export function OptionCard({
  title,
  description,
  icon: Icon,
  selected,
  onClick
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-36 rounded-lg border p-5 text-left transition-all ${
        selected
          ? "border-[#155E75] bg-[#EAF0F5] shadow-sm"
          : "border-[#DCE3EA] bg-white hover:border-slate-400 hover:shadow-sm"
      }`}
    >
      <span className={`flex h-11 w-11 items-center justify-center rounded-md ${selected ? "bg-[#155E75] text-white" : "bg-[#EEF2F6] text-[#155E75]"}`}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="mt-4 block font-semibold text-[#132238]">{title}</span>
      <span className="mt-1 block text-sm leading-5 text-[#64748B]">{description}</span>
    </button>
  );
}
