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
  region: string;
  ref: string;
  path: string;
  screen: string;
  lang: string;
  tz: string;
  connection: string;
  returning: boolean;
}

function parseUA(ua: string): { device: string; browser: string } {
  let device = "Desktop";
  const isMobile = /Mobile|Android|iPhone|iPod|iPad|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  if (/iPhone|iPod/i.test(ua)) device = "iPhone";
  else if (/iPad/i.test(ua)) device = "iPad";
  else if (/Android/i.test(ua) && isMobile) device = "Android";
  else if (/Android/i.test(ua)) device = "Android Tablet";
  else if (/Mac/i.test(ua) && isMobile) device = "iPhone";
  else if (/Mac/i.test(ua)) device = "Mac";
  else if (/Windows/i.test(ua)) device = "Windows";
  else if (/Linux/i.test(ua)) device = "Linux";
  else if (isMobile) device = "Mobile";

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

async function readLog(): Promise<Visitor[]> {
  try {
    const { blobs } = await list({ prefix: "visitors/" });
    if (blobs.length === 0) return [];
    const sorted = blobs.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
    const url = sorted[0].url;
    const res = await fetch(url + "?t=" + Date.now(), { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

async function writeLog(visitors: Visitor[]): Promise<void> {
  await put("visitors/log.json", JSON.stringify(visitors), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const ua = req.headers.get("user-agent") || "";
    const country = req.headers.get("x-vercel-ip-country") || "";
    const city = req.headers.get("x-vercel-ip-city") || "";
    const region = req.headers.get("x-vercel-ip-country-region") || "";
    const body = await req.json().catch(() => ({}));
    const { device, browser } = parseUA(ua);
    const hashedIP = hashIP(ip);

    // Check if returning visitor
    let visitors = await readLog();
    const returning = visitors.some((v) => v.ip === hashedIP);

    const visitor: Visitor = {
      ts: new Date().toISOString(),
      ip: hashedIP,
      ua: ua.slice(0, 200),
      device,
      browser,
      country,
      city: decodeURIComponent(city),
      region: decodeURIComponent(region),
      ref: (body.ref || "").slice(0, 200),
      path: (body.path || "/banff-trip-2026").slice(0, 100),
      screen: (body.screen || "").slice(0, 20),
      lang: (body.lang || "").slice(0, 10),
      tz: (body.tz || "").slice(0, 40),
      connection: (body.connection || "").slice(0, 10),
      returning,
    };

    visitors.push(visitor);

    // Keep last 500 entries
    if (visitors.length > 500) {
      visitors = visitors.slice(-500);
    }

    await writeLog(visitors);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    console.error("Track POST error:", e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const pin = req.nextUrl.searchParams.get("pin");
  if (pin !== "5405") {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const visitors = await readLog();
    return NextResponse.json({
      visitors: visitors.slice().reverse(),
      total: visitors.length,
    });
  } catch {
    return NextResponse.json({ visitors: [], total: 0 });
  }
}
