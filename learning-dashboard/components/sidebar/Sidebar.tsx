"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Trophy,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Bell,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarNavItem } from "./SidebarNavItem";
import { SidebarMobile } from "./SidebarMobile";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { id: "courses", label: "My Courses", icon: BookOpen, href: "/courses" },
  { id: "progress", label: "Progress", icon: BarChart3, href: "/progress" },
  { id: "achievements", label: "Achievements", icon: Trophy, href: "/achievements" },
  { id: "notifications", label: "Notifications", icon: Bell, href: "/notifications" },
];

const BOTTOM_ITEMS = [
  { id: "profile", label: "Profile", icon: User, href: "/profile" },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeId, setActiveId] = useState("dashboard");

  return (
    <>
      <motion.aside
        animate={{ width: collapsed ? 72 : 240 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden lg:flex flex-col h-screen sticky top-0 bg-[#111118] border-r border-white/5 overflow-hidden z-20 flex-shrink-0"
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5 min-h-[72px]">
          <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-glow">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="font-semibold text-sm text-white whitespace-nowrap"
              >
                LearnFlow
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
          {NAV_ITEMS.map((item) => (
            <SidebarNavItem
              key={item.id}
              item={item}
              isActive={activeId === item.id}
              collapsed={collapsed}
              onClick={() => setActiveId(item.id)}
            />
          ))}
        </nav>

        <div className="px-2 py-4 border-t border-white/5 space-y-1">
          {BOTTOM_ITEMS.map((item) => (
            <SidebarNavItem
              key={item.id}
              item={item}
              isActive={activeId === item.id}
              collapsed={collapsed}
              onClick={() => setActiveId(item.id)}
            />
          ))}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg",
              "text-slate-400 hover:text-slate-200 hover:bg-white/5",
              "transition-colors duration-150 mt-2",
              collapsed && "justify-center"
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 flex-shrink-0" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs font-medium whitespace-nowrap">Collapse</span>
              </>
            )}
          </button>
        </div>
      </motion.aside>

      <aside className="hidden md:flex lg:hidden flex-col h-screen sticky top-0 w-[72px] bg-[#111118] border-r border-white/5 z-20 flex-shrink-0">
        <div className="flex items-center justify-center py-5 border-b border-white/5 min-h-[72px]">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-glow">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <SidebarNavItem
              key={item.id}
              item={item}
              isActive={activeId === item.id}
              collapsed={true}
              onClick={() => setActiveId(item.id)}
            />
          ))}
        </nav>
        <div className="px-2 py-4 border-t border-white/5 space-y-1">
          {BOTTOM_ITEMS.map((item) => (
            <SidebarNavItem
              key={item.id}
              item={item}
              isActive={activeId === item.id}
              collapsed={true}
              onClick={() => setActiveId(item.id)}
            />
          ))}
        </div>
      </aside>

      <SidebarMobile items={NAV_ITEMS} activeId={activeId} onSelect={setActiveId} />
    </>
  );
}
