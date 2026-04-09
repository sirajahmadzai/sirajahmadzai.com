"use client";

import { useState } from "react";

const days = [
  {
    day: 1,
    title: "Ottawa to Sault Ste Marie",
    subtitle: "700 km \u2022 ~7 hrs driving \u2022 Hwy 17 West",
    route: "Ottawa \u2192 Sudbury \u2192 Sault Ste Marie",
    items: [
      { time: "5:30 AM", text: "Fajr prayer. Load vehicles.", tags: ["prayer"] },
      { time: "6:00 AM", text: "HALAL GROCERY STOP #1 \u2014 Bilal's Meat & Grocery or Al-Jazeera Grocery (South Keys / St. Laurent, Ottawa). Buy: deli meats, bread, wraps, hummus, fruit, drinks, snacks for Days 1-3. Fill all 4 coolers with ice.", tags: ["food"] },
      { time: "7:00 AM", text: "DEPART OTTAWA. Convoy formation: lead car sets pace, tail car confirms everyone through every merge/exit.", tags: ["drive"] },
      { time: "9:30 AM", text: "Pit stop #1: Gas + bathrooms. Arnprior/Renfrew area. 15 min max.", tags: ["drive"] },
      { time: "12:00 PM", text: "Lunch stop: Sudbury area. Packed halal sandwiches/wraps from coolers. Dhuhr prayer. 45 min.", tags: ["food", "prayer"] },
      { time: "12:45 PM", text: "Continue west on Hwy 17.", tags: ["drive"] },
      { time: "2:30 PM", text: "Pit stop #2: Gas + stretch at Espanola or Blind River.", tags: ["drive"] },
      { time: "4:00 PM", text: "ARRIVE SAULT STE MARIE.", tags: ["drive"] },
      { time: "5:30 PM", text: "Check in: Microtel Inn & Suites or Super 8 Sault Ste Marie (~$140-180/night). 8-10 rooms.", tags: ["hotel"] },
      { time: "6:00 PM", text: "Dinner: Istanbul Kebab House or Tandoori Grill (call ahead, verify halal). If nothing verified, eat from coolers + order seafood.", tags: ["food"] },
      { time: "7:30 PM", text: "Walk the boardwalk along St. Marys River. Free. Good for the 8-year-old to burn energy.", tags: ["activity"] },
      { time: "9:00 PM", text: "Isha prayer. Ice resupply for coolers. Early sleep.", tags: ["prayer"] },
    ],
  },
  {
    day: 2,
    title: "Sault Ste Marie to Thunder Bay",
    subtitle: "700 km \u2022 ~7.5 hrs driving \u2022 Hwy 17 North",
    route: "Sault Ste Marie \u2192 Wawa \u2192 White River \u2192 Thunder Bay",
    items: [
      { time: "5:30 AM", text: "Fajr. Load up.", tags: ["prayer"] },
      { time: "6:00 AM", text: "DEPART. Trans-Canada wilderness. Gas stations get sparse. Top off ALL vehicles before leaving.", tags: ["drive"] },
      { time: "8:30 AM", text: "Pit stop: Wawa. Gas + stretch. PHOTO STOP: Wawa Goose (giant Canada goose statue). The 8-year-old will love it.", tags: ["drive", "photo"] },
      { time: "10:30 AM", text: "Pit stop: White River area. Gas. 'Coldest Spot in Canada' sign photo.", tags: ["drive", "photo"] },
      { time: "12:30 PM", text: "Lunch: Marathon or Nipigon area. Packed halal lunch from coolers. Dhuhr prayer. 45 min.", tags: ["food", "prayer"] },
      { time: "1:15 PM", text: "Continue to Thunder Bay.", tags: ["drive"] },
      { time: "3:00 PM", text: "ARRIVE THUNDER BAY.", tags: ["drive"] },
      { time: "3:30 PM", text: "MUST-STOP: Terry Fox Memorial. On Hwy 11/17. Free. Powerful monument. Group photo.", tags: ["activity", "photo"] },
      { time: "4:00 PM", text: "Check in: Super 8 Thunder Bay (~$130-170/night) or Travelodge.", tags: ["hotel"] },
      { time: "5:00 PM", text: "Dinner: The Persian Man (verify halal) or Naxos Greek Taverna (seafood). Otherwise cooler food.", tags: ["food"] },
      { time: "9:00 PM", text: "Isha prayer. Rest. Day 2 was a grind.", tags: ["prayer"] },
    ],
  },
  {
    day: 3,
    title: "Thunder Bay to Winnipeg",
    subtitle: "700 km \u2022 ~7.5 hrs driving \u2022 Hwy 17 to Trans-Canada Hwy 1",
    route: "Thunder Bay \u2192 Kenora \u2192 Winnipeg",
    items: [
      { time: "5:30 AM", text: "Fajr. Load up.", tags: ["prayer"] },
      { time: "6:30 AM", text: "DEPART. Cross into Manitoba today.", tags: ["drive"] },
      { time: "8:30 AM", text: "Pit stop: Kenora, ON. Gas + stretch. Quick Lake of the Woods waterfront look.", tags: ["drive", "activity"] },
      { time: "9:00 AM", text: "Cross Manitoba border. Welcome sign photo.", tags: ["photo"] },
      { time: "12:00 PM", text: "ARRIVE WINNIPEG.", tags: ["drive"] },
      { time: "12:30 PM", text: "HALAL GROCERY STOP #2: Noor Supermarket or Basha Foods Winnipeg. Major restock for Days 3-5. Refill cooler ice. Dhuhr prayer.", tags: ["food", "prayer"] },
      { time: "1:30 PM", text: "Halal lunch: Baraka Pita Bakery, Smakeena Shawarma, or Falafel Place (Pembina Hwy). Feed the crew properly.", tags: ["food"] },
      { time: "2:30 PM", text: "Check in: Super 8 Winnipeg (~$120-160/night) or Days Inn.", tags: ["hotel"] },
      { time: "3:30 PM", text: "The Forks. Free. Market, riverfront, skatepark. All ages. 2 hours.", tags: ["activity"] },
      { time: "5:30 PM", text: "Canadian Museum for Human Rights \u2014 walk the exterior + grounds (free). Interior $20/person if group wants.", tags: ["activity"] },
      { time: "7:00 PM", text: "Halal dinner out. Same restaurant strip.", tags: ["food"] },
      { time: "9:00 PM", text: "Isha. Rest. Winnipeg is your midpoint recovery city.", tags: ["prayer"] },
    ],
  },
  {
    day: 4,
    title: "Winnipeg to Regina",
    subtitle: "570 km \u2022 ~5.5 hrs driving \u2022 Trans-Canada Hwy 1",
    route: "Winnipeg \u2192 Brandon \u2192 Regina",
    items: [
      { time: "6:00 AM", text: "Fajr.", tags: ["prayer"] },
      { time: "7:30 AM", text: "DEPART. Shortest drive day. Recovery pace.", tags: ["drive"] },
      { time: "9:30 AM", text: "Pit stop: Brandon, MB. Gas + stretch + snack from coolers.", tags: ["drive"] },
      { time: "11:00 AM", text: "Cross Saskatchewan border. Welcome sign photo. The Prairies are flat, endless, and beautiful. Windows down.", tags: ["drive", "photo"] },
      { time: "1:00 PM", text: "ARRIVE REGINA. Early arrival.", tags: ["drive"] },
      { time: "1:30 PM", text: "Lunch: Spicy Chicken or Afrah Mediterranean (verify halal). Otherwise packed lunch. Dhuhr prayer.", tags: ["food", "prayer"] },
      { time: "2:30 PM", text: "Check in: Motel 6 Regina (~$110-150/night) or Super 8.", tags: ["hotel"] },
      { time: "3:30 PM", text: "RCMP Heritage Centre. $12/person. Interactive, educational. Great for all ages. 1.5 hours.", tags: ["activity"] },
      { time: "5:00 PM", text: "Wascana Park. Free. Walk the lake, watch the geese, stretch legs.", tags: ["activity"] },
      { time: "6:30 PM", text: "Dinner from packed halal food or local seafood/veggie.", tags: ["food"] },
      { time: "8:00 PM", text: "Rest early. Tomorrow is a long push to the mountains.", tags: ["prayer"] },
    ],
  },
  {
    day: 5,
    title: "Regina to Canmore (via Calgary)",
    subtitle: "850 km \u2022 ~8.5 hrs driving \u2022 Trans-Canada Hwy 1",
    route: "Regina \u2192 Swift Current \u2192 Medicine Hat \u2192 Calgary \u2192 Canmore",
    items: [
      { time: "5:00 AM", text: "Fajr. Load up. Today you hit the Rockies.", tags: ["prayer"] },
      { time: "5:30 AM", text: "DEPART. Long day but the reward is mountains.", tags: ["drive"] },
      { time: "8:00 AM", text: "Pit stop: Swift Current, SK. Gas + breakfast from coolers.", tags: ["drive"] },
      { time: "10:30 AM", text: "Pit stop: Medicine Hat, AB. Gas. You're in Alberta.", tags: ["drive"] },
      { time: "1:00 PM", text: "ARRIVE CALGARY. Do NOT skip this stop.", tags: ["drive"] },
      { time: "1:15 PM", text: "HALAL GROCERY STOP #3 \u2014 THE BIG ONE. Sana Halal Meat (NE Calgary) + Basha Foods International. Buy: chicken, lamb, beef for BBQ. Naan, rice, spices, marinated meats, drinks. This feeds you Days 5-8. Dhuhr prayer at mosque.", tags: ["food", "prayer"] },
      { time: "2:45 PM", text: "Halal lunch in Calgary: Shawarma Palace, Village Pita Bakery, or Jimmys A&A Shawarma.", tags: ["food"] },
      { time: "3:45 PM", text: "DEPART for Canmore. 100 km, 1 hr. Watch the Rockies appear on the horizon. This is the moment.", tags: ["drive"] },
      { time: "5:00 PM", text: "ARRIVE CANMORE.", tags: ["drive"] },
      { time: "5:30 PM", text: "Check in: Canmore Inn & Suites (~$220-300/night) or Rocky Mountain Ski Lodge. 8-10 rooms, 2 nights. MUST BE PRE-BOOKED.", tags: ["hotel"] },
      { time: "6:30 PM", text: "Walk Canmore Main Street. Mountain views everywhere. Policeman's Creek boardwalk (free, scenic).", tags: ["activity"] },
      { time: "7:30 PM", text: "Cook halal dinner at accommodation using Calgary groceries.", tags: ["food"] },
      { time: "9:00 PM", text: "Isha. Sleep. Tomorrow is the day you came for.", tags: ["prayer"] },
    ],
  },
  {
    day: 6,
    title: "Banff Day 1",
    subtitle: "Canmore is base camp \u2022 20 min to Banff",
    route: "Canmore \u2192 Johnston Canyon \u2192 Lake Minnewanka \u2192 Banff Town \u2192 Vermilion Lakes",
    items: [
      { time: "5:30 AM", text: "Fajr.", tags: ["prayer"] },
      { time: "6:30 AM", text: "Breakfast from groceries.", tags: ["food"] },
      { time: "7:00 AM", text: "DEPART for Johnston Canyon. Get there EARLY. By 10 AM it's a zoo.", tags: ["drive"] },
      { time: "7:30 AM", text: "Johnston Canyon hike. Lower Falls (1.1 km, easy, all ages). Upper Falls (2.7 km, moderate, teens+adults). 2 hours. Group photos.", tags: ["activity", "photo"] },
      { time: "9:30 AM", text: "Lake Minnewanka. Walk the lakeshore. Mountain lake, crystal water. Free. 1 hour.", tags: ["activity", "photo"] },
      { time: "10:30 AM", text: "Surprise Corner viewpoint. Iconic Fairmont + Bow River view. Free. 15 min.", tags: ["photo"] },
      { time: "10:45 AM", text: "Bow Falls. 5 min walk from Surprise Corner. Free.", tags: ["activity"] },
      { time: "11:15 AM", text: "Drive to Cascade Ponds.", tags: ["drive"] },
      { time: "11:30 AM", text: "HALAL BBQ / PICNIC at Cascade Ponds. Grill Calgary halal meat. Rice, naan, salad. Dhuhr prayer by the water. This is the bonding moment. 1.5 hours.", tags: ["food", "prayer"] },
      { time: "1:00 PM", text: "Banff Avenue. Walk, browse, ice cream, souvenirs. 1.5 hours.", tags: ["activity"] },
      { time: "2:30 PM", text: "Tunnel Mountain hike. 4.3 km round trip, 1.5 hrs, 360\u00b0 views. Teens + fit adults. The 70-year-old + 8-year-old can do the flat Fenland Trail instead.", tags: ["activity"] },
      { time: "4:00 PM", text: "Two Jack Lake. Less crowded. Skip rocks. Rest. 1 hour.", tags: ["activity"] },
      { time: "7:30 PM", text: "SUNSET at Vermilion Lakes. Mt. Rundle reflection. Best sunset in Banff. Free. Group photos. The postcard moment.", tags: ["activity", "photo"] },
      { time: "9:00 PM", text: "Back to Canmore. Halal dinner from groceries. Isha.", tags: ["food", "prayer"] },
    ],
  },
  {
    day: 7,
    title: "Banff Day 2 \u2014 Lake Louise + Icefields",
    subtitle: "Big-ticket scenery day",
    route: "Canmore \u2192 Lake Louise \u2192 Icefields Parkway \u2192 Quarry Lake",
    items: [
      { time: "5:30 AM", text: "Fajr.", tags: ["prayer"] },
      { time: "6:00 AM", text: "Breakfast. Pack all halal lunches into coolers.", tags: ["food"] },
      { time: "6:30 AM", text: "DEPART for Lake Louise. 55 min from Canmore. Go at dawn for parking (fills by 9 AM).", tags: ["drive"] },
      { time: "7:30 AM", text: "Lake Louise. Turquoise water, Victoria Glacier. One of the most photographed spots on Earth. Walk the shoreline. 1.5 hours.", tags: ["activity", "photo"] },
      { time: "9:00 AM", text: "OPTIONAL: Lake Agnes Tea House hike (3.4 km, moderate-steep, 2 hrs). Split group: fit guys hike, others stay lakeside.", tags: ["activity"] },
      { time: "11:00 AM", text: "Regroup at parking lot.", tags: ["drive"] },
      { time: "11:15 AM", text: "Moraine Lake shuttle (book at reservation.pc.gc.ca weeks in advance) or Roam Transit. If no spots for 20, skip and spend more time elsewhere.", tags: ["activity"] },
      { time: "12:30 PM", text: "Lunch: Packed halal from coolers. Picnic at Herbert Lake pullout. Dhuhr prayer.", tags: ["food", "prayer"] },
      { time: "1:30 PM", text: "Icefields Parkway drive. Go 30-40 km north to Bow Lake + Peyto Lake viewpoint. Stunning turquoise. Short walks. Free with Parks pass. 1.5 hours.", tags: ["activity", "photo"] },
      { time: "3:00 PM", text: "Turn around, drive back south toward Canmore.", tags: ["drive"] },
      { time: "4:00 PM", text: "Quarry Lake, Canmore. Swimming hole (cold but swimmable). Teens jump in. 70-year-old sits on bench. 1.5 hours.", tags: ["activity"] },
      { time: "5:30 PM", text: "Back to hotel. Showers. Pack up. Load vehicles.", tags: ["hotel"] },
      { time: "7:00 PM", text: "FINAL BANFF DINNER. Big group feast from remaining Calgary groceries. Make it legendary.", tags: ["food"] },
      { time: "9:00 PM", text: "Isha. Pack everything. Alarms for 5 AM.", tags: ["prayer"] },
    ],
  },
  {
    day: 8,
    title: "Banff to Vancouver",
    subtitle: "850 km \u2022 ~10 hrs driving \u2022 Through the mountains",
    route: "Canmore \u2192 Golden \u2192 Rogers Pass \u2192 Revelstoke \u2192 Kamloops \u2192 Hope \u2192 Surrey",
    items: [
      { time: "5:00 AM", text: "Fajr. Load vehicles. Check out.", tags: ["prayer"] },
      { time: "5:30 AM", text: "DEPART CANMORE. Early start, long beautiful day.", tags: ["drive"] },
      { time: "7:00 AM", text: "Golden, BC. Gas + stretch. Kicking Horse River bridge view.", tags: ["drive"] },
      { time: "8:30 AM", text: "Rogers Pass / Glacier National Park. Avalanche sheds, massive scenery. Rogers Pass Discovery Centre (free, 15 min).", tags: ["drive", "activity"] },
      { time: "9:30 AM", text: "Revelstoke. Gas. Giant Cedars Boardwalk (free, 15-min loop through ancient cedars, all ages).", tags: ["drive", "activity"] },
      { time: "12:00 PM", text: "Kamloops. Gas + packed halal lunch. Dhuhr prayer. 45 min.", tags: ["drive", "food", "prayer"] },
      { time: "12:45 PM", text: "DEPART Kamloops. Push to Vancouver.", tags: ["drive"] },
      { time: "2:30 PM", text: "Hope, BC. Gas + stretch. Othello Tunnels optional (free, 30 min trail through old railway tunnels).", tags: ["drive", "activity"] },
      { time: "4:30 PM", text: "ARRIVE SURREY/BURNABY. Budget extra 30-60 min for Metro Vancouver traffic.", tags: ["drive"] },
      { time: "5:30 PM", text: "Check in: Happy Day Inn Surrey (~$170-250/night) or Travelodge Langley. 8-10 rooms, 2 nights.", tags: ["hotel"] },
      { time: "6:30 PM", text: "HALAL FEAST. You drove across Canada. Celebrate. Pak Punjab (8120 128 St, Surrey), Karakoram Restaurant, or Tandoori Flame (128 St, Surrey).", tags: ["food"] },
      { time: "8:30 PM", text: "Isha. Rest.", tags: ["prayer"] },
    ],
  },
  {
    day: 9,
    title: "Full Vancouver Day",
    subtitle: "Stanley Park \u2022 Granville Island \u2022 Lynn Canyon \u2022 Sunset",
    route: "Surrey \u2192 Stanley Park \u2192 Granville Island \u2192 Lynn Canyon \u2192 Gastown \u2192 English Bay",
    items: [
      { time: "6:00 AM", text: "Fajr.", tags: ["prayer"] },
      { time: "7:30 AM", text: "Breakfast. Optional halal grocery stop in Surrey if needed.", tags: ["food"] },
      { time: "8:30 AM", text: "DEPART for Stanley Park. Go early for parking.", tags: ["drive"] },
      { time: "9:00 AM", text: "Stanley Park Seawall. Walk or rent bikes ($15-20/person). Totem Poles, harbour views, Lions Gate Bridge. 2.5 hours. Free.", tags: ["activity", "photo"] },
      { time: "11:30 AM", text: "Granville Island. Public Market, street performers, waterfront. 1 hour.", tags: ["activity"] },
      { time: "12:45 PM", text: "Halal lunch: Zamzam Grill (2128 Kingsway) or Afghan Horsemen (1833 Anderson St). Dhuhr prayer.", tags: ["food", "prayer"] },
      { time: "2:00 PM", text: "Lynn Canyon Park. FREE suspension bridge (Capilano charges $65+). Forest walks, waterfalls. All ages. 1.5 hours.", tags: ["activity", "photo"] },
      { time: "3:30 PM", text: "Gastown. Steam clock, cobblestone streets. 30-45 min.", tags: ["activity", "photo"] },
      { time: "4:15 PM", text: "Canada Place + Waterfront. Ocean, mountains, cruise ships. Free. 30 min.", tags: ["activity"] },
      { time: "5:00 PM", text: "Queen Elizabeth Park. Highest point in Vancouver. City + mountain panorama. Free. 45 min.", tags: ["activity", "photo"] },
      { time: "6:00 PM", text: "English Bay sunset. Sit on the beach. Skip rocks. Sun sets over the Pacific. The moment.", tags: ["activity", "photo"] },
      { time: "8:00 PM", text: "Final halal dinner: Donair Dude, Al-Basha, or Pak Punjab farewell meal.", tags: ["food"] },
      { time: "9:30 PM", text: "Back to hotel. PACK EVERYTHING for flights. Isha.", tags: ["prayer", "hotel"] },
    ],
  },
  {
    day: 10,
    title: "Fly Home",
    subtitle: "Vancouver \u2192 Ottawa \u2022 ~4.5 hr flight",
    route: "Surrey \u2192 YVR \u2192 YOW \u2192 HOME",
    items: [
      { time: "6:00 AM", text: "Fajr. Check out. Load vehicles.", tags: ["prayer"] },
      { time: "7:00 AM", text: "Optional: Deep Cove (30 min from Surrey). Quiet inlet, mountain reflection, honey doughnuts. 45 min.", tags: ["activity"] },
      { time: "8:30 AM", text: "Return rental vehicles near YVR/Richmond. Allow 1 hour for returns + shuttle to terminal.", tags: ["drive"] },
      { time: "10:00 AM", text: "Arrive YVR airport. Check in. Check bags. Security.", tags: ["flight"] },
      { time: "11:00 AM", text: "Dhuhr prayer at YVR multi-faith room (post-security).", tags: ["prayer"] },
      { time: "12:00 PM", text: "FLIGHT: YVR to YOW. ~4.5 hrs + 3 hrs time zone gain.", tags: ["flight"] },
      { time: "10:00 PM", text: "ARRIVE OTTAWA. HOME.", tags: ["flight"] },
    ],
  },
];

