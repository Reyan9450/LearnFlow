"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Globe,
  Cpu,
  Layers,
  Palette,
  Shield,
  Zap,
  BookOpen,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { BentoTile } from "./BentoTile";
import type { Course } from "@/types";

const ICON_MAP: Record<string, LucideIcon> = {
  Code2, Database, Globe, Cpu, Layers, Palette, Shield, Zap, BookOpen, BarChart3,
  code: Code2, database: Database, globe: Globe, cpu: Cpu, layers: Layers,
  palette: Palette, shield: Shield, zap: Zap, book: BookOpen, chart: BarChart3,
};

const GRADIENT_PRESETS = [
  "from-violet-600/20 to-blue-600/10",
  "from-blue-600/20 to-cyan-600/10",
  "from-cyan-600/20 to-teal-600/10",
  "from-pink-600/20 to-violet-600/10",
  "from-orange-600/20 to-pink-600/10",
];

const ICON_COLOR_PRESETS = [
  "text-violet-400 bg-violet-500/15",
  "text-blue-400 bg-blue-500/15",
  "text-cyan-400 bg-cyan-500/15",
  "text-pink-400 bg-pink-500/15",
  "text-orange-400 bg-orange-500/15",
];

const GLOW_PRESETS: Array<"purple" | "blue" | "cyan" | "pink"> = [
  "purple", "blue", "cyan", "pink", "purple",
];

interface CourseCardProps {
  course: Course;
  index?: number;
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  const Icon = ICON_MAP[course.icon_name] ?? BookOpen;
  const gradientClass = GRADIENT_PRESETS[index % GRADIENT_PRESETS.length];
  const iconColorClass = ICON_COLOR_PRESETS[index % ICON_COLOR_PRESETS.length];
  const glowColor = GLOW_PRESETS[index % GLOW_PRESETS.length];

  return (
    <BentoTile glowColor={glowColor} className="min-h-[180px]">
      <div className="p-5 h-full flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${iconColorClass}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-white leading-snug line-clamp-2">
              {course.title}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">{course.progress}% complete</p>
          </div>
        </div>

        <div className="flex-1" />

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500">Progress</span>
            <span className="text-xs font-medium text-slate-300">{course.progress}%</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
            />
          </div>
        </div>

        <div
          className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t ${gradientClass} opacity-30 pointer-events-none rounded-b-2xl`}
          aria-hidden="true"
        />
      </div>
    </BentoTile>
  );
}
