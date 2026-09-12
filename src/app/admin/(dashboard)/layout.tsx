import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
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

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Projects CMS", href: "/admin/projects", icon: FolderKanban },
    { label: "Create Project", href: "/admin/projects/new", icon: PlusCircle },
    { label: "Inbox Messages", href: "/admin/messages", icon: Mail },
    { label: "Site Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F3] flex flex-col md:flex-row text-[#111111]">
      {/* Admin Sidebar */}
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
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3.5 py-2.5 text-[13px] font-medium text-[#444444] hover:text-[#111111] hover:bg-neutral-100 rounded-[2px] transition-colors"
                >
                  <Icon className="w-4 h-4 text-[#71717A]" />
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
              {session.name}
            </span>
            <span className="block text-[10px] text-[#71717A] font-mono truncate">
              {session.email}
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

      {/* Main Admin Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 sm:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
