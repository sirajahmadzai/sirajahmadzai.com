import { NextRequest, NextResponse } from "next/server";
import { put, list } from "@vercel/blob";

interface Visitor {
  ts: string;
  ip: string;
  ua: string;
  device: string;
  browser: string;
  country: string;
  city: string;
  ref: string;
  path: string;
}

function parseUA(ua: string): { device: string; browser: string } {
  let device = "Desktop";
  if (/iPhone|iPad|iPod/i.test(ua)) device = "iOS";
  else if (/Android/i.test(ua)) device = "Android";
  else if (/Mac/i.test(ua)) device = "Mac";
  else if (/Windows/i.test(ua)) device = "Windows";
  else if (/Linux/i.test(ua)) device = "Linux";

  let browser = "Other";
  if (/Edg\//i.test(ua)) browser = "Edge";
  else if (/Chrome/i.test(ua)) browser = "Chrome";
  else if (/Safari/i.test(ua)) browser = "Safari";
  else if (/Firefox/i.test(ua)) browser = "Firefox";

  return { device, browser };
}

function hashIP(ip: string): string {
  let h = 0;
  for (let i = 0; i < ip.length; i++) {
    h = ((h << 5) - h + ip.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(36);
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const ua = req.headers.get("user-agent") || "";
    const country = req.headers.get("x-vercel-ip-country") || "";
    const city = req.headers.get("x-vercel-ip-city") || "";
    const body = await req.json().catch(() => ({}));
    const { device, browser } = parseUA(ua);

    const visitor: Visitor = {
      ts: new Date().toISOString(),
      ip: hashIP(ip),
      ua: ua.slice(0, 120),
      device,
      browser,
      country,
      city: decodeURIComponent(city),
      ref: (body.ref || "").slice(0, 200),
      path: (body.path || "/banff-trip-2026").slice(0, 100),
    };

    // Read existing log
    let visitors: Visitor[] = [];
    try {
      const { blobs } = await list({ prefix: "visitors/" });
      if (blobs.length > 0) {
        const latest = blobs.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())[0];
        const res = await fetch(latest.url);
        visitors = await res.json();
      }
    } catch {
      visitors = [];
    }

    visitors.push(visitor);

    // Keep last 500 entries
    if (visitors.length > 500) {
      visitors = visitors.slice(-500);
    }

    await put("visitors/log.json", JSON.stringify(visitors), {
      access: "public",
      addRandomSuffix: false,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const pin = req.nextUrl.searchParams.get("pin");
  if (pin !== "2026") {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const { blobs } = await list({ prefix: "visitors/" });
    if (blobs.length === 0) {
      return NextResponse.json({ visitors: [], total: 0 });
    }
    const latest = blobs.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())[0];
    const res = await fetch(latest.url);
    const visitors: Visitor[] = await res.json();

    return NextResponse.json({
      visitors: visitors.slice().reverse(),
      total: visitors.length,
    });
  } catch {
    return NextResponse.json({ visitors: [], total: 0 });
  }
}
