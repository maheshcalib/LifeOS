interface MetricOrbitProps {
  metrics: {
    label: string;
    value: string;
  }[];
}

export function MetricOrbit({ metrics }: MetricOrbitProps) {
  return (
    <div className="neon-panel relative min-h-72 overflow-hidden rounded-lg p-6 text-white">
      <div className="absolute inset-0 career-grid opacity-30" />
      <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#9FB3C8] shadow-[0_0_40px_rgba(0,229,255,0.14)]" />
      <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#BCCCDC]" />
      <div className="relative z-10 flex min-h-60 items-center justify-center">
        <div className="rounded-full border border-[#9FB3C8] bg-[#EAF0F5] px-6 py-5 text-center shadow-[0_0_60px_rgba(0,229,255,0.24)]">
          <p className="text-xs uppercase text-[#627D98]">Forecast</p>
          <p className="mt-1 text-3xl font-semibold">5Y</p>
        </div>
      </div>
      {metrics.map((metric, index) => {
        const positions = [
          "left-5 top-7",
          "right-5 top-12",
          "bottom-7 left-8",
          "bottom-10 right-7"
        ];
        return (
          <div
            key={metric.label}
            className={`absolute ${positions[index % positions.length]} rounded-lg border border-white/10 bg-white/10 p-3 backdrop-blur animate-float-slow`}
            style={{ animationDelay: `${index * 0.45}s` }}
          >
            <p className="text-xs text-slate-300">{metric.label}</p>
            <p className="text-lg font-semibold">{metric.value}</p>
          </div>
        );
      })}
    </div>
  );
}
