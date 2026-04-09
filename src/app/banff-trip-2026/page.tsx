"use client";

import { useState } from "react";

const ADMIN_PIN = "2026";

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
      { time: "12:00 PM", text: "Lunch stop: Sudbury area (~480 km in). Packed halal food from coolers. Dhuhr prayer. 45 min.", tags: ["food", "prayer"] },
      { time: "2:30 PM", text: "Pit stop #2: Gas + stretch. Blind River area (~2 hrs after Sudbury).", tags: ["drive"] },
      { time: "4:30 PM", text: "ARRIVE SAULT STE MARIE.", tags: ["drive"] },
      { time: "5:00 PM", text: "Asr prayer. Check in: Super 8 Sault Ste Marie (~$130-160/night). 8-10 rooms, request same floor. Designate one room as the hangout room.", tags: ["prayer", "hotel"] },
      { time: "6:00 PM", text: "Dinner: Soo Shawarma (129 Second Line W, halal Middle Eastern). Call ahead for group of 20. If closed, eat packed halal from coolers.", tags: ["food"] },
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
      { time: "5:00 AM", text: "Fajr. Gear packed, coolers iced.", tags: ["prayer"] },
      { time: "5:30 AM", text: "DEPART EARLY. Longest drive of the trip. Gas stations get sparse north of SSM. Top off ALL vehicles before leaving.", tags: ["drive"] },
      { time: "8:00 AM", text: "Pit stop: Wawa (~230 km). Gas + stretch. PHOTO STOP: Wawa Goose (giant Canada goose statue). Younger ones will love it. 20 min.", tags: ["drive", "photo"] },
      { time: "10:00 AM", text: "Pit stop: White River area (~400 km). Gas. 'Coldest Spot in Canada' sign photo.", tags: ["drive", "photo"] },
      { time: "12:00 PM", text: "Lunch: Marathon area (~530 km). Packed halal lunch from coolers. Dhuhr prayer. 45 min.", tags: ["food", "prayer"] },
      { time: "1:00 PM", text: "Continue. Nipigon area. Gas if needed.", tags: ["drive"] },
      { time: "3:30 PM", text: "ARRIVE THUNDER BAY.", tags: ["drive"] },
      { time: "4:00 PM", text: "Asr prayer. Terry Fox Memorial. On Hwy 11/17, right before town. Free. Powerful monument. Group photo. 20 min.", tags: ["prayer", "activity", "photo"] },
      { time: "4:30 PM", text: "Check in: Super 8 Thunder Bay (~$140-170/night) or Travelodge. Same floor, designate hangout room.", tags: ["hotel"] },
      { time: "5:30 PM", text: "Dinner: Malabar Mandi Kitchen (108 Frederica St E, halal, 4.6 stars). Call ahead for group size. Otherwise packed halal from coolers.", tags: ["food"] },
      { time: "9:00 PM", text: "Isha prayer. Hangout room. Rest. Everyone will be tired.", tags: ["prayer"] },
    ],
  },
  {
    day: 3,
    title: "Thunder Bay to Winnipeg",
    subtitle: "700 km \u2022 ~7.5 hrs driving \u2022 Hwy 17 to Trans-Canada Hwy 1",
    route: "Thunder Bay \u2192 Ignace \u2192 Kenora \u2192 Winnipeg",
    items: [
      { time: "5:30 AM", text: "Fajr.", tags: ["prayer"] },
      { time: "6:30 AM", text: "DEPART. Long stretch of Canadian Shield ahead.", tags: ["drive"] },
      { time: "9:00 AM", text: "Pit stop: Ignace area (~250 km in). Gas + stretch. 20 min.", tags: ["drive"] },
      { time: "11:30 AM", text: "Kenora, ON (~490 km). Gas. Quick Lake of the Woods waterfront look.", tags: ["drive", "activity"] },
      { time: "12:15 PM", text: "Cross Manitoba border. Welcome sign photo.", tags: ["photo"] },
      { time: "1:00 PM", text: "Dhuhr prayer. Quick stop.", tags: ["prayer"] },
      { time: "2:30 PM", text: "ARRIVE WINNIPEG.", tags: ["drive"] },
      { time: "2:45 PM", text: "HALAL GROCERY STOP #2: Basha Foods International, Winnipeg. Major restock for Days 3-5. Refill cooler ice.", tags: ["food"] },
      { time: "3:45 PM", text: "Halal lunch: Falafel Place (Pembina Hwy, well-known) or Ashur Restaurant (584 Pembina Hwy, Middle Eastern). Feed the boys properly.", tags: ["food"] },
      { time: "4:30 PM", text: "Check in: Super 8 Winnipeg (~$120-150/night) or Days Inn. Same floor, designate hangout room.", tags: ["hotel"] },
      { time: "5:30 PM", text: "The Forks. Free. Market, riverfront, open grass. All ages. Walk around, explore. Asr prayer. 2 hours.", tags: ["activity", "prayer"] },
      { time: "7:30 PM", text: "Halal dinner out.", tags: ["food"] },
      { time: "9:00 PM", text: "Isha. Hangout room. Winnipeg is your midpoint recovery city.", tags: ["prayer"] },
    ],
  },
  {
    day: 4,
    title: "Winnipeg to Regina",
    subtitle: "575 km \u2022 ~6 hrs driving \u2022 Trans-Canada Hwy 1",
    route: "Winnipeg \u2192 Brandon \u2192 Regina",
    items: [
      { time: "6:00 AM", text: "Fajr.", tags: ["prayer"] },
      { time: "7:30 AM", text: "DEPART. Shortest drive day. Recovery pace.", tags: ["drive"] },
      { time: "9:30 AM", text: "Pit stop: Brandon, MB (~210 km). Gas + stretch + snack from coolers.", tags: ["drive"] },
      { time: "11:30 AM", text: "Cross Saskatchewan border. Welcome sign photo. The Prairies are flat, endless, and beautiful. Windows down.", tags: ["drive", "photo"] },
      { time: "1:30 PM", text: "ARRIVE REGINA.", tags: ["drive"] },
      { time: "2:00 PM", text: "Lunch: Afghan Cuisine Restaurant (832 Albert St, halal) or Amado\u2019s Halal Meat & Food Market (251 Albert St). Dhuhr prayer.", tags: ["food", "prayer"] },
      { time: "3:00 PM", text: "Check in: Motel 6 Regina (~$120-150/night) or Super 8. Same floor, designate hangout room.", tags: ["hotel"] },
      { time: "3:30 PM", text: "RCMP Heritage Centre. $12/person. Interactive, educational. Great for all ages. 1.5 hours.", tags: ["activity"] },
      { time: "5:00 PM", text: "Wascana Park. Free. Walk the lake, stretch legs. 1.5 hours.", tags: ["activity"] },
      { time: "6:30 PM", text: "Asr prayer. Dinner from packed halal food or try a local halal option.", tags: ["prayer", "food"] },
      { time: "8:00 PM", text: "Isha. Hangout room. Rest early. Tomorrow is a long push to the mountains.", tags: ["prayer"] },
    ],
  },
  {
    day: 5,
    title: "Regina to Canmore (via Calgary)",
    subtitle: "865 km \u2022 ~8.5 hrs driving \u2022 Trans-Canada Hwy 1",
    route: "Regina \u2192 Swift Current \u2192 Medicine Hat \u2192 Calgary \u2192 Canmore",
    items: [
      { time: "5:00 AM", text: "Fajr. Today you hit the Rockies.", tags: ["prayer"] },
      { time: "5:30 AM", text: "DEPART. Long day but the reward is mountains.", tags: ["drive"] },
      { time: "8:00 AM", text: "Pit stop: Swift Current, SK (~250 km). Gas + breakfast from coolers.", tags: ["drive"] },
      { time: "10:30 AM", text: "Pit stop: Medicine Hat, AB (~500 km). Gas. You're in Alberta.", tags: ["drive"] },
      { time: "1:00 PM", text: "ARRIVE CALGARY (~760 km). Do NOT skip this stop.", tags: ["drive"] },
      { time: "1:15 PM", text: "HALAL GROCERY STOP #3 \u2014 THE BIG ONE. Madina Halal Meat & Grocery (4656 Westwinds Dr NE) or YYC Halal Meats (3770 Westwinds Dr NE). Buy: chicken, lamb, beef for cooking in Banff. Naan, rice, spices, marinated meats, drinks. This feeds you Days 5-8. Dhuhr prayer at NE Calgary mosque.", tags: ["food", "prayer"] },
      { time: "2:45 PM", text: "Halal lunch in Calgary: Village Pita Bakery or Jimmy's A&A (both well-known Calgary halal spots).", tags: ["food"] },
      { time: "3:45 PM", text: "DEPART for Canmore. 104 km, ~1 hr. Watch the Rockies appear on the horizon.", tags: ["drive"] },
      { time: "5:00 PM", text: "ARRIVE CANMORE.", tags: ["drive"] },
      { time: "5:30 PM", text: "Check in: Canmore Inn & Suites (~$200-280/night) or Rocky Mountain Ski Lodge. Book suites with kitchenettes so you can cook halal meals. 8-10 rooms, 2 nights, same floor. Designate hangout room. MUST BE PRE-BOOKED.", tags: ["hotel"] },
      { time: "6:30 PM", text: "Asr prayer. Walk Canmore Main Street. Mountain views everywhere. Policeman's Creek boardwalk (free, scenic).", tags: ["prayer", "activity"] },
      { time: "7:30 PM", text: "Cook halal dinner at accommodation using Calgary groceries. Big spread. Rice, kebab, salad.", tags: ["food"] },
      { time: "9:00 PM", text: "Isha. Hangout room. Sleep. Tomorrow is the day you came for.", tags: ["prayer"] },
    ],
  },
  {
    day: 6,
    title: "Banff Day 1",
    subtitle: "Canmore is base camp \u2022 20 min to Banff \u2022 Parks Canada: FREE (Canada Strong Pass)",
    route: "Canmore \u2192 Johnston Canyon \u2192 Lake Minnewanka \u2192 Banff Town \u2192 Vermilion Lakes",
    items: [
      { time: "5:30 AM", text: "Fajr.", tags: ["prayer"] },
      { time: "6:30 AM", text: "Breakfast from groceries.", tags: ["food"] },
      { time: "7:00 AM", text: "DEPART for Johnston Canyon (~25 min from Canmore). Get there EARLY. By 10 AM it's a zoo.", tags: ["drive"] },
      { time: "7:30 AM", text: "Johnston Canyon hike. Lower Falls (1.1 km, easy, all ages). Upper Falls (2.7 km, moderate, teens+adults). 2 hours. Group photos.", tags: ["activity", "photo"] },
      { time: "9:30 AM", text: "Lake Minnewanka (~25 min from Johnston Canyon). Walk the lakeshore. Mountain lake, crystal water. Free. 1 hour.", tags: ["activity", "photo"] },
      { time: "10:30 AM", text: "Surprise Corner viewpoint. Iconic Fairmont + Bow River view. Free. 15 min.", tags: ["photo"] },
      { time: "10:45 AM", text: "Bow Falls. 5 min walk from Surprise Corner. Free.", tags: ["activity"] },
      { time: "11:15 AM", text: "Drive to Cascade Ponds (~10 min).", tags: ["drive"] },
      { time: "11:30 AM", text: "HALAL PICNIC at Cascade Ponds. Naan, kebab, salad, watermelon, green tea (all prepped the night before at Canmore kitchen). Dhuhr prayer by the water. 1.5 hours.", tags: ["food", "prayer"] },
      { time: "1:00 PM", text: "Banff Avenue. Walk, browse shops, grab snacks. 1.5 hours.", tags: ["activity"] },
      { time: "2:30 PM", text: "Tunnel Mountain hike. 4.3 km round trip, 1.5 hrs, 360\u00b0 views. Teens + fit adults. Younger ones and elders can do the flat Fenland Trail instead.", tags: ["activity"] },
      { time: "4:00 PM", text: "Asr prayer. Two Jack Lake. Rest. 1 hour.", tags: ["prayer", "activity"] },
      { time: "5:15 PM", text: "Back to Canmore (~20 min).", tags: ["drive"] },
      { time: "6:30 PM", text: "Cook halal dinner at accommodation from Calgary groceries.", tags: ["food"] },
      { time: "8:30 PM", text: "Drive to Vermilion Lakes for sunset (~20 min from Canmore).", tags: ["drive"] },
      { time: "9:45 PM", text: "SUNSET at Vermilion Lakes. Mt. Rundle reflection. Best sunset in Banff. Free. Group photo. (Sunset ~9:55 PM in early July.)", tags: ["activity", "photo"] },
      { time: "10:15 PM", text: "Back to Canmore. Isha.", tags: ["prayer"] },
    ],
  },
  {
    day: 7,
    title: "Banff Day 2 \u2014 Lake Louise + Icefields",
    subtitle: "Big-ticket scenery day \u2022 Parks Canada: FREE (Canada Strong Pass)",
    route: "Canmore \u2192 Lake Louise \u2192 Icefields Parkway \u2192 Quarry Lake",
    items: [
      { time: "5:30 AM", text: "Fajr.", tags: ["prayer"] },
      { time: "6:00 AM", text: "Breakfast. Pack all halal lunches into coolers.", tags: ["food"] },
      { time: "6:30 AM", text: "DEPART for Lake Louise (~55 min from Canmore). Go at dawn for parking (fills by 9 AM).", tags: ["drive"] },
      { time: "7:30 AM", text: "Lake Louise. Turquoise water, Victoria Glacier. One of the most photographed spots on Earth. Walk the shoreline. 1.5 hours.", tags: ["activity", "photo"] },
      { time: "9:00 AM", text: "OPTIONAL: Lake Agnes Tea House hike (3.4 km, moderate-steep, 2 hrs). Split group: fit guys hike, others stay lakeside.", tags: ["activity"] },
      { time: "11:00 AM", text: "Regroup at parking lot. Head to Bow Lake and Peyto Lake (getting 20 Moraine Lake shuttle spots in summer is nearly impossible).", tags: ["drive"] },
      { time: "12:00 PM", text: "Lunch: Packed halal from coolers. Picnic at Herbert Lake pullout. Dhuhr prayer.", tags: ["food", "prayer"] },
      { time: "1:00 PM", text: "Bow Lake + Peyto Lake viewpoint. Stunning turquoise. Short walks. Free. 1.5 hours.", tags: ["activity", "photo"] },
      { time: "2:30 PM", text: "Turn around, drive back south toward Canmore (~1.5 hrs).", tags: ["drive"] },
      { time: "4:00 PM", text: "Asr prayer. Quarry Lake, Canmore. Teens jump in. Elders take it in from the bench. 1 hour.", tags: ["prayer", "activity"] },
      { time: "5:30 PM", text: "Back to hotel. Showers. Pack up. Everything loaded for tomorrow's early departure.", tags: ["hotel"] },
      { time: "7:00 PM", text: "FINAL BANFF DINNER. Big group feast from remaining Calgary groceries. Cook big. Feed everyone well. Last night in the mountains.", tags: ["food"] },
      { time: "9:00 PM", text: "Isha. Pack everything. Alarms for 5 AM.", tags: ["prayer"] },
    ],
  },
  {
    day: 8,
    title: "Canmore to Surrey",
    subtitle: "850 km \u2022 ~10 hrs driving \u2022 Through the mountains",
    route: "Canmore \u2192 Golden \u2192 Rogers Pass \u2192 Revelstoke \u2192 Kamloops \u2192 Hope \u2192 Surrey",
    items: [
      { time: "5:00 AM", text: "Fajr. Check out.", tags: ["prayer"] },
      { time: "5:30 AM", text: "DEPART CANMORE. Early start, long day through the mountains.", tags: ["drive"] },
      { time: "7:00 AM", text: "Golden, BC (~130 km). Gas + stretch. Kicking Horse River bridge view.", tags: ["drive"] },
      { time: "8:30 AM", text: "Rogers Pass / Glacier National Park (~80 km from Golden). Avalanche sheds, massive scenery. Rogers Pass Discovery Centre (free, 15 min).", tags: ["drive", "activity"] },
      { time: "9:30 AM", text: "Revelstoke (~70 km). Gas. Giant Cedars Boardwalk (free, 15-min loop through ancient cedars, all ages).", tags: ["drive", "activity"] },
      { time: "12:00 PM", text: "Kamloops (~300 km from Revelstoke). Gas + packed halal lunch. Dhuhr prayer. 45 min.", tags: ["drive", "food", "prayer"] },
      { time: "12:45 PM", text: "DEPART Kamloops. Push to Vancouver.", tags: ["drive"] },
      { time: "2:30 PM", text: "Asr prayer. Hope, BC (~200 km from Kamloops). Gas + stretch. Othello Tunnels optional (free, 30 min trail through old railway tunnels).", tags: ["prayer", "drive", "activity"] },
      { time: "5:00 PM", text: "ARRIVE SURREY. Budget extra time for Metro Vancouver traffic (can add 30-60 min easily).", tags: ["drive"] },
      { time: "5:30 PM", text: "Check in: Happy Day Inn Surrey (~$170-250/night) or Travelodge Langley. 8-10 rooms, 2 nights. Same floor, designate hangout room.", tags: ["hotel"] },
      { time: "7:00 PM", text: "HALAL FEAST. You drove across Canada. Celebrate. Afghan Horsemen (1833 Anderson St, Vancouver, Afghan halal) or Pak Punjab Sweet & Samosas House (128 St, Surrey). Ask locals for current best halal spot.", tags: ["food"] },
      { time: "8:30 PM", text: "Isha. Hangout room. Rest.", tags: ["prayer"] },
    ],
  },
  {
    day: 9,
    title: "Full Vancouver Day",
    subtitle: "Stanley Park \u2022 Lynn Canyon \u2022 Gastown",
    route: "Surrey \u2192 Stanley Park \u2192 Lynn Canyon \u2192 Gastown \u2192 Surrey",
    items: [
      { time: "6:00 AM", text: "Fajr.", tags: ["prayer"] },
      { time: "7:30 AM", text: "Breakfast.", tags: ["food"] },
      { time: "8:30 AM", text: "DEPART for Stanley Park (~45 min from Surrey with traffic). Go early for parking. Finding spots for 4 SUVs takes time.", tags: ["drive"] },
      { time: "9:15 AM", text: "Stanley Park Seawall. Walk the seawall (free) or rent bikes (~$15-20/person). Totem Poles, harbour views, Lions Gate Bridge. 2.5 hours.", tags: ["activity", "photo"] },
      { time: "11:45 AM", text: "Drive to lunch. Budget 30 min for Vancouver traffic + parking.", tags: ["drive"] },
      { time: "12:15 PM", text: "Halal lunch: Afghan Horsemen (1833 Anderson St, well-known Afghan halal) or Donair Dude (multiple locations). Dhuhr prayer.", tags: ["food", "prayer"] },
      { time: "1:45 PM", text: "Drive to Lynn Canyon (~20 min from downtown).", tags: ["drive"] },
      { time: "2:00 PM", text: "Lynn Canyon Park. FREE suspension bridge (Capilano charges $65+). Forest walks, waterfalls. All ages. 1.5 hours.", tags: ["activity", "photo"] },
      { time: "3:30 PM", text: "Asr prayer.", tags: ["prayer"] },
      { time: "4:00 PM", text: "Optional: Drive through Gastown (steam clock, cobblestone streets) on the way back. Quick photo stops.", tags: ["drive", "photo"] },
      { time: "5:30 PM", text: "Final halal dinner: Pak Punjab (Surrey) or Afghan Horsemen. Order big for the boys. Last meal before flying home.", tags: ["food"] },
      { time: "7:00 PM", text: "Back to hotel. PACK EVERYTHING for flights tomorrow. Isha before bed.", tags: ["prayer", "hotel"] },
    ],
  },
  {
    day: 10,
    title: "Fly Home",
    subtitle: "Vancouver \u2192 Ottawa \u2022 ~4.5 hr flight",
    route: "Surrey \u2192 YVR \u2192 YOW \u2192 HOME",
    items: [
      { time: "6:00 AM", text: "Fajr. Check out. Gather all belongings from vehicles.", tags: ["prayer"] },
      { time: "7:30 AM", text: "Return rental vehicles near YVR/Richmond. Allow 1-1.5 hours for 4 SUV returns, inspections, and shuttle to terminal.", tags: ["drive"] },
      { time: "9:30 AM", text: "Arrive YVR airport. Check in, check bags, security. With 15-20 people this takes time.", tags: ["flight"] },
      { time: "11:00 AM", text: "Dhuhr prayer at YVR multi-faith room (post-security).", tags: ["prayer"] },
      { time: "12:00 PM", text: "FLIGHT: YVR to YOW. ~4.5 hrs direct.", tags: ["flight"] },
      { time: "7:30 PM", text: "ARRIVE OTTAWA (Eastern time). HOME.", tags: ["flight"] },
    ],
  },
];

