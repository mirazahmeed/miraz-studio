"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdminAction } from "@/app/actions/admin";
import {
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  Mail,
  Settings,
  Globe,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  sessionName: string;
  sessionEmail: string;
}

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Projects CMS", href: "/admin/projects", icon: FolderKanban, exact: false },
  { label: "Create Project", href: "/admin/projects/new", icon: PlusCircle, exact: true },
  { label: "Inbox Messages", href: "/admin/messages", icon: Mail, exact: true },
  { label: "Site Settings", href: "/admin/settings", icon: Settings, exact: true },
];

export function Sidebar({ sessionName, sessionEmail }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    if (href === "/admin/projects") {
      return pathname.startsWith("/admin/projects") && pathname !== "/admin/projects/new";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-full md:w-64 bg-white border-r border-[#E6E6E4] flex flex-col justify-between p-6 shrink-0">
      <div className="space-y-8">
        {/* Brand */}
        <div className="pb-6 border-b border-[#E6E6E4]">
          <span className="text-[14px] font-semibold tracking-tight uppercase block">
            MIRAZ STUDIO™
          </span>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#71717A] mt-0.5 block">
            MANAGED CMS • ADMIN
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 text-[13px] font-medium rounded-[3px] transition-all duration-200 ${
                  active
                    ? "bg-[#111111] text-white"
                    : "text-[#444444] hover:text-[#111111] hover:bg-neutral-100"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${active ? "text-white/80" : "text-[#71717A]"}`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Session & Logout */}
      <div className="pt-6 border-t border-[#E6E6E4] space-y-4">
        <div className="space-y-1">
          <span className="block text-[11px] font-medium text-[#111111]">
            {sessionName}
          </span>
          <span className="block text-[10px] text-[#71717A] font-mono truncate">
            {sessionEmail}
          </span>
        </div>

        <div className="space-y-2 pt-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-[12px] text-[#71717A] hover:text-[#111111] transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>View Live Website</span>
          </Link>

          <form action={logoutAdminAction}>
            <button
              type="submit"
              className="flex items-center gap-2 text-[12px] text-red-600 hover:text-red-700 transition-colors w-full pt-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
