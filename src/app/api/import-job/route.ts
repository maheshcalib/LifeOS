import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { NextResponse } from "next/server";
import { extractJobDescription, validateJobUrl } from "@/lib/job-import";

export const runtime = "nodejs";

function isPrivateAddress(address: string) {
  return (
    address === "::1" ||
    address.startsWith("10.") ||
    address.startsWith("127.") ||
    address.startsWith("192.168.") ||
    address.startsWith("169.254.") ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(address) ||
    /^f[cd]/i.test(address)
  );
}

async function assertPublicHost(url: URL) {
  if (isIP(url.hostname) && isPrivateAddress(url.hostname)) {
    throw new Error("Use a public job listing URL.");
  }
  const addresses = await lookup(url.hostname, { all: true });
  if (!addresses.length || addresses.some(({ address }) => isPrivateAddress(address))) {
    throw new Error("Use a public job listing URL.");
  }
}

async function fetchJobPage(initialUrl: string) {
  let url = validateJobUrl(initialUrl);
  for (let redirect = 0; redirect <= 3; redirect += 1) {
    await assertPublicHost(url);
    const response = await fetch(url, {
      redirect: "manual",
      headers: { "User-Agent": "CareerLens Job Importer/1.0" },
      signal: AbortSignal.timeout(8000)
    });
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      const location = response.headers.get("location");
      if (!location || redirect === 3) throw new Error("The job listing redirected too many times.");
      url = validateJobUrl(new URL(location, url).toString());
      continue;
    }
    if (!response.ok) throw new Error(`The job listing returned HTTP ${response.status}.`);
    const contentLength = Number(response.headers.get("content-length") || 0);
    if (contentLength > 1_500_000) throw new Error("The job listing page is too large.");
    const html = await response.text();
    if (html.length > 1_500_000) throw new Error("The job listing page is too large.");
    return { html, url: url.toString() };
  }
  throw new Error("The job listing could not be imported.");
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { url?: string } | null;
  if (!body?.url) return NextResponse.json({ error: "Job listing URL is required." }, { status: 400 });

  try {
    const { html, url } = await fetchJobPage(body.url);
    return NextResponse.json({ job: { ...extractJobDescription(html), sourceUrl: url } });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "The job listing could not be imported.",
        pasteFallback: true
      },
      { status: 422 }
    );
  }
}
