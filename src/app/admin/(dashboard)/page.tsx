import Link from "next/link";
import prisma from "@/lib/prisma";
import {
  FolderKanban,
  CheckCircle2,
  FileEdit,
  Mail,
  ArrowUpRight,
  Plus,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const [totalProjects, publishedProjects, draftProjects, totalMessages, recentProjects] =
    await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { status: "PUBLISHED" } }),
      prisma.project.count({ where: { status: "DRAFT" } }),
      prisma.contactMessage.count(),
      prisma.project.findMany({
        orderBy: { updatedAt: "desc" },
        take: 5,
      }),
    ]);

  const stats = [
    {
      label: "TOTAL PROJECTS",
      value: totalProjects,
      icon: FolderKanban,
      sub: "In database registry",
    },
    {
      label: "PUBLISHED LIVE",
      value: publishedProjects,
      icon: CheckCircle2,
      sub: "Visible to public",
    },
    {
      label: "DRAFT PROJECTS",
      value: draftProjects,
      icon: FileEdit,
      sub: "Staging / unpublished",
    },
    {
      label: "INBOUND INQUIRIES",
      value: totalMessages,
      icon: Mail,
      sub: "Contact form leads",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E6E6E4]">
        <div>
          <h1 className="text-[26px] font-normal uppercase tracking-tight text-[#111111]">
            CMS OVERVIEW
          </h1>
          <p className="text-[13px] text-[#71717A] font-light mt-0.5">
            Manage your digital studio portfolio, case studies, and inbound inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="px-4 py-2.5 bg-[#111111] hover:bg-[#222222] text-white text-[11px] font-medium uppercase tracking-[0.14em] rounded-[2px] transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>NEW PROJECT</span>
          </Link>
          <Link
            href="/admin/settings"
            className="px-4 py-2.5 bg-white border border-[#E6E6E4] hover:bg-neutral-50 text-[#111111] text-[11px] font-medium uppercase tracking-[0.14em] rounded-[2px] transition-colors"
          >
            SITE SETTINGS
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="p-6 bg-white border border-[#E6E6E4] space-y-3"
            >
              <div className="flex items-center justify-between text-[#71717A]">
                <span className="text-[10px] font-medium uppercase tracking-[0.14em]">
                  {s.label}
                </span>
                <Icon className="w-4 h-4" />
              </div>
              <div className="text-[34px] font-normal tracking-tight text-[#111111]">
                {s.value}
              </div>
              <div className="text-[11px] text-[#8E8E93] font-mono">{s.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Projects Table */}
      <div className="bg-white border border-[#E6E6E4] p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E6E6E4]">
          <h2 className="text-[16px] font-medium uppercase tracking-tight text-[#111111]">
            RECENTLY MODIFIED PROJECTS
          </h2>
          <Link
            href="/admin/projects"
            className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A] hover:text-[#111111] flex items-center gap-1"
          >
            <span>VIEW ALL PROJECTS</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-[#E6E6E4] text-[10px] uppercase font-mono tracking-widest text-[#71717A]">
                <th className="py-3 px-2">TITLE</th>
                <th className="py-3 px-2">CLIENT</th>
                <th className="py-3 px-2">CATEGORY</th>
                <th className="py-3 px-2">STATUS</th>
                <th className="py-3 px-2 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E6E4]">
              {recentProjects.map((p) => (
                <tr key={p.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="py-4 px-2 font-medium text-[#111111]">
                    {p.title}
                  </td>
                  <td className="py-4 px-2 text-[#555555]">{p.client}</td>
                  <td className="py-4 px-2 text-[#71717A] font-mono text-[11px]">
                    {p.category}
                  </td>
                  <td className="py-4 px-2">
                    <span
                      className={`inline-block px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider ${
                        p.status === "PUBLISHED"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-neutral-100 text-neutral-600 border border-neutral-200"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <Link
                      href={`/admin/projects/${p.id}`}
                      className="text-[11px] font-medium uppercase tracking-wider text-[#111111] hover:underline"
                    >
                      EDIT →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
