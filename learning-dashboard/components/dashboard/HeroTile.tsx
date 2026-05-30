"use client";

import { motion } from "framer-motion";
import { Flame, Zap, Star } from "lucide-react";
import { BentoTile } from "./BentoTile";

const STREAK_DAYS = 12;
const WEEKLY_GOAL = 5;
const WEEKLY_DONE = 4;

export function HeroTile() {
  const weekProgress = (WEEKLY_DONE / WEEKLY_GOAL) * 100;

  return (
    <BentoTile className="min-h-[200px]" glowColor="purple">
      <div className="p-6 h-full flex flex-col justify-between gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400 mb-1 font-medium">Welcome back</p>
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              Alex Johnson 👋
            </h1>
            <p className="text-slate-400 text-sm mt-2">
              You&apos;re on a roll — keep the momentum going!
            </p>
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
            className="flex-shrink-0 flex flex-col items-center gap-1 bg-gradient-to-br from-orange-500/20 to-red-500/10 border border-orange-500/20 rounded-2xl px-4 py-3"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Flame className="w-6 h-6 text-orange-400" />
            </motion.div>
            <span className="text-2xl font-bold text-white leading-none">{STREAK_DAYS}</span>
            <span className="text-xs text-orange-300/80 font-medium">day streak</span>
          </motion.div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 bg-white/[0.03] rounded-xl p-4 border border-white/[0.05]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-medium text-slate-300">Weekly Goal</span>
              </div>
              <span className="text-xs text-slate-400">{WEEKLY_DONE}/{WEEKLY_GOAL} days</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${weekProgress}%` }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col items-center justify-center bg-white/[0.03] rounded-xl px-4 py-3 border border-white/[0.05] min-w-[80px]">
              <Star className="w-4 h-4 text-violet-400 mb-1" />
              <span className="text-lg font-bold text-white">2,840</span>
              <span className="text-xs text-slate-400">XP Total</span>
            </div>
            <div className="flex flex-col items-center justify-center bg-white/[0.03] rounded-xl px-4 py-3 border border-white/[0.05] min-w-[80px]">
              <span className="text-lg font-bold text-white mb-0.5">🏆</span>
              <span className="text-lg font-bold text-white">7</span>
              <span className="text-xs text-slate-400">Badges</span>
            </div>
          </div>
        </div>
      </div>
    </BentoTile>
  );
}