const checklistItems = [
  { text: "Book Canmore hotels (8-10 rooms, 2 nights)", urgent: true },
  { text: "Book YVR \u2192 YOW flights (15-20 tickets)", urgent: true },
  { text: "Book one-way vehicle rentals (4 SUVs/minivans, Ottawa \u2192 Vancouver)", urgent: false },
  { text: "Book Moraine Lake shuttle at reservation.pc.gc.ca", urgent: false },
  { text: "Buy Parks Canada passes online", urgent: false },
  { text: "Confirm 8+ designated drivers", urgent: false },
  { text: "Buy 4 large coolers + ice packs", urgent: false },
  { text: "Set up WhatsApp convoy group for all drivers", urgent: false },
  { text: "Verify halal status of all restaurants 1-2 weeks before", urgent: false },
  { text: "Each vehicle: chargers, first aid, prayer mats, water, snacks, walkie-talkie", urgent: false },
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

  const toggleDay = (index: number) => {
    setActiveDay(activeDay === index ? null : index);
  };

  const toggleCheck = (index: number) => {
    const next = { ...checks, [index]: !checks[index] };
    setChecks(next);
    if (typeof window !== "undefined") {
      localStorage.setItem(`trip-check-${index}`, String(next[index]));
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-200">
      {/* Hero */}
      <div className="py-12 px-4 text-center border-b border-neutral-800 bg-gradient-to-br from-[#0a0a0a] via-[#0f172a] to-[#0a0a0a]">
        <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-2">
          Summer 2026
        </p>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-2">
          Banff & Vancouver
        </h1>
        <p className="text-neutral-400 text-lg">
          Ottawa to the Rockies. 10 Days. 4 Trucks. 1 Crew.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {[
            { value: "4,350", label: "KM Driven" },
            { value: "10", label: "Days" },
            { value: "6", label: "Provinces" },
            { value: "15-20", label: "Crew" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-[#141414] border border-neutral-800 rounded-xl p-4 text-center"
            >
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-neutral-500 uppercase tracking-wide">
                {s.label}
              </p>
            </div>
          ))}
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
            Cost Breakdown (Per Person)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            {[
              { label: "Vehicle Rentals", value: "$700 - $1,200" },
              { label: "Gas", value: "$160 - $200" },
              { label: "Hotels", value: "$600 - $1,000" },
              { label: "Flight (YVR-YOW)", value: "$320 - $500" },
              { label: "Food", value: "$250 - $500" },
              { label: "Parks + Misc", value: "$50 - $100" },
            ].map((c) => (
              <div key={c.label}>
                <p className="text-neutral-500">{c.label}</p>
                <p className="text-white font-semibold">{c.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-800 flex justify-between items-center">
            <p className="text-neutral-400 font-medium">Total Per Person</p>
            <p className="text-2xl font-black text-cyan-400">
              $2,075 - $3,500
            </p>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="border border-neutral-800 rounded-xl p-6 bg-neutral-900/50">
          <h3 className="text-lg font-bold text-white mb-4">
            Pre-Trip Checklist
          </h3>
          <div className="space-y-3 text-sm">
            {checklistItems.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 cursor-pointer"
                onClick={() => toggleCheck(i)}
              >
                <input
                  type="checkbox"
                  checked={!!checks[i]}
                  onChange={() => toggleCheck(i)}
                  className="mt-1 accent-cyan-400 w-4 h-4 shrink-0"
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
        Built for the crew. Summer 2026.
      </footer>
    </div>
  );
}
