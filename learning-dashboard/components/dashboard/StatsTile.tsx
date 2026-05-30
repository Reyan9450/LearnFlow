"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Target } from "lucide-react";
import { BentoTile } from "./BentoTile";

interface StatsTileProps {
  coursesCount: number;
}

export function StatsTile({ coursesCount }: StatsTileProps) {
  const stats = [
    {
      icon: TrendingUp,
      label: "Active Courses",
      value: coursesCount,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
    },
    {
      icon: Clock,
      label: "Hours This Week",
      value: "14.5",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      icon: Target,
      label: "Goals Met",
      value: "3/4",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
  ];

  return (
    <BentoTile glowColor="blue" className="min-h-[200px]">
      <div className="p-5 h-full flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-white">Quick Stats</h2>

        <div className="flex flex-col gap-3 flex-1 justify-center">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.2 + i * 0.1,
                  type: "spring",
                  stiffness: 260,
                  damping: 24,
                }}
                className="flex items-center gap-3 bg-white/[0.03] rounded-xl p-3 border border-white/[0.04]"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.bg}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-400">{stat.label}</p>
                  <p className="text-lg font-bold text-white leading-tight">
                    {stat.value}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </BentoTile>
  );
}
