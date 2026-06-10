import { Orbit } from "lucide-react";

export function BrandMark({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-2.5" aria-label="LifeOS">
      <span className={`flex h-10 w-10 items-center justify-center rounded-md ${inverted ? "bg-white text-[#102A43]" : "bg-[#102A43] text-white"}`}>
        <Orbit className="h-6 w-6" aria-hidden="true" />
      </span>
      <span className={`text-xl font-semibold ${inverted ? "text-white" : "text-[#102A43]"}`}>
        Life<span className={inverted ? "text-[#A9C1D3]" : "text-[#315A75]"}>OS</span>
      </span>
    </span>
  );
}
