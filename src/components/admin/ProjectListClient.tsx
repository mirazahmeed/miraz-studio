"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  ExternalLink,
  Trash2,
  Edit3,
  Search,
  Filter,
  X,
} from "lucide-react";
import { deleteProjectAction, togglePublishAction } from "@/app/actions/admin";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { useToast } from "@/components/admin/Toast";

interface Project {
  id: string;
  title: string;
  slug: string;
  client: string;
  category: string;
  year: string;
  status: string;
  heroImage: string;
  sortOrder: number;
  featured: boolean;
  excerpt: string;
  challenge: string | null;
  approach: string | null;
  solution: string | null;
  results: string | null;
}

const CATEGORIES = ["ALL", "WEBSITES", "WEB APPS", "SAAS", "UI/UX", "AUTOMATION", "EXPERIMENTS"];

export function ProjectListClient({ projects }: { projects: Project[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  // Filter projects
  const filtered = projects.filter((p) => {
    const matchesSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "ALL" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string) => {
    startTransition(async () => {
      try {
        await deleteProjectAction(id);
        toast("success", "Project deleted successfully.");
        setDeleteTarget(null);
      } catch {
        toast("error", "Failed to delete project.");
        setDeleteTarget(null);
      }
    });
  };

  const handleTogglePublish = (id: string, status: string) => {
    startTransition(async () => {
      try {
        await togglePublishAction(id, status);
        toast("success", status === "PUBLISHED" ? "Project unpublished." : "Project published.");
      } catch {
        toast("error", "Failed to update project status.");
      }
    });
  };

  // Count case study completeness
  const getCaseStudyScore = (p: Project) => {
    const fields = [p.challenge, p.approach, p.solution, p.results];
    return fields.filter(Boolean).length;
  };

  return (
    <div className="space-y-6">
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

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or client..."
            className="w-full pl-10 pr-9 py-2.5 bg-white border border-[#E6E6E4] text-[#111111] text-[13px] rounded-[2px] focus:outline-none focus:border-[#111111] transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8E93] hover:text-[#111111] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <Filter className="w-3.5 h-3.5 text-[#8E8E93] shrink-0" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded-[2px] whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#111111] text-white"
                  : "bg-white border border-[#E6E6E4] text-[#71717A] hover:text-[#111111] hover:border-[#CCCCCC]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      {(search || activeCategory !== "ALL") && (
        <p className="text-[11px] text-[#8E8E93] font-mono">
          Showing {filtered.length} of {projects.length} projects
          {search && ` matching "${search}"`}
          {activeCategory !== "ALL" && ` in ${activeCategory}`}
        </p>
      )}

      {/* Projects Table */}
      {filtered.length === 0 ? (
        <div className="py-12 text-center bg-white border border-[#E6E6E4]">
          <p className="text-[16px] text-[#71717A] uppercase font-medium mb-1">
            NO PROJECTS FOUND
          </p>
          <p className="text-[13px] text-[#8E8E93]">
            {search ? "Try a different search term." : "Create your first project."}
          </p>
        </div>
      ) : (
        <div className="bg-white border border-[#E6E6E4]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-[#E6E6E4] bg-[#FAFAF9] text-[10px] uppercase font-mono tracking-widest text-[#71717A]">
                  <th className="py-3 px-4 w-8">ORD</th>
                  <th className="py-3 px-4">PROJECT</th>
                  <th className="py-3 px-4">CATEGORY</th>
                  <th className="py-3 px-4">YEAR</th>
                  <th className="py-3 px-4">CASE STUDY</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E6E4]">
                {filtered.map((p) => {
                  const csScore = getCaseStudyScore(p);
                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-neutral-50 transition-colors group"
                    >
                      <td className="py-3 px-4 font-mono text-[#8E8E93] text-[11px]">
                        {p.sortOrder}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {/* Thumbnail */}
                          <div className="relative w-14 h-10 rounded-[2px] overflow-hidden border border-[#E6E6E4] bg-neutral-100 shrink-0">
                            <Image
                              src={p.heroImage}
                              alt={p.title}
                              fill
                              className="object-cover"
                              sizes="56px"
                              unoptimized
                            />
                          </div>
                          <div>
                            <span className="font-medium text-[#111111] block leading-tight">
                              {p.title}
                              {p.featured && (
                                <span className="ml-1.5 text-[8px] font-mono text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full uppercase align-middle">
                                  ★ FEATURED
                                </span>
                              )}
                            </span>
                            <span className="text-[11px] text-[#71717A] font-mono">
                              {p.client}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-[#555555]">
                        {p.category}
                      </td>
                      <td className="py-3 px-4 font-mono text-[12px] text-[#555555]">
                        {p.year}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          {[0, 1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < csScore
                                  ? "bg-emerald-500"
                                  : "bg-neutral-200"
                              }`}
                              title={`${csScore}/4 case study sections filled`}
                            />
                          ))}
                          <span className="text-[9px] font-mono text-[#8E8E93] ml-1">
                            {csScore}/4
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleTogglePublish(p.id, p.status)}
                          disabled={isPending}
                          className={`px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider rounded-[2px] cursor-pointer transition-colors ${
                            p.status === "PUBLISHED"
                              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border border-neutral-300"
                          }`}
                          title="Click to toggle status"
                        >
                          {p.status}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {p.status === "PUBLISHED" && (
                            <Link
                              href={`/work/${p.slug}`}
                              target="_blank"
                              className="p-1.5 text-[#71717A] hover:text-[#111111] opacity-0 group-hover:opacity-100 transition-opacity"
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
                          <button
                            onClick={() =>
                              setDeleteTarget({ id: p.id, title: p.title })
                            }
                            className="p-1.5 text-red-400 hover:text-red-600 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Delete Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="DELETE PROJECT"
        message={`Are you sure you want to permanently delete "${deleteTarget?.title}"? This will also remove all associated gallery images. This action cannot be undone.`}
        confirmLabel="DELETE PROJECT"
        destructive
        onConfirm={() => {
          if (deleteTarget) handleDelete(deleteTarget.id);
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
