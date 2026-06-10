import { MagicLinkForm } from "@/components/auth/MagicLinkForm";

export default function LoginPage({ searchParams }: { searchParams: { next?: string } }) {
  return <div className="container flex min-h-[70vh] items-center justify-center py-12"><div className="w-full max-w-md"><MagicLinkForm next={searchParams.next} /></div></div>;
}
