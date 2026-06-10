import Link from "next/link";
import { BrandMark } from "@/components/layout/BrandMark";

export function Footer() {
  return (
    <footer className="border-t border-[#DCE3EA] bg-[#071A2B] text-[#C4D4DF]">
      <div className="container flex flex-col gap-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" aria-label="LifeOS home">
          <BrandMark inverted />
        </Link>
        <div className="sm:text-right">
          <p className="font-semibold text-white">See the role. Build the evidence. Make the move.</p>
          <p className="mt-1">AI career planning, resume intelligence, and future scenarios.</p>
        </div>
      </div>
    </footer>
  );
}
