"use client";

import { useState, useEffect, useCallback } from "react";
import { Analytics } from "@vercel/analytics/react";

const ADMIN_PIN = "5405";

interface VisitorEntry {
  ts: string;
  ip: string;
  device: string;
  browser: string;
  country: string;
  city: string;
  region: string;
  lat: string;
  lng: string;
  ref: string;
  path: string;
  screen: string;
  lang: string;
  tz: string;
  connection: string;
  returning: boolean;
  fingerprint: string;
  gpu: string;
  cores: number;
  ram: number;
  dpr: number;
  touch: number;
  depth: number;
  platform: string;
  battery: string;
  adblock: boolean;
}

const days = [
  {
    day: 1,
    title: "Stittsville to Sault Ste Marie",
    subtitle: "800 km \u2022 ~8 hrs driving \u2022 Hwy 417 to Hwy 17 West",
    route: "Stittsville \u2192 Sudbury \u2192 Sault Ste Marie",
    items: [
      { time: "5:30 AM", text: "Meet at the Stittsville pickup point. Fajr prayer. Everyone catches up, loads bags and coolers into the SUVs. Figure out who rides where. Groceries and coolers already packed from the night before (Bilal Farms run). This easily takes 30-45 min with 15-20 guys.", tags: ["prayer"] },
      { time: "6:30 AM", text: "DEPART. Hwy 417 West to Trans-Canada. Lead SUV sets the pace, tail SUV makes sure nobody falls behind. All coordination through the WhatsApp group.", tags: ["drive"] },
      { time: "9:00 AM", text: "Pit stop #1: Gas + bathrooms. Deep River/Mattawa area (~250 km, ~2.5 hrs in). 20 min.", tags: ["drive"] },
      { time: "12:00 PM", text: "Lunch stop: Sudbury area (~480 km in). Packed food from coolers. Dhuhr prayer. 45 min.", tags: ["food", "prayer"] },
      { time: "2:30 PM", text: "Pit stop #2: Gas + stretch. Blind River area (~2 hrs after Sudbury).", tags: ["drive"] },
      { time: "4:30 PM", text: "ARRIVE SAULT STE MARIE.", tags: ["drive"] },
      { time: "5:00 PM", text: "Asr prayer. Check in: Super 8 Sault Ste Marie (~$120/night). 8-10 rooms, request same floor. Designate one room as the hangout room.", tags: ["prayer", "hotel"] },
      { time: "6:00 PM", text: "Dinner: Soo Shawarma (129 Second Line W). Call ahead for group of 20. If closed, eat packed food from coolers.", tags: ["food"] },
      { time: "7:30 PM", text: "Walk the boardwalk along St. Marys River. Free. Good stretch for everyone after a long drive.", tags: ["activity"] },
      { time: "9:00 PM", text: "Isha prayer. Ice resupply for coolers. Hangout room. Early sleep.", tags: ["prayer"] },
    ],
  },
  {
    day: 2,
    title: "Sault Ste Marie to Thunder Bay",
    subtitle: "840 km \u2022 ~9.5 hrs driving \u2022 Hwy 17 North \u2022 LONGEST DAY",
    route: "Sault Ste Marie \u2192 Wawa \u2192 White River \u2192 Marathon \u2192 Nipigon \u2192 Thunder Bay",
    items: [
      { time: "9:00 AM", text: "Wake up. Grab hotel breakfast or eat from coolers. Pack the cars, ice the coolers.", tags: ["food"] },
      { time: "10:00 AM", text: "DEPART. LONGEST DAY. Gas stations get sparse north of SSM. Top off ALL vehicles before leaving.", tags: ["drive"] },
      { time: "12:30 PM", text: "Pit stop: Wawa (~230 km). Gas + stretch. PHOTO STOP: Wawa Goose (giant Canada goose statue). Younger ones will love it. 20 min.", tags: ["drive", "photo"] },
      { time: "2:30 PM", text: "Pit stop: White River area (~400 km). Gas. 'Coldest Spot in Canada' sign photo.", tags: ["drive", "photo"] },
      { time: "3:30 PM", text: "Lunch: Marathon area (~530 km). Packed lunch from coolers. 45 min.", tags: ["food"] },
      { time: "4:15 PM", text: "Continue. Nipigon area. Gas if needed.", tags: ["drive"] },
      { time: "7:30 PM", text: "ARRIVE THUNDER BAY. Terry Fox Memorial right before town. Group photo. 15 min.", tags: ["drive", "photo"] },
      { time: "8:00 PM", text: "Check in: Super 8 Thunder Bay (~$120/night) or Travelodge. Same floor, designate hangout room.", tags: ["hotel"] },
      { time: "8:30 PM", text: "Dinner: Malabar Mandi Kitchen (108 Frederica St E, 4.6 stars). Call ahead for group size. Otherwise packed food from coolers.", tags: ["food"] },
      { time: "10:00 PM", text: "Hangout room. Rest. Everyone will be tired.", tags: [] },
    ],
  },
  {
    day: 3,
    title: "Thunder Bay to Winnipeg",
    subtitle: "700 km \u2022 ~7.5 hrs driving \u2022 Hwy 17 to Trans-Canada Hwy 1",
    route: "Thunder Bay \u2192 Ignace \u2192 Kenora \u2192 Winnipeg",
    items: [
      { time: "9:00 AM", text: "Wake up. Breakfast from hotel or coolers.", tags: ["food"] },
      { time: "10:00 AM", text: "DEPART. Long stretch of Canadian Shield ahead.", tags: ["drive"] },
      { time: "12:30 PM", text: "Pit stop: Ignace area (~250 km in). Gas + stretch. 20 min.", tags: ["drive"] },
      { time: "2:30 PM", text: "Kenora, ON (~490 km). Gas. Quick Lake of the Woods waterfront look. Lunch from coolers.", tags: ["drive", "food"] },
      { time: "3:15 PM", text: "Cross Manitoba border. Welcome sign photo.", tags: ["photo"] },
      { time: "5:30 PM", text: "ARRIVE WINNIPEG.", tags: ["drive"] },
      { time: "5:45 PM", text: "GROCERY STOP #2: Basha Foods International, Winnipeg. Major restock for Days 3-5. Refill cooler ice.", tags: ["food"] },
      { time: "6:30 PM", text: "Check in: Super 8 Winnipeg (~$110/night) or Days Inn. Same floor, designate hangout room.", tags: ["hotel"] },
      { time: "7:00 PM", text: "The Forks. Free. Market, riverfront, open grass. All ages. Walk around, explore. 1.5 hours.", tags: ["activity"] },
      { time: "8:30 PM", text: "Dinner: Falafel Place (Pembina Hwy) or Ashur Restaurant (584 Pembina Hwy, Middle Eastern).", tags: ["food"] },
      { time: "10:00 PM", text: "Hangout room. Winnipeg is your midpoint recovery city.", tags: [] },
    ],
  },
  {
    day: 4,
    title: "Winnipeg to Regina",
    subtitle: "575 km \u2022 ~6 hrs driving \u2022 Trans-Canada Hwy 1",
    route: "Winnipeg \u2192 Brandon \u2192 Regina",
    items: [
      { time: "9:00 AM", text: "Wake up. Breakfast.", tags: ["food"] },
      { time: "10:00 AM", text: "DEPART. Shortest drive day. Recovery pace.", tags: ["drive"] },
      { time: "12:00 PM", text: "Pit stop: Brandon, MB (~210 km). Gas + stretch + snack from coolers.", tags: ["drive"] },
      { time: "1:30 PM", text: "Cross Saskatchewan border. Welcome sign photo. The Prairies are flat, endless, and beautiful. Windows down.", tags: ["drive", "photo"] },
      { time: "4:00 PM", text: "ARRIVE REGINA.", tags: ["drive"] },
      { time: "4:15 PM", text: "Check in: Motel 6 Regina (~$100/night) or Super 8. Same floor, designate hangout room.", tags: ["hotel"] },
      { time: "5:00 PM", text: "Lunch/early dinner: Afghan Cuisine Restaurant (832 Albert St) or Amado’s Meat & Food Market (251 Albert St).", tags: ["food"] },
      { time: "6:00 PM", text: "RCMP Heritage Centre. $10/person. Interactive, educational. Great for all ages. 1.5 hours.", tags: ["activity"] },
      { time: "7:30 PM", text: "Wascana Park. Free. Walk the lake, stretch legs. 1 hour.", tags: ["activity"] },
      { time: "8:30 PM", text: "Dinner from packed food or try another local spot.", tags: ["food"] },
      { time: "10:00 PM", text: "Hangout room. Rest. Tomorrow is a long push to the mountains.", tags: [] },
    ],
  },
  {
    day: 5,
    title: "Regina to Canmore (via Calgary)",
    subtitle: "865 km \u2022 ~8.5 hrs driving \u2022 Trans-Canada Hwy 1",
    route: "Regina \u2192 Swift Current \u2192 Medicine Hat \u2192 Calgary \u2192 Canmore",
    items: [
      { time: "9:00 AM", text: "Wake up. Breakfast from coolers. Today you hit the Rockies.", tags: ["food"] },
      { time: "10:00 AM", text: "DEPART. Long day but the reward is mountains.", tags: ["drive"] },
      { time: "12:30 PM", text: "Pit stop: Swift Current, SK (~250 km). Gas + stretch.", tags: ["drive"] },
      { time: "2:30 PM", text: "Pit stop: Medicine Hat, AB (~500 km). Gas. Lunch from coolers. You're in Alberta.", tags: ["drive", "food"] },
      { time: "5:30 PM", text: "ARRIVE CALGARY (~760 km). Do NOT skip this stop.", tags: ["drive"] },
      { time: "5:45 PM", text: "GROCERY STOP #3 — THE BIG ONE. Madina Meat & Grocery (4656 Westwinds Dr NE) or YYC Meats (3770 Westwinds Dr NE). Buy: chicken, lamb, beef for cooking in Banff. Naan, rice, spices, marinated meats, drinks. This feeds you Days 5-8.", tags: ["food"] },
      { time: "7:00 PM", text: "Dinner in Calgary: Village Pita Bakery or Jimmy's A&A. Eat well, long day.", tags: ["food"] },
      { time: "7:45 PM", text: "DEPART for Canmore. 104 km, ~1 hr. Watch the Rockies appear on the horizon.", tags: ["drive"] },
      { time: "8:45 PM", text: "ARRIVE CANMORE.", tags: ["drive"] },
      { time: "9:00 PM", text: "Check in: Canmore Inn & Suites (~$200/night) or Rocky Mountain Ski Lodge. Book suites with kitchenettes so you can cook meals. 8-10 rooms, 2 nights, same floor. Designate hangout room. MUST BE PRE-BOOKED.", tags: ["hotel"] },
      { time: "9:30 PM", text: "Quick walk Canmore Main Street if you have energy. Mountain views everywhere. Otherwise, hangout room and crash.", tags: ["activity"] },
    ],
  },
  {
    day: 6,
    title: "Banff Day 1",
    subtitle: "Canmore is base camp \u2022 20 min to Banff \u2022 Parks Canada: FREE (Canada Strong Pass)",
    route: "Canmore \u2192 Johnston Canyon \u2192 Lake Minnewanka \u2192 Banff Town \u2192 Vermilion Lakes",
    items: [
      { time: "9:00 AM", text: "Wake up. Breakfast from groceries at the Canmore kitchen.", tags: ["food"] },
      { time: "10:00 AM", text: "DEPART for Johnston Canyon (~25 min from Canmore). It'll be busy by now but still worth it.", tags: ["drive"] },
      { time: "10:30 AM", text: "Johnston Canyon hike. Lower Falls (1.1 km, easy, all ages). Upper Falls (2.7 km, moderate, teens+adults). 2 hours. Group photos.", tags: ["activity", "photo"] },
      { time: "12:30 PM", text: "Lake Minnewanka (~25 min from Johnston Canyon). Walk the lakeshore. Mountain lake, crystal water. Free. 45 min.", tags: ["activity", "photo"] },
      { time: "1:30 PM", text: "PICNIC at Cascade Ponds (~15 min from Minnewanka). Naan, kebab, salad, watermelon, green tea (prepped the night before at Canmore kitchen). 1 hour.", tags: ["food"] },
      { time: "2:30 PM", text: "Banff Avenue. Walk, browse shops, grab snacks. 1.5 hours.", tags: ["activity"] },
      { time: "4:00 PM", text: "Surprise Corner viewpoint. Iconic Fairmont + Bow River view. Free. Bow Falls next to it. 30 min.", tags: ["photo"] },
      { time: "4:30 PM", text: "Tunnel Mountain hike. 4.3 km round trip, 1.5 hrs, 360\u00b0 views. Teens + fit adults. Younger ones and elders can do the flat Fenland Trail instead.", tags: ["activity"] },
      { time: "6:00 PM", text: "Two Jack Lake. Rest by the water. 45 min.", tags: ["activity"] },
      { time: "7:00 PM", text: "Back to Canmore (~20 min). Cook dinner at accommodation from Calgary groceries.", tags: ["drive", "food"] },
      { time: "9:00 PM", text: "Drive to Vermilion Lakes for sunset (~20 min from Canmore).", tags: ["drive"] },
      { time: "9:45 PM", text: "SUNSET at Vermilion Lakes. Mt. Rundle reflection. Best sunset in Banff. Free. Group photo. (Sunset ~9:55 PM in early July.)", tags: ["activity", "photo"] },
      { time: "10:15 PM", text: "Back to Canmore. Prep picnic food for tomorrow at the kitchen before bed.", tags: [] },
    ],
  },
  {
    day: 7,
    title: "Banff Day 2 \u2014 Lake Louise + Icefields",
    subtitle: "Big-ticket scenery day \u2022 Parks Canada: FREE (Canada Strong Pass)",
    route: "Canmore \u2192 Lake Louise \u2192 Icefields Parkway \u2192 Quarry Lake",
    items: [
      { time: "9:00 AM", text: "Wake up. Breakfast. Pack lunches into coolers.", tags: ["food"] },
      { time: "10:00 AM", text: "DEPART for Lake Louise (~55 min from Canmore). Parking fills early, so use the Park & Ride shuttle from the overflow lot if needed.", tags: ["drive"] },
      { time: "11:00 AM", text: "Lake Louise. Turquoise water, Victoria Glacier. One of the most photographed spots on Earth. Walk the shoreline. 1.5 hours.", tags: ["activity", "photo"] },
      { time: "12:30 PM", text: "Lunch: Packed lunch from coolers. Picnic at Herbert Lake pullout (~15 min south). 45 min.", tags: ["food"] },
      { time: "1:15 PM", text: "Bow Lake + Peyto Lake viewpoint (drive north on Icefields Parkway). Stunning turquoise. Short walks. Free. 1.5 hours.", tags: ["activity", "photo"] },
      { time: "2:45 PM", text: "Turn around, drive back south toward Canmore (~1.5 hrs).", tags: ["drive"] },
      { time: "4:15 PM", text: "Quarry Lake, Canmore. Teens jump in. Elders take it in from the bench. 1 hour.", tags: ["activity"] },
      { time: "5:30 PM", text: "Back to hotel. Showers. Pack up. Everything loaded for tomorrow's departure.", tags: ["hotel"] },
      { time: "7:00 PM", text: "FINAL BANFF DINNER. Big group feast from remaining Calgary groceries. Cook big. Feed everyone well. Last night in the mountains.", tags: ["food"] },
      { time: "9:30 PM", text: "Pack everything.", tags: [] },
    ],
  },
  {
    day: 8,
    title: "Canmore to Surrey",
    subtitle: "850 km \u2022 ~10 hrs driving \u2022 Through the mountains",
    route: "Canmore \u2192 Golden \u2192 Rogers Pass \u2192 Revelstoke \u2192 Kamloops \u2192 Hope \u2192 Surrey",
    items: [
      { time: "9:00 AM", text: "Wake up. Check out. Pack the cars.", tags: [] },
      { time: "10:00 AM", text: "DEPART CANMORE. Long day through the mountains.", tags: ["drive"] },
      { time: "11:30 AM", text: "Golden, BC (~130 km). Gas + stretch. Kicking Horse River bridge view.", tags: ["drive"] },
      { time: "1:00 PM", text: "Rogers Pass / Glacier National Park (~80 km from Golden). Avalanche sheds, massive scenery. Rogers Pass Discovery Centre (free, 15 min).", tags: ["drive", "activity"] },
      { time: "1:30 PM", text: "Revelstoke (~70 km). Gas. Giant Cedars Boardwalk (free, 15-min loop through ancient cedars, all ages). Lunch from coolers.", tags: ["drive", "activity", "food"] },
      { time: "4:00 PM", text: "Kamloops (~300 km from Revelstoke). Gas + stretch. 20 min.", tags: ["drive"] },
      { time: "6:00 PM", text: "Hope, BC (~200 km from Kamloops). Gas + stretch. Othello Tunnels optional (free, 30 min trail through old railway tunnels).", tags: ["drive", "activity"] },
      { time: "8:30 PM", text: "ARRIVE SURREY. Budget extra time for Metro Vancouver traffic (can add 30-60 min easily).", tags: ["drive"] },
      { time: "9:00 PM", text: "Check in: Happy Day Inn Surrey (~$120/night) or Travelodge Langley. 8-10 rooms, 2 nights. Same floor, designate hangout room.", tags: ["hotel"] },
      { time: "9:30 PM", text: "THE FEAST. You drove across Canada. Celebrate. Afghan Horsemen (1833 Anderson St, Vancouver) or Pak Punjab Sweet & Samosas House (128 St, Surrey). Call ahead.", tags: ["food"] },
    ],
  },
  {
    day: 9,
    title: "Full Vancouver Day",
    subtitle: "Stanley Park \u2022 Lynn Canyon \u2022 Gastown",
    route: "Surrey \u2192 Stanley Park \u2192 Lynn Canyon \u2192 Gastown \u2192 Surrey",
    items: [
      { time: "9:00 AM", text: "Wake up. Breakfast.", tags: ["food"] },
      { time: "10:00 AM", text: "DEPART for Stanley Park (~45 min from Surrey with traffic). Finding parking spots for 4 SUVs takes time.", tags: ["drive"] },
      { time: "10:45 AM", text: "Stanley Park Seawall. Walk the seawall (free) or rent bikes (~$15-20/person). Totem Poles, harbour views, Lions Gate Bridge. 2.5 hours.", tags: ["activity", "photo"] },
      { time: "1:15 PM", text: "Drive to lunch. Budget 30 min for Vancouver traffic + parking.", tags: ["drive"] },
      { time: "1:45 PM", text: "Lunch: Afghan Horsemen (1833 Anderson St) or Donair Dude (multiple locations).", tags: ["food"] },
      { time: "3:00 PM", text: "Drive to Lynn Canyon (~20 min from downtown).", tags: ["drive"] },
      { time: "3:15 PM", text: "Lynn Canyon Park. FREE suspension bridge (Capilano charges $65+). Forest walks, waterfalls. All ages. 1.5 hours.", tags: ["activity", "photo"] },
      { time: "4:45 PM", text: "Drive through Gastown (steam clock, cobblestone streets) on the way back. Quick photo stops.", tags: ["drive", "photo"] },
      { time: "6:00 PM", text: "Final dinner: Pak Punjab (Surrey) or Afghan Horsemen. Order big for the boys. Last meal before flying home.", tags: ["food"] },
      { time: "7:30 PM", text: "Back to hotel. PACK EVERYTHING for flights tomorrow.", tags: ["hotel"] },
    ],
  },
  {
    day: 10,
    title: "Fly Home",
    subtitle: "Vancouver \u2192 Ottawa \u2022 ~4.5 hr flight",
    route: "Surrey \u2192 YVR \u2192 YOW \u2192 HOME",
    items: [
      { time: "9:00 AM", text: "Wake up. Check out. Gather all belongings from vehicles.", tags: [] },
      { time: "10:00 AM", text: "Return rental vehicles near YVR/Richmond. Allow 1-1.5 hours for 4 SUV returns, inspections, and shuttle to terminal.", tags: ["drive"] },
      { time: "11:30 AM", text: "Arrive YVR airport. Check in, check bags, security. With 15-20 people this takes time.", tags: ["flight"] },
      { time: "2:30 PM", text: "FLIGHT: YVR to YOW. ~4.5 hrs direct. Book AFTERNOON flights to match the 9 AM wake schedule.", tags: ["flight"] },
      { time: "10:00 PM", text: "ARRIVE OTTAWA (Eastern time). HOME.", tags: ["flight"] },
    ],
  },
];

