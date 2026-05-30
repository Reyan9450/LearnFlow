"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  message?: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="flex flex-col items-center justify-center min-h-[400px] gap-4 p-8"
    >
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
        <AlertTriangle className="w-8 h-8 text-red-400" />
      </div>

      <div className="text-center max-w-sm">
        <h2 className="text-lg font-semibold text-white mb-2">
          Failed to load dashboard
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          {message ??
            "Could not connect to the database. Please check your Supabase configuration and try again."}
        </p>
      </div>

      <button
        onClick={() => window.location.reload()}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-slate-300 transition-colors duration-150"
      >
        <RefreshCw className="w-4 h-4" />
        Retry
      </button>
    </motion.div>
  );
}
