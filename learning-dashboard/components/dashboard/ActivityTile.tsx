"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { BentoTile } from "./BentoTile";
import { generateActivityData, activityColor } from "@/lib/utils";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getMonthLabels(activityData: ReturnType<typeof generateActivityData>) {
  const labels: { label: string; colIndex: number }[] = [];
  let lastMonth = -1;

  activityData.forEach((day, i) => {
    const month = new Date(day.date).getMonth();
    const col = Math.floor(i / 7);
    if (month !== lastMonth) {
      labels.push({ label: MONTHS[month], colIndex: col });
      lastMonth = month;
    }
  });

  return labels;
}

export function ActivityTile() {
  const activityData = generateActivityData(16);
  const weeks: typeof activityData[] = [];

  for (let i = 0; i < activityData.length; i += 7) {
    weeks.push(activityData.slice(i, i + 7));
  }

  const monthLabels = getMonthLabels(activityData);
  const totalActive = activityData.filter((d) => d.count > 0).length;

  return (
    <BentoTile glowColor="cyan" className="min-h-[200px]">
      <div className="p-5 md:p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center">
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Learning Activity</h2>
              <p className="text-xs text-slate-400">{totalActive} active days this period</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div key={level} className={`w-3 h-3 rounded-sm ${activityColor(level)}`} />
            ))}
            <span>More</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[400px]">
            <div className="flex mb-1 ml-8">
              {monthLabels.map(({ label, colIndex }) => (
                <div
                  key={`${label}-${colIndex}`}
                  className="text-xs text-slate-500"
                  style={{ position: "relative", left: `${colIndex * 16}px`, minWidth: 0 }}
                >
                  {label}
                </div>
              ))}
            </div>

            <div className="flex gap-1">
              <div className="flex flex-col gap-1 mr-1">
                {DAYS_OF_WEEK.map((day, i) => (
                  <div key={day} className="w-6 h-3 flex items-center justify-end">
                    {i % 2 === 1 && (
                      <span className="text-[10px] text-slate-600">{day.slice(0, 1)}</span>
                    )}
                  </div>
                ))}
              </div>

              {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-1">
                  {week.map((day, dayIdx) => (
                    <motion.div
                      key={day.date}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: weekIdx * 0.02 + dayIdx * 0.005,
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className={`w-3 h-3 rounded-sm activity-cell ${activityColor(day.count)}`}
                      title={`${day.date}: ${day.count} session${day.count !== 1 ? "s" : ""}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BentoTile>
  );
}