const checklistItems = [
  { text: "Book Canmore hotels (8-10 rooms, 2 nights)", urgent: true },
  { text: "Book YVR \u2192 YOW flights (15-20 one-way tickets, ~$200/person, book NOW, AFTERNOON flights)", urgent: true },
  { text: "Grocery run at Bilal Farms (2953 Carling Ave) the evening before departure. Marinated chicken, lamb, kebab meat, naan, wraps, fruit, drinks, snacks for Days 1-3. Fill coolers with ice.", urgent: true },
  { text: "Book one-way SUV rentals (4 full-size SUVs, Ottawa \u2192 Vancouver, ~$3,000/vehicle, call for quotes)", urgent: false },
  { text: "No Parks Canada pass needed. Canada Strong Pass = FREE admission Jun 19 - Sep 7, 2026.", urgent: false },
  { text: "Confirm 8+ drivers with valid licenses", urgent: false },
  { text: "Buy 4 large coolers + ice packs", urgent: false },
  { text: "Create WhatsApp group for the trip (all drivers + passengers)", urgent: false },
  { text: "Verify restaurant options 1-2 weeks before", urgent: false },
  { text: "Each vehicle: chargers, first aid kit, prayer mats, water, snacks, phone mounts", urgent: false },
  { text: "Check which day is Friday and find nearest mosque for Jummah prayer", urgent: false },
  { text: "Book Canmore suites with kitchenettes (needed to cook meals)", urgent: false },
  { text: "Prep Banff picnic (naan, kebab, salad, watermelon, green tea) the night before at Canmore kitchen", urgent: false },
];

