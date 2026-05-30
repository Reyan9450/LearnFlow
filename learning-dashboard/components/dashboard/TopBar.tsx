"use client";

import { motion } from "framer-motion";
import { Search, Bell } from "lucide-react";

export function TopBar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="sticky top-0 z-10 flex items-center justify-between gap-4 px-4 md:px-6 py-4 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/[0.05]"
    >
      <div>
        <h1 className="text-base font-semibold text-white">Dashboard</h1>
        <p className="text-xs text-slate-500 hidden sm:block">Saturday, May 30, 2026</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] text-slate-400 hover:text-slate-200 transition-colors duration-150 text-sm"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
          <span className="hidden md:inline text-xs">Search...</span>
          <kbd className="hidden md:inline text-[10px] bg-white/5 px-1.5 py-0.5 rounded border border-white/10 text-slate-500">
            ⌘K
          </kbd>
        </button>

        <button
          className="relative w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors duration-150"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-violet-500" />
        </button>

        <button
          className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
          aria-label="User profile"
        >
          AJ
        </button>
      </div>
    </motion.header>
  );
}
