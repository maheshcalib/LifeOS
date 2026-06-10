import { ResumeTailor } from "@/components/tailor/ResumeTailor";

export default function TailorPage({
  searchParams
}: {
  searchParams: { role?: string };
}) {
  return <ResumeTailor initialRole={searchParams.role || ""} />;
}
