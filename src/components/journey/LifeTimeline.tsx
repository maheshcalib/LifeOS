import { CalendarDays, Plus, Trash2 } from "lucide-react";
import { formatINR } from "@/lib/currency";
import type { JourneyLifeEvent } from "@/types";
import { Button } from "@/components/ui/button";

const fieldClass = "h-9 w-full rounded-md border border-[#DCE3EA] bg-white px-2 text-sm text-[#132238] outline-none focus:border-[#155E75]";

export function LifeTimeline({
  events,
  onChange,
  onAdd,
  onDelete
}: {
  events: JourneyLifeEvent[];
  onChange: (id: string, patch: Partial<JourneyLifeEvent>) => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
}) {
  const ordered = [...events].sort((a, b) => a.year - b.year);
  return (
    <div className="premium-card rounded-lg p-5 lg:p-6">
      <div className="flex items-center justify-between gap-4">
        <div><p className="text-xs font-semibold uppercase text-[#3E6B89]">Your timeline</p><h3 className="mt-1 font-semibold text-[#132238]">Make every event realistic</h3></div>
        <Button variant="outline" size="sm" onClick={onAdd}><Plus />Custom event</Button>
      </div>
      <div className="mt-5 space-y-4">
        {ordered.length ? (
          ordered.map((event, index) => (
            <div key={event.id} className="relative flex gap-3 pb-3">
              {index < ordered.length - 1 ? <span className="absolute left-[18px] top-9 h-[calc(100%-20px)] w-px bg-[#B8C9D6]" /> : null}
              <span className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF0F5] text-[#0F766E]">
                <CalendarDays className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1 rounded-md border border-[#DCE3EA] bg-[#F7F9FC] p-3">
                <div className="flex items-start gap-2">
                  <input className={`${fieldClass} flex-1 font-medium`} value={event.title} onChange={(e) => onChange(event.id, { title: e.target.value })} aria-label="Event title" />
                  <Button variant="ghost" size="icon" title="Delete event" onClick={() => onDelete(event.id)}><Trash2 /></Button>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <label className="text-xs font-medium text-[#64748B]">Target year<input type="number" className={`mt-1 ${fieldClass}`} value={event.year} onChange={(e) => onChange(event.id, { year: Number(e.target.value) })} /></label>
                  <label className="text-xs font-medium text-[#64748B]">Current cost<input type="number" className={`mt-1 ${fieldClass}`} value={event.cost} onChange={(e) => onChange(event.id, { cost: Number(e.target.value) })} /></label>
                </div>
                <p className="mt-2 text-xs text-[#64748B]">{event.year} target · {formatINR(event.cost)} before inflation</p>
              </div>
            </div>
          ))
        ) : (
          <button type="button" onClick={onAdd} className="w-full rounded-md border border-dashed border-[#B8C9D6] p-6 text-sm text-[#526D82]">Add your first life event</button>
        )}
      </div>
    </div>
  );
}