const checklistItems = [
  { text: "Book Canmore hotels (8-10 rooms, 2 nights)", urgent: true },
  { text: "Book YVR \u2192 YOW flights (15-20 one-way tickets, ~$250-350/person)", urgent: true },
  { text: "Grocery run at Bilal Farms (2953 Carling Ave) the evening before departure. Marinated chicken, lamb, kebab meat, naan, wraps, fruit, drinks, snacks for Days 1-3. Fill coolers with ice.", urgent: true },
  { text: "Book one-way SUV rentals (4 full-size SUVs, Ottawa \u2192 Vancouver, ~$3,000-4,500/vehicle)", urgent: false },
  { text: "No Parks Canada pass needed. Canada Strong Pass = FREE admission Jun 19 - Sep 7, 2026.", urgent: false },
  { text: "Confirm 8+ drivers with valid licenses", urgent: false },
  { text: "Buy 4 large coolers + ice packs", urgent: false },
  { text: "Create WhatsApp group for the trip (all drivers + passengers)", urgent: false },
  { text: "Verify halal status of all restaurants 1-2 weeks before", urgent: false },
  { text: "Each vehicle: chargers, first aid kit, prayer mats, water, snacks, phone mounts", urgent: false },
  { text: "Check which day is Friday and find nearest mosque for Jummah prayer", urgent: false },
  { text: "Book Canmore suites with kitchenettes (needed to cook halal meals)", urgent: false },
  { text: "Prep Banff picnic (naan, kebab, salad, watermelon, green tea) the night before at Canmore kitchen", urgent: false },
];

