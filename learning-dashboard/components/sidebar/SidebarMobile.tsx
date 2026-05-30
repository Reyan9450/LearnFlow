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

interface SidebarMobileProps {
  items: NavItemData[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function SidebarMobile({ items, activeId, onSelect }: SidebarMobileProps) {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#111118]/95 backdrop-blur-xl border-t border-white/5"
      aria-label="Mobile navigation"
    >
      <ul className="flex items-center justify-around px-2 py-2" role="list">
        {items.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;

          return (
            <li key={item.id}>
              <button
                onClick={() => onSelect(item.id)}
                className={cn(
                  "relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl",
                  "text-xs font-medium transition-colors duration-150",
                  isActive ? "text-violet-400" : "text-slate-500"
                )}
                aria-current={isActive ? "page" : undefined}
                aria-label={item.label}
              >
                {isActive && (
                  <motion.span
                    layoutId="mobile-active-bg"
                    className="absolute inset-0 rounded-xl bg-violet-600/15"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className="w-5 h-5 relative z-10" />
                <span className="relative z-10">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
