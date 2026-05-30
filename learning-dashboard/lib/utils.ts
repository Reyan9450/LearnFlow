import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ActivityDay } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateActivityData(weeks = 16): ActivityDay[] {
  const days: ActivityDay[] = [];
  const anchor = new Date("2026-05-30T00:00:00.000Z");
  const rand = seededRandom(42);

  for (let i = weeks * 7 - 1; i >= 0; i--) {
    const date = new Date(anchor);
    date.setUTCDate(date.getUTCDate() - i);

    const dayOfWeek = date.getUTCDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    let count = 0;

    if (!isWeekend) {
      if (rand() > 0.35) count = Math.floor(rand() * 4) + 1;
    } else {
      if (rand() > 0.65) count = Math.floor(rand() * 3) + 1;
    }

    days.push({ date: date.toISOString().split("T")[0], count });
  }

  return days;
}

export function activityColor(count: number): string {
  if (count === 0) return "bg-white/5";
  if (count === 1) return "bg-violet-900/60";
  if (count === 2) return "bg-violet-700/70";
  if (count === 3) return "bg-violet-500/80";
  return "bg-violet-400";
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
