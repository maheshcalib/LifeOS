import { CalendarDays } from "lucide-react";
import { formatINR } from "@/lib/currency";
import type { JourneyLifeEvent } from "@/types";

export function LifeTimeline({ events }: { events: JourneyLifeEvent[] }) {
  return (
    <div className="premium-card rounded-lg p-5">
      <h3 className="font-semibold text-[#132238]">Life-event timeline</h3>
      <div className="mt-5 space-y-4">
        {events.length ? (
          events.map((event) => (
            <div key={event.id} className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF0F5] text-[#0F766E]">
                <CalendarDays className="h-4 w-4" />
              </span>
              <div>
                <p className="font-medium text-[#132238]">{event.title}</p>
                <p className="text-sm text-[#64748B]">
                  {event.year} · {formatINR(event.cost)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-400">No major events selected yet.</p>
        )}
      </div>
    </div>
  );
}