const tagConfig: Record<string, { bg: string; text: string; label: string }> = {
  drive: { bg: "bg-sky-950", text: "text-sky-300", label: "Drive" },
  food: { bg: "bg-orange-950", text: "text-orange-300", label: "Halal Food" },
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
      <div className="relative py-32 sm:py-40 px-4 text-center border-b border-neutral-800 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-bottom bg-no-repeat"
          style={{ backgroundImage: "url('/images/banff-hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[#0a0a0a]" />
        <div className="relative z-10">
        <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-2">
          June 28 - July 7, 2026
        </p>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-2 drop-shadow-lg">
          Banff & Vancouver
        </h1>
        <p className="text-neutral-300 text-lg drop-shadow">
          Ottawa to the Rockies. 10 Days. 4 SUVs. 1 Crew.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {[
            { value: "4,630", label: "KM Driven" },
            { value: "10", label: "Days" },
            { value: "6", label: "Provinces" },
            { value: "15-20", label: "Crew" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center"
            >
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-neutral-400 uppercase tracking-wide">
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
              { label: "SUV Rental (split 5/car)", value: "$600 - $900" },
              { label: "Gas (~$1,080/car \u00f7 5)", value: "$215" },
              { label: "Hotels (8 nights)", value: "$550 - $900" },
              { label: "Flight YVR\u2192YOW", value: "$250 - $350" },
              { label: "Food (10 days)", value: "$300 - $500" },
              { label: "Parks", value: "FREE" },
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
                $1,900 - $2,850
              </p>
            </div>
            <p className="text-neutral-600 text-xs mt-2">
              Gas: 4,630 km x 15 L/100km = 695 L/car x $1.55/L = ~$1,080/car. Hotels: 8 nights avg $150/room, 2 people/room. Parks Canada admission free Jun 19 - Sep 7 (Canada Strong Pass).
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

      <footer className="text-center py-8 text-neutral-600 text-xs border-t border-neutral-800">
        Built for the boys. Summer 2026.
      </footer>
    </div>
  );
}
