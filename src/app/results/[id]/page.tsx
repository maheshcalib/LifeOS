import { AnalysisResults } from "@/components/results/AnalysisResults";

export default function ResultsPage({ params }: { params: { id: string } }) {
  return (
    <div className="bg-[#F7F9FC]">
      <section className="mesh-bg text-white">
        <div className="container py-12">
          <p className="text-sm text-[#D9E2EC]">Analysis ID: {params.id}</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-normal">
            Analysis results
          </h1>
          <p className="mt-3 max-w-2xl text-slate-200">
            A product-grade readout of your resume, market position, AI
            exposure, and skill investment path.
          </p>
        </div>
      </section>
      <section className="container -mt-8 pb-12">
        <AnalysisResults id={params.id} />
      </section>
    </div>
  );
}
