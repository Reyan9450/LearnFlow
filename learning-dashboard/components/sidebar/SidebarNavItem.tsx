"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemData {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
}

interface SidebarNavItemProps {
  item: NavItemData;
  isActive: boolean;
  collapsed: boolean;
  onClick: () => void;
}

export function SidebarNavItem({ item, isActive, collapsed, onClick }: SidebarNavItemProps) {
  const Icon = item.icon;

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg",
        "text-sm font-medium transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50",
        isActive ? "text-white" : "text-slate-400 hover:text-slate-200",
        collapsed && "justify-center"
      )}
      aria-current={isActive ? "page" : undefined}
      title={collapsed ? item.label : undefined}
    >
      {isActive && (
        <motion.span
          layoutId="sidebar-active-bg"
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-600/20 to-blue-600/10 border border-violet-500/20"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}

      {!isActive && (
        <motion.span
          className="absolute inset-0 rounded-lg bg-white/0 hover:bg-white/5"
          transition={{ duration: 0.15 }}
        />
      )}

      <Icon className={cn("w-4 h-4 flex-shrink-0 relative z-10", isActive && "text-violet-400")} />

      {!collapsed && (
        <span className="relative z-10 whitespace-nowrap">{item.label}</span>
      )}

      {isActive && !collapsed && (
        <motion.span
          layoutId="sidebar-active-dot"
          className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400 relative z-10"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </button>
  );
}
