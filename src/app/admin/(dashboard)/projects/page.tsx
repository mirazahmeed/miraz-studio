import Link from "next/link";
import prisma from "@/lib/prisma";
import { Plus, ExternalLink, Trash2, Edit3, Globe } from "lucide-react";
import { deleteProjectAction, togglePublishAction } from "@/app/actions/admin";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E6E6E4]">
        <div>
          <h1 className="text-[26px] font-normal uppercase tracking-tight text-[#111111]">
            PROJECTS REGISTRY ({projects.length})
          </h1>
          <p className="text-[13px] text-[#71717A] font-light mt-0.5">
            Create, edit, publish, or reorder your studio case studies.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="px-4 py-2.5 bg-[#111111] hover:bg-[#222222] text-white text-[11px] font-medium uppercase tracking-[0.14em] rounded-[2px] transition-colors inline-flex items-center gap-2 self-start"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>CREATE PROJECT</span>
        </Link>
      </div>

      {/* Projects Table */}
      <div className="bg-white border border-[#E6E6E4]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-[#E6E6E4] bg-[#FAFAF9] text-[10px] uppercase font-mono tracking-widest text-[#71717A]">
                <th className="py-3 px-4">ORDER</th>
                <th className="py-3 px-4">TITLE & CLIENT</th>
                <th className="py-3 px-4">CATEGORY</th>
                <th className="py-3 px-4">YEAR</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E6E4]">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="py-4 px-4 font-mono text-[#8E8E93]">
                    {p.sortOrder}
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-[#111111] block">
                      {p.title}
                    </span>
                    <span className="text-[11px] text-[#71717A] font-mono">
                      Client: {p.client}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono text-[11px] text-[#555555]">
                    {p.category}
                  </td>
                  <td className="py-4 px-4 font-mono text-[12px] text-[#555555]">
                    {p.year}
                  </td>
                  <td className="py-4 px-4">
                    <form
                      action={async () => {
                        "use server";
                        await togglePublishAction(p.id, p.status);
                      }}
                    >
                      <button
                        type="submit"
                        className={`px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider rounded-[2px] cursor-pointer transition-colors ${
                          p.status === "PUBLISHED"
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border border-neutral-300"
                        }`}
                        title="Click to toggle status"
                      >
                        {p.status}
                      </button>
                    </form>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      {p.status === "PUBLISHED" && (
                        <Link
                          href={`/work/${p.slug}`}
                          target="_blank"
                          className="p-1.5 text-[#71717A] hover:text-[#111111]"
                          title="View on site"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                      <Link
                        href={`/admin/projects/${p.id}`}
                        className="p-1.5 text-[#71717A] hover:text-[#111111]"
                        title="Edit Project"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await deleteProjectAction(p.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="p-1.5 text-red-500 hover:text-red-700 cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
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
