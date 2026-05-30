"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoTileProps {
  children: ReactNode;
  className?: string;
  glowColor?: "purple" | "blue" | "cyan" | "pink";
}

const glowMap = {
  purple: "hover:shadow-[0_0_30px_rgba(124,58,237,0.2),0_0_0_1px_rgba(124,58,237,0.15)]",
  blue: "hover:shadow-[0_0_30px_rgba(37,99,235,0.2),0_0_0_1px_rgba(37,99,235,0.15)]",
  cyan: "hover:shadow-[0_0_30px_rgba(6,182,212,0.2),0_0_0_1px_rgba(6,182,212,0.15)]",
  pink: "hover:shadow-[0_0_30px_rgba(236,72,153,0.2),0_0_0_1px_rgba(236,72,153,0.15)]",
};

export function BentoTile({ children, className, glowColor = "purple" }: BentoTileProps) {
  return (
    <motion.article
      whileHover={{
        scale: 1.015,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-[#111118] border border-white/[0.06]",
        "shadow-[0_2px_8px_rgba(0,0,0,0.3)]",
        "transition-shadow duration-300",
        glowMap[glowColor],
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(124,58,237,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(37,99,235,0.04) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.article>
  );
}