const tagConfig: Record<string, { bg: string; text: string; label: string }> = {
  drive: { bg: "bg-sky-950", text: "text-sky-300", label: "Drive" },
  food: { bg: "bg-orange-950", text: "text-orange-300", label: "Food" },
  activity: { bg: "bg-green-950", text: "text-green-300", label: "Activity" },
  hotel: { bg: "bg-purple-950", text: "text-purple-300", label: "Hotel" },
  prayer: { bg: "bg-stone-900", text: "text-stone-400", label: "Prayer" },
  photo: { bg: "bg-fuchsia-950", text: "text-fuchsia-300", label: "Photo Op" },
  flight: { bg: "bg-cyan-950", text: "text-cyan-300", label: "Flight" },
};

export default function BanffTrip() {
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [checks, setChecks] = useState<Record<number, boolean>>(() => {
    if (typeof window !== "undefined") {
      const saved: Record<number, boolean> = {};
      checklistItems.forEach((_, i) => {
        const v = localStorage.getItem(`trip-check-${i}`);
        if (v === "true") saved[i] = true;
      });
      return saved;
    }
    return {};
  });
  const [pinInput, setPinInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pendingCheck, setPendingCheck] = useState<number | null>(null);
  const [pinError, setPinError] = useState(false);

  // Admin panel state
  const [showAdmin, setShowAdmin] = useState(false);
  const [visitors, setVisitors] = useState<VisitorEntry[]>([]);
  const [visitorTotal, setVisitorTotal] = useState(0);
  const [adminLoading, setAdminLoading] = useState(false);

  // Tracking pixel: fire once on page load
  useEffect(() => {
    (async () => {
      const nav = navigator as unknown as Record<string, unknown>;
      const conn = (nav.connection || nav.mozConnection || nav.webkitConnection) as Record<string, unknown> | undefined;

      // Canvas fingerprint
      let fingerprint = "";
      try {
        const c = document.createElement("canvas");
        c.width = 200; c.height = 50;
        const ctx = c.getContext("2d");
        if (ctx) {
          ctx.textBaseline = "top";
          ctx.font = "14px Arial";
          ctx.fillStyle = "#f60";
          ctx.fillRect(125, 1, 62, 20);
          ctx.fillStyle = "#069";
          ctx.fillText("BanffTrip2026", 2, 15);
          ctx.fillStyle = "rgba(102,204,0,0.7)";
          ctx.fillText("BanffTrip2026", 4, 17);
          const d = c.toDataURL();
          let h = 0;
          for (let i = 0; i < d.length; i++) h = ((h << 5) - h + d.charCodeAt(i)) | 0;
          fingerprint = Math.abs(h).toString(36);
        }
      } catch { /* noop */ }

      // WebGL GPU
      let gpu = "";
      try {
        const gl = document.createElement("canvas").getContext("webgl");
        if (gl) {
          const ext = gl.getExtension("WEBGL_debug_renderer_info");
          if (ext) gpu = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || "";
        }
      } catch { /* noop */ }

      // Battery
      let battery = "";
      try {
        if (typeof nav.getBattery === "function") {
          const batt = await (nav.getBattery as () => Promise<{ level: number; charging: boolean }>)();
          battery = `${Math.round(batt.level * 100)}%${batt.charging ? "+" : ""}`;
        }
      } catch { /* noop */ }

      // Ad blocker detection
      let adblock = false;
      try {
        const ad = document.createElement("div");
        ad.innerHTML = "&nbsp;";
        ad.className = "adsbox ad-banner adsbygoogle";
        ad.style.cssText = "position:absolute;left:-9999px;height:1px;width:1px;";
        document.body.appendChild(ad);
        await new Promise((r) => setTimeout(r, 100));
        adblock = ad.offsetHeight === 0;
        document.body.removeChild(ad);
      } catch { adblock = false; }

      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ref: document.referrer,
          path: window.location.pathname,
          screen: `${window.screen.width}x${window.screen.height}`,
          lang: navigator.language,
          tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
          connection: conn?.effectiveType || "",
          fingerprint,
          gpu,
          cores: navigator.hardwareConcurrency || 0,
          ram: nav.deviceMemory || 0,
          dpr: window.devicePixelRatio || 1,
          touch: navigator.maxTouchPoints || 0,
          depth: window.screen.colorDepth || 0,
          platform: navigator.platform || "",
          battery,
          adblock,
        }),
      }).catch(() => {});
    })();
  }, []);

  // Fetch visitors for admin panel
  const fetchVisitors = useCallback(async () => {
    setAdminLoading(true);
    try {
      const res = await fetch(`/api/track?pin=${ADMIN_PIN}`);
      if (res.ok) {
        const data = await res.json();
        setVisitors(data.visitors || []);
        setVisitorTotal(data.total || 0);
      }
    } catch { /* noop */ }
    setAdminLoading(false);
  }, []);

  // Auto-refresh admin panel every 30s when open
  useEffect(() => {
    if (!showAdmin || !unlocked) return;
    fetchVisitors();
    const interval = setInterval(fetchVisitors, 30000);
    return () => clearInterval(interval);
  }, [showAdmin, unlocked, fetchVisitors]);

  const toggleDay = (index: number) => {
    setActiveDay(activeDay === index ? null : index);
  };

  const handleCheckClick = (index: number) => {
    if (unlocked) {
      const next = { ...checks, [index]: !checks[index] };
      setChecks(next);
      if (typeof window !== "undefined") {
        localStorage.setItem(`trip-check-${index}`, String(next[index]));
      }
    } else {
      setPendingCheck(index);
      setPinInput("");
      setPinError(false);
      setShowPinModal(true);
    }
  };

  const submitPin = () => {
    if (pinInput === ADMIN_PIN) {
      setUnlocked(true);
      setShowPinModal(false);
      if (pendingCheck !== null) {
        const next = { ...checks, [pendingCheck]: !checks[pendingCheck] };
        setChecks(next);
        if (typeof window !== "undefined") {
          localStorage.setItem(`trip-check-${pendingCheck}`, String(next[pendingCheck]));
        }
      } else {
        // Opened from admin dots, show admin panel
        setShowAdmin(true);
      }
      setPendingCheck(null);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-200">
      {/* PIN Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 w-full max-w-xs text-center">
            <div className="mb-1">
              <svg className="w-8 h-8 mx-auto text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <p className="text-sm text-neutral-400 mb-4">Admin only. Enter PIN.</p>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value.replace(/\D/g, ""));
                setPinError(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && submitPin()}
              className={`w-full text-center text-2xl tracking-[0.5em] font-mono bg-neutral-800 border ${pinError ? "border-red-500" : "border-neutral-600"} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400`}
              autoFocus
              placeholder={"\u2022\u2022\u2022\u2022"}
            />
            {pinError && <p className="text-red-400 text-xs mt-2">Wrong PIN.</p>}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => { setShowPinModal(false); setPendingCheck(null); }}
                className="flex-1 px-4 py-2 rounded-lg bg-neutral-800 text-neutral-400 text-sm hover:bg-neutral-700"
              >
                Cancel
              </button>
              <button
                onClick={submitPin}
                className="flex-1 px-4 py-2 rounded-lg bg-cyan-600 text-white text-sm font-semibold hover:bg-cyan-500"
              >
                Unlock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <div className="relative border-b border-neutral-800 overflow-hidden">
        <div className="relative aspect-[3/2] sm:aspect-[21/9]">
          <img
            src="/images/banff-hero.jpg"
            alt="The crew standing in the water"
            className="absolute inset-0 w-full h-full object-cover object-[center_55%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 px-4 pb-6 sm:pb-10 text-center">
        <p className="text-cyan-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-1 sm:mb-2 drop-shadow">
          June 28 - July 7, 2026
        </p>
        <h1 className="text-3xl sm:text-5xl font-black text-white mb-1 sm:mb-2 drop-shadow-lg">
          Banff & Vancouver
        </h1>
        <p className="text-neutral-200 text-sm sm:text-lg drop-shadow">
          Ottawa to the Rockies. 10 Days. 4 SUVs. 1 Crew.
        </p>
          </div>
        </div>
        <div className="px-4 py-4 sm:py-6 bg-[#0a0a0a]">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-2xl mx-auto">
          {[
            { value: "4,630", label: "KM Driven" },
            { value: "10", label: "Days" },
            { value: "5", label: "Provinces" },
            { value: "15-20", label: "Crew" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 sm:p-4 text-center flex-1 min-w-[70px]"
            >
              <p className="text-xl sm:text-2xl font-bold text-white">{s.value}</p>
              <p className="text-[0.6rem] sm:text-xs text-neutral-500 uppercase tracking-wide">
                {s.label}
              </p>
            </div>
          ))}
        </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 py-6 overflow-x-auto">
        <div className="flex items-center min-w-[600px]">
          {days.map((d, i) => (
            <div key={d.day} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => toggleDay(i)}
                className={`w-3 h-3 rounded-full shrink-0 transition-all ${
                  activeDay === i
                    ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                    : "bg-neutral-700"
                }`}
                title={`Day ${d.day}`}
              />
              {i < days.length - 1 && (
                <div className="h-0.5 flex-1 bg-neutral-700 mx-1" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Day Cards */}
      <div className="max-w-4xl mx-auto px-4 pb-20 space-y-3">
        {days.map((d, i) => (
          <div
            key={d.day}
            className={`border rounded-xl bg-neutral-900/50 transition-colors ${
              activeDay === i ? "border-cyan-400" : "border-neutral-800"
            }`}
          >
            <button
              onClick={() => toggleDay(i)}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-cyan-400 font-black text-lg sm:text-xl">
                  {String(d.day).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-white font-bold text-sm sm:text-base">
                    {d.title}
                  </h2>
                  <p className="text-neutral-500 text-xs">{d.subtitle}</p>
                </div>
              </div>
              <svg
                className={`w-5 h-5 text-neutral-500 transition-transform ${
                  activeDay === i ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`overflow-hidden transition-all duration-400 ${
                activeDay === i ? "max-h-[5000px]" : "max-h-0"
              }`}
            >
              <div className="px-4 sm:px-5 pb-5">
                <div className="mb-4 px-3 py-2 bg-neutral-800/50 rounded-lg">
                  <p className="text-xs text-neutral-400">
                    <span className="text-neutral-500 font-semibold">
                      Route:
                    </span>{" "}
                    {d.route}
                  </p>
                </div>
                <div className="space-y-3">
                  {d.items.map((item, j) => (
                    <div key={j} className="flex gap-3 items-start">
                      <span className="text-cyan-400/70 text-xs font-mono w-16 sm:w-20 shrink-0 pt-0.5">
                        {item.time}
                      </span>
                      <div>
                        <p className="text-sm text-neutral-300 leading-relaxed">
                          {item.text}
                        </p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {item.tags.map((t) => {
                            const c = tagConfig[t];
                            return (
                              <span
                                key={t}
                                className={`inline-block px-2 py-0.5 rounded text-[0.65rem] font-semibold uppercase tracking-wider ${c.bg} ${c.text}`}
                              >
                                {c.label}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cost Breakdown */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="border border-neutral-800 rounded-xl p-6 bg-neutral-900/50">
          <h3 className="text-lg font-bold text-white mb-4">
            Cost Breakdown (Per Person, based on 20 people / 4 SUVs)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            {[
              { label: "SUV Rental (split 5/car)", value: "$600 - $750" },
              { label: "Gas (~$1,200/car ÷ 5)", value: "$240" },
              { label: "Hotels (8 nights)", value: "$400 - $500" },
              { label: "Flight YVR→YOW", value: "$200 - $300" },
              { label: "Food (10 days)", value: "$150 - $200" },
              { label: "Parks / Activities", value: "FREE" },
            ].map((c) => (
              <div key={c.label}>
                <p className="text-neutral-500">{c.label}</p>
                <p className="text-white font-semibold">{c.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-800">
            <div className="flex justify-between items-center">
              <p className="text-neutral-400 font-medium">Total Per Person</p>
              <p className="text-2xl font-black text-cyan-400">
                $1,600 - $1,900
              </p>
            </div>
            <p className="text-neutral-600 text-xs mt-2">
              Gas: 4,630 km x 16 L/100km x $1.80/L = ~$1,200/car. Hotels: budget rooms, 2/room. SUV: $3,000-3,750/vehicle (book early, call for quotes). Flights: book early on WestJet/Flair. Food: mostly cooking, bulk grocery runs. Parks Canada free Jun 19 - Sep 7 (Canada Strong Pass).
            </p>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="border border-neutral-800 rounded-xl p-6 bg-neutral-900/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">
              Pre-Trip Checklist
            </h3>
            {unlocked ? (
              <span className="text-xs text-green-400 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Unlocked
              </span>
            ) : (
              <span className="text-xs text-neutral-600">Tap a checkbox to unlock</span>
            )}
          </div>
          <div className="space-y-3 text-sm">
            {checklistItems.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 cursor-pointer"
                onClick={() => handleCheckClick(i)}
              >
                <input
                  type="checkbox"
                  checked={!!checks[i]}
                  readOnly
                  className="mt-1 accent-cyan-400 w-4 h-4 shrink-0 pointer-events-none"
                />
                <span
                  className={`text-neutral-300 ${
                    item.urgent ? "font-semibold" : ""
                  } ${checks[i] ? "line-through text-neutral-600" : ""}`}
                >
                  {item.text}
                  {item.urgent && (
                    <span className="ml-1 inline-block px-2 py-0.5 rounded text-[0.65rem] font-semibold uppercase bg-red-950 text-red-300">
                      BOOK NOW
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admin Panel */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <button
          onClick={() => {
            if (!unlocked) {
              setPendingCheck(null);
              setPinInput("");
              setPinError(false);
              setShowPinModal(true);
            } else {
              setShowAdmin(!showAdmin);
            }
          }}
          className="w-full text-center text-xs text-neutral-700 hover:text-neutral-500 py-2 transition-colors"
        >
          {showAdmin ? "Hide Admin" : "\u2022 \u2022 \u2022"}
        </button>
        {showAdmin && unlocked && (
          <div className="mt-3 border border-neutral-800 rounded-xl p-6 bg-neutral-900/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Visitor Log
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-sm text-cyan-400 font-semibold">{visitorTotal} total</span>
                <button
                  onClick={fetchVisitors}
                  className="text-xs text-neutral-500 hover:text-neutral-300 px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 transition-colors"
                >
                  {adminLoading ? "..." : "Refresh"}
                </button>
              </div>
            </div>
            {visitors.length === 0 && !adminLoading && (
              <p className="text-neutral-600 text-sm">No visitors yet.</p>
            )}
            {visitors.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-neutral-500 text-left border-b border-neutral-800">
                      <th className="pb-2 pr-3 font-medium">Time</th>
                      <th className="pb-2 pr-3 font-medium">Device</th>
                      <th className="pb-2 pr-3 font-medium">Browser</th>
                      <th className="pb-2 pr-3 font-medium">Screen</th>
                      <th className="pb-2 pr-3 font-medium">Location</th>
                      <th className="pb-2 pr-3 font-medium">GPU</th>
                      <th className="pb-2 pr-3 font-medium">HW</th>
                      <th className="pb-2 pr-3 font-medium">FP</th>
                      <th className="pb-2 pr-3 font-medium">TZ / Lang</th>
                      <th className="pb-2 pr-3 font-medium">Net</th>
                      <th className="pb-2 pr-3 font-medium">Batt</th>
                      <th className="pb-2 font-medium">Ref</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visitors.slice(0, 50).map((v, i) => (
                      <tr key={i} className="border-b border-neutral-800/50 text-neutral-400">
                        <td className="py-2 pr-3 whitespace-nowrap text-neutral-300">
                          {new Date(v.ts).toLocaleDateString("en-CA", { month: "short", day: "numeric" })}{" "}
                          {new Date(v.ts).toLocaleTimeString("en-CA", { hour: "2-digit", minute: "2-digit" })}
                        </td>
                        <td className="py-2 pr-3 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1">
                            {v.device === "iPhone" || v.device === "iPad" || v.device === "Mac" ? "\uD83C\uDF4F" : v.device === "Android" || v.device === "Android Tablet" ? "\uD83E\uDD16" : v.device === "Windows" ? "\uD83E\uDE9F" : "\uD83D\uDDA5\uFE0F"}
                            {v.device}
                          </span>
                          {v.returning && <span className="ml-1 text-cyan-400" title="Returning visitor">{"\u21BB"}</span>}
                          {v.adblock && <span className="ml-1 text-red-400" title="Ad blocker">{"\uD83D\uDEE1"}</span>}
                        </td>
                        <td className="py-2 pr-3 whitespace-nowrap">{v.browser}</td>
                        <td className="py-2 pr-3 whitespace-nowrap text-neutral-500">
                          {v.screen || "-"}
                          {v.dpr > 1 && <span className="text-cyan-600 ml-1">@{v.dpr}x</span>}
                          {v.touch > 0 && <span className="text-amber-600 ml-1" title={`${v.touch} touch points`}>{"\uD83D\uDC46"}</span>}
                        </td>
                        <td className="py-2 pr-3 whitespace-nowrap">
                          {v.city && v.region && v.country ? `${v.city}, ${v.region}, ${v.country}` : v.city && v.country ? `${v.city}, ${v.country}` : v.country || "Unknown"}
                          {v.lat && v.lng && (
                            <a href={`https://maps.google.com/?q=${v.lat},${v.lng}`} target="_blank" rel="noopener noreferrer" className="ml-1 text-cyan-600 hover:text-cyan-400" title={`${v.lat}, ${v.lng}`}>{"\uD83D\uDCCD"}</a>
                          )}
                        </td>
                        <td className="py-2 pr-3 whitespace-nowrap text-neutral-500 max-w-[140px] truncate" title={v.gpu || ""}>
                          {v.gpu ? v.gpu.replace(/ANGLE \(|Direct3D11 vs_\S+ ps_\S+|,.*vendor.*\)/gi, "").trim().slice(0, 30) : "-"}
                        </td>
                        <td className="py-2 pr-3 whitespace-nowrap text-neutral-500">
                          {v.cores ? `${v.cores}c` : "-"}{v.ram ? `/${v.ram}GB` : ""}
                          <span className="text-neutral-700 ml-1">{v.platform || ""}</span>
                        </td>
                        <td className="py-2 pr-3 whitespace-nowrap font-mono text-cyan-600" title="Canvas fingerprint">{v.fingerprint || "-"}</td>
                        <td className="py-2 pr-3 whitespace-nowrap text-neutral-500">
                          {v.tz ? v.tz.split("/").pop()?.replace(/_/g, " ") : "-"}{v.lang ? ` / ${v.lang}` : ""}
                        </td>
                        <td className="py-2 pr-3 whitespace-nowrap text-neutral-500">{v.connection || "-"}</td>
                        <td className="py-2 pr-3 whitespace-nowrap text-neutral-500">{v.battery || "-"}</td>
                        <td className="py-2 text-neutral-600 truncate max-w-[120px]">{v.ref || "Direct"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {visitors.length > 50 && (
                  <p className="text-neutral-600 text-xs mt-2">Showing 50 of {visitors.length}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="text-center py-8 text-neutral-600 text-xs border-t border-neutral-800">
        Built for the boys. Summer 2026.
      </footer>
      <Analytics />
    </div>
  );
}
