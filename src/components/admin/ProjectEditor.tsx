"use client";

import { useState, useEffect, useCallback, useRef, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { saveProjectAction } from "@/app/actions/admin";
import { useToast } from "./Toast";
import { GalleryManager } from "./GalleryManager";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Check,
  AlertCircle,
  Loader2,
  Save,
  Eye,
  RotateCcw,
  Sparkles,
} from "lucide-react";

interface GalleryImage {
  id: string;
  imageUrl: string;
  caption: string | null;
  alt: string | null;
  sortOrder: number;
}

interface ProjectEditorProps {
  initialData?: any;
  galleryImages?: GalleryImage[];
}

// ─── Section Definitions ───
interface SectionDef {
  id: string;
  label: string;
  icon: string;
  fields: string[];
}

const SECTIONS: SectionDef[] = [
  {
    id: "basics",
    label: "ESSENTIAL METADATA",
    icon: "01",
    fields: ["title", "slug", "client", "year", "category", "type", "role", "duration", "status", "sortOrder", "featured"],
  },
  {
    id: "media",
    label: "HERO IMAGERY",
    icon: "02",
    fields: ["heroImage"],
  },
  {
    id: "content",
    label: "EDITORIAL NARRATIVES",
    icon: "03",
    fields: ["subtitle", "excerpt", "description", "technologies"],
  },
  {
    id: "casestudy",
    label: "CASE STUDY DEEP DIVE",
    icon: "04",
    fields: ["challenge", "approach", "solution", "process", "results", "learnings"],
  },
  {
    id: "links",
    label: "VERIFICATION LINKS",
    icon: "05",
    fields: ["liveUrl", "githubUrl", "figmaUrl", "caseStudyUrl", "appStoreUrl", "playStoreUrl", "productHuntUrl", "behanceUrl", "dribbbleUrl"],
  },
  {
    id: "specs",
    label: "SPECIFICATIONS",
    icon: "06",
    fields: ["specifications"],
  },
  {
    id: "seo",
    label: "SEO & META",
    icon: "07",
    fields: ["seoTitle", "seoDescription"],
  },
  {
    id: "gallery",
    label: "PROJECT GALLERY",
    icon: "08",
    fields: [],
  },
];

// ─── Required fields for completion tracking ───
const REQUIRED_FIELDS = ["title", "excerpt", "description", "client", "year", "type", "role", "heroImage"];

// ─── Writing prompts for case study fields ───
const WRITING_PROMPTS: Record<string, string> = {
  challenge: "Describe the core problem the client was facing. What pain points existed? What wasn't working? Be specific about the business impact.",
  approach: "Explain your strategic thinking. What frameworks or methodologies did you use? How did you break down the problem? What trade-offs did you consider?",
  solution: "Detail the technical implementation. What architecture decisions did you make? What tools and technologies did you leverage? Why those choices?",
  process: "Walk through the design/development process. What were the key phases? How did you iterate? Include any pivots or discoveries along the way.",
  results: "Share measurable outcomes. Use numbers where possible: load time improvements, conversion rates, user adoption metrics, cost savings, etc.",
  learnings: "Reflect on key takeaways. What would you do differently? What surprised you? What insight would be valuable for future projects?",
};

const AUTOSAVE_KEY_PREFIX = "miraz-studio-draft-";

export function ProjectEditor({ initialData, galleryImages = [] }: ProjectEditorProps) {
  const isEditing = !!initialData;
  const router = useRouter();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  // ─── Section expansion state ───
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["basics"])
  );

  // ─── Form values (controlled for autosave) ───
  const [formValues, setFormValues] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      client: initialData?.client || "",
      year: initialData?.year || "2026",
      category: initialData?.category || "WEBSITES",
      type: initialData?.type || "DIGITAL PRODUCT",
      role: initialData?.role || "DESIGN / FULL-STACK ENGINEERING",
      duration: initialData?.duration || "",
      status: initialData?.status || "PUBLISHED",
      sortOrder: String(initialData?.sortOrder ?? 0),
      featured: initialData?.featured ? "true" : "false",
      heroImage: initialData?.heroImage || "",
      subtitle: initialData?.subtitle || "",
      excerpt: initialData?.excerpt || "",
      description: initialData?.description || "",
      technologies: "",
      challenge: initialData?.challenge || "",
      approach: initialData?.approach || "",
      solution: initialData?.solution || "",
      process: initialData?.process || "",
      results: initialData?.results || "",
      learnings: initialData?.learnings || "",
      liveUrl: initialData?.liveUrl || "",
      githubUrl: initialData?.githubUrl || "",
      figmaUrl: initialData?.figmaUrl || "",
      caseStudyUrl: initialData?.caseStudyUrl || "",
      appStoreUrl: initialData?.appStoreUrl || "",
      playStoreUrl: initialData?.playStoreUrl || "",
      productHuntUrl: initialData?.productHuntUrl || "",
      behanceUrl: initialData?.behanceUrl || "",
      dribbbleUrl: initialData?.dribbbleUrl || "",
      seoTitle: initialData?.seoTitle || "",
      seoDescription: initialData?.seoDescription || "",
      specifications: initialData?.specifications || "",
    };

    // Parse technologies
    if (initialData?.technologies) {
      try {
        const arr = JSON.parse(initialData.technologies);
        defaults.technologies = arr.join(", ");
      } catch {
        defaults.technologies = initialData.technologies;
      }
    }

    return defaults;
  });

  // ─── Spec rows (key-value pairs) ───
  const [specRows, setSpecRows] = useState<{ key: string; value: string }[]>(() => {
    if (initialData?.specifications) {
      try {
        const parsed = JSON.parse(initialData.specifications);
        return Object.entries(parsed).map(([k, v]) => ({ key: k, value: v as string }));
      } catch {
        return [];
      }
    }
    return [];
  });

  // ─── Dirty tracking ───
  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasRestoredDraft, setHasRestoredDraft] = useState(false);

  // ─── AI Generation state ───
  const [isGenerating, setIsGenerating] = useState(false);

  const draftKey = AUTOSAVE_KEY_PREFIX + (initialData?.id || "new");

  // Update a form value
  const updateField = useCallback((name: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
  }, []);

  // ─── AI Case Study Generation ───
  const caseStudyFields = ["challenge", "approach", "solution", "process", "results", "learnings"] as const;

  const hasExistingCaseStudy = caseStudyFields.some(
    (f) => formValues[f]?.trim()
  );

  const canGenerate =
    formValues.title?.trim() &&
    formValues.type?.trim() &&
    formValues.description?.trim();

  const handleGenerateCaseStudy = useCallback(async () => {
    if (!canGenerate) {
      toast("error", "Please fill in the project title, type, and description first.");
      return;
    }

    // Confirm before overwriting existing content
    if (hasExistingCaseStudy) {
      const confirmed = window.confirm(
        "This will overwrite existing case study content. Continue?"
      );
      if (!confirmed) return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch("/api/ai/generate-case-study", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formValues.title,
          client: formValues.client,
          type: formValues.type,
          role: formValues.role,
          category: formValues.category,
          duration: formValues.duration,
          technologies: formValues.technologies,
          excerpt: formValues.excerpt,
          description: formValues.description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate case study.");
      }

      // Auto-fill all 6 case study fields
      for (const field of caseStudyFields) {
        if (data[field]) {
          updateField(field, data[field]);
        }
      }

      toast("success", "Case study generated successfully! Review and edit as needed.");
    } catch (err: any) {
      console.error("AI generation error:", err);
      toast("error", err.message || "Failed to generate case study. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [formValues, canGenerate, hasExistingCaseStudy, updateField, toast, caseStudyFields]);

  // ─── Autosave to localStorage ───
  useEffect(() => {
    if (!isDirty) return;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(draftKey, JSON.stringify({ formValues, specRows, timestamp: Date.now() }));
      } catch {
        // Storage full, silently fail
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [formValues, specRows, isDirty, draftKey]);

  // ─── Restore draft on mount ───
  useEffect(() => {
    if (hasRestoredDraft) return;
    try {
      const saved = localStorage.getItem(draftKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        const age = Date.now() - (parsed.timestamp || 0);
        // Only offer to restore if less than 24h old
        if (age < 24 * 60 * 60 * 1000 && parsed.formValues) {
          setHasRestoredDraft(true);
          // Check if draft differs from initial data
          const hasDifferences = Object.keys(parsed.formValues).some(
            (key) => parsed.formValues[key] !== (formValues[key] || "")
          );
          if (hasDifferences) {
            // We'll show a restore banner instead of auto-restoring
            return;
          }
        }
      }
    } catch {
      // Silently fail
    }
    setHasRestoredDraft(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const restoreDraft = useCallback(() => {
    try {
      const saved = localStorage.getItem(draftKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.formValues) setFormValues(parsed.formValues);
        if (parsed.specRows) setSpecRows(parsed.specRows);
        toast("info", "Draft restored successfully.");
      }
    } catch {
      toast("error", "Failed to restore draft.");
    }
  }, [draftKey, toast]);

  const dismissDraft = useCallback(() => {
    localStorage.removeItem(draftKey);
    setHasRestoredDraft(true);
  }, [draftKey]);

  // ─── Unsaved changes warning ───
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  // ─── Section completion tracking ───
  const getSectionCompletion = (section: SectionDef) => {
    if (section.id === "gallery" || section.id === "specs") return null;
    const sectionRequiredFields = section.fields.filter((f) =>
      REQUIRED_FIELDS.includes(f)
    );
    if (sectionRequiredFields.length === 0) {
      // For optional sections, show filled/total
      const filled = section.fields.filter((f) => formValues[f]?.trim()).length;
      return { filled, total: section.fields.length, required: false };
    }
    const filled = sectionRequiredFields.filter((f) => formValues[f]?.trim()).length;
    return { filled, total: sectionRequiredFields.length, required: true };
  };

  // Toggle section
  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // ─── Form Submit Handler ───
  const handleSubmit = () => {
    if (!formRef.current) return;

    startTransition(async () => {
      try {
        const fd = new FormData();
        if (initialData?.id) fd.append("id", initialData.id);

        // Append all form values
        for (const [key, value] of Object.entries(formValues)) {
          if (key === "specifications") continue; // Handle separately
          fd.append(key, value);
        }

        // Build specifications JSON from specRows
        if (specRows.length > 0) {
          const specsObj: Record<string, string> = {};
          specRows
            .filter((r) => r.key.trim())
            .forEach((r) => (specsObj[r.key.trim()] = r.value.trim()));
          fd.append("specifications", JSON.stringify(specsObj));
        }

        const res = await saveProjectAction(fd);
        // Clear the draft on successful save
        localStorage.removeItem(draftKey);
        setIsDirty(false);
        setLastSaved(new Date());
        toast("success", isEditing ? "Project updated successfully." : "Project published successfully.");
        if (!isEditing && res?.id) {
          router.push(`/admin/projects/${res.id}`);
        }
      } catch (err: any) {
        console.error("Save project error:", err);
        toast("error", "Failed to save project. Please try again.");
      }
    });
  };

  // ─── Has unsaved draft banner? ───
  const showDraftBanner = (() => {
    if (hasRestoredDraft) return false;
    try {
      const saved = localStorage.getItem(draftKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        const age = Date.now() - (parsed.timestamp || 0);
        return age < 24 * 60 * 60 * 1000;
      }
    } catch {
      return false;
    }
    return false;
  })();

  // ─── Textarea with writing prompt ───
  const CaseStudyField = ({
    name,
    label,
  }: {
    name: string;
    label: string;
  }) => {
    const value = formValues[name] || "";
    const prompt = WRITING_PROMPTS[name];
    const charCount = value.length;
    const [showPreview, setShowPreview] = useState(false);

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
            {label}
          </label>
          <div className="flex items-center gap-3">
            <span
              className={`text-[10px] font-mono ${
                charCount > 0 ? "text-[#555555]" : "text-[#B0B0AE]"
              }`}
            >
              {charCount} chars
            </span>
            {value.trim() && (
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="text-[10px] font-medium uppercase tracking-wider text-[#71717A] hover:text-[#111111] cursor-pointer flex items-center gap-1"
              >
                <Eye className="w-3 h-3" />
                {showPreview ? "EDIT" : "PREVIEW"}
              </button>
            )}
          </div>
        </div>

        {/* Writing prompt */}
        {prompt && !value.trim() && (
          <p className="text-[11px] text-[#8E8E93] italic leading-relaxed bg-amber-50/50 border border-amber-100 rounded-[2px] px-3 py-2">
            💡 {prompt}
          </p>
        )}

        {showPreview ? (
          <div className="w-full px-4 py-3 bg-[#FAFAF9] border border-[#E6E6E4] text-[#333333] text-[14px] rounded-[2px] min-h-[100px] whitespace-pre-wrap leading-relaxed">
            {value}
          </div>
        ) : (
          <textarea
            value={value}
            onChange={(e) => updateField(name, e.target.value)}
            rows={4}
            placeholder={`Write your ${label.toLowerCase()} here...`}
            className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px] resize-y min-h-[100px] transition-colors"
          />
        )}
      </div>
    );
  };

  // ─── Specs key-value editor ───
  const SpecsEditor = () => (
    <div className="space-y-3">
      <p className="text-[11px] text-[#8E8E93] italic">
        Add key-value pairs for architectural metrics (e.g., Lighthouse Score: 98, Load Time: 1.2s, Bundle Size: 145KB)
      </p>
      {specRows.map((row, i) => (
        <div key={i} className="flex gap-3 items-center">
          <input
            type="text"
            value={row.key}
            onChange={(e) => {
              const newRows = [...specRows];
              newRows[i].key = e.target.value;
              setSpecRows(newRows);
              setIsDirty(true);
            }}
            placeholder="Metric name"
            className="flex-1 px-3 py-2 bg-white border border-[#E6E6E4] text-[13px] rounded-[2px] focus:outline-none focus:border-[#111111]"
          />
          <input
            type="text"
            value={row.value}
            onChange={(e) => {
              const newRows = [...specRows];
              newRows[i].value = e.target.value;
              setSpecRows(newRows);
              setIsDirty(true);
            }}
            placeholder="Value"
            className="flex-1 px-3 py-2 bg-white border border-[#E6E6E4] text-[13px] rounded-[2px] focus:outline-none focus:border-[#111111]"
          />
          <button
            type="button"
            onClick={() => {
              setSpecRows((prev) => prev.filter((_, idx) => idx !== i));
              setIsDirty(true);
            }}
            className="p-2 text-red-400 hover:text-red-600 cursor-pointer"
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          setSpecRows((prev) => [...prev, { key: "", value: "" }]);
          setIsDirty(true);
        }}
        className="text-[11px] font-medium uppercase tracking-wider text-[#71717A] hover:text-[#111111] cursor-pointer"
      >
        + ADD SPECIFICATION ROW
      </button>
    </div>
  );

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-[#E6E6E4]">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A] hover:text-[#111111]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO PROJECTS</span>
        </Link>
        <div className="flex items-center gap-4">
          {lastSaved && (
            <span className="text-[10px] font-mono text-emerald-600">
              ✓ Saved {lastSaved.toLocaleTimeString()}
            </span>
          )}
          {isDirty && (
            <span className="text-[10px] font-mono text-amber-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              UNSAVED CHANGES
            </span>
          )}
          <span className="text-[11px] font-mono text-[#8E8E93] uppercase tracking-widest">
            {isEditing ? `EDITING: ${initialData.title}` : "NEW PROJECT DRAFT"}
          </span>
        </div>
      </div>

      {/* Draft Restore Banner */}
      {showDraftBanner && (
        <div className="flex items-center justify-between px-4 py-3 bg-blue-50 border border-blue-200 rounded-[3px]">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-blue-600" />
            <span className="text-[13px] text-blue-800">
              You have an unsaved draft from a previous session.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={restoreDraft}
              className="px-3 py-1.5 bg-blue-600 text-white text-[11px] font-medium uppercase tracking-wider rounded-[2px] hover:bg-blue-700 cursor-pointer"
            >
              RESTORE DRAFT
            </button>
            <button
              onClick={dismissDraft}
              className="px-3 py-1.5 border border-blue-200 text-blue-700 text-[11px] font-medium uppercase tracking-wider rounded-[2px] hover:bg-blue-100 cursor-pointer"
            >
              DISMISS
            </button>
          </div>
        </div>
      )}

      {/* Hidden form for native submission */}
      <form ref={formRef} className="hidden" />

      {/* Accordion Sections */}
      <div className="space-y-3">
        {SECTIONS.map((section) => {
          const isExpanded = expandedSections.has(section.id);
          const completion = getSectionCompletion(section);

          return (
            <div
              key={section.id}
              className="bg-white border border-[#E6E6E4] rounded-[3px] overflow-hidden transition-all"
            >
              {/* Section Header */}
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-[#FAFAF9] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[11px] font-mono text-[#8E8E93] w-5">
                    {section.icon}
                  </span>
                  <h2 className="text-[14px] font-medium uppercase tracking-tight text-[#111111]">
                    {section.label}
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  {completion && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        completion.filled === completion.total
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-neutral-100 text-[#71717A] border border-neutral-200"
                      }`}
                    >
                      {completion.filled}/{completion.total}{" "}
                      {completion.required ? "required" : "filled"}
                    </span>
                  )}
                  {section.id === "gallery" && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 text-[#71717A] border border-neutral-200">
                      {galleryImages.length} images
                    </span>
                  )}
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-[#71717A]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#71717A]" />
                  )}
                </div>
              </button>

              {/* Section Content */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-[#E6E6E4] space-y-6">
                  {/* ── BASICS ── */}
                  {section.id === "basics" && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                            PROJECT TITLE *
                          </label>
                          <input
                            type="text"
                            value={formValues.title}
                            onChange={(e) => updateField("title", e.target.value)}
                            required
                            placeholder="NEXUS PLATFORM"
                            className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                            URL SLUG (AUTO-GENERATED IF BLANK)
                          </label>
                          <input
                            type="text"
                            value={formValues.slug}
                            onChange={(e) => updateField("slug", e.target.value)}
                            placeholder="nexus-platform"
                            className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
                          />
                          {formValues.slug && !/^[a-z0-9-]+$/.test(formValues.slug) && (
                            <p className="text-[10px] text-amber-600 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              Slug should only contain lowercase letters, numbers, and hyphens
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                            CLIENT *
                          </label>
                          <input
                            type="text"
                            value={formValues.client}
                            onChange={(e) => updateField("client", e.target.value)}
                            required
                            placeholder="Nexus Systems Inc"
                            className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                            YEAR *
                          </label>
                          <input
                            type="text"
                            value={formValues.year}
                            onChange={(e) => updateField("year", e.target.value)}
                            required
                            placeholder="2026"
                            className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                            CATEGORY *
                          </label>
                          <select
                            value={formValues.category}
                            onChange={(e) => updateField("category", e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
                          >
                            <option value="WEBSITES">WEBSITES</option>
                            <option value="WEB APPS">WEB APPS</option>
                            <option value="SAAS">SAAS</option>
                            <option value="UI/UX">UI/UX</option>
                            <option value="AUTOMATION">AUTOMATION</option>
                            <option value="EXPERIMENTS">EXPERIMENTS</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                            TYPE *
                          </label>
                          <input
                            type="text"
                            value={formValues.type}
                            onChange={(e) => updateField("type", e.target.value)}
                            required
                            placeholder="DIGITAL PRODUCT"
                            className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                            ROLE *
                          </label>
                          <input
                            type="text"
                            value={formValues.role}
                            onChange={(e) => updateField("role", e.target.value)}
                            required
                            placeholder="DESIGN / ENGINEERING"
                            className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                            DURATION
                          </label>
                          <input
                            type="text"
                            value={formValues.duration}
                            onChange={(e) => updateField("duration", e.target.value)}
                            placeholder="3 MONTHS"
                            className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                            STATUS
                          </label>
                          <select
                            value={formValues.status}
                            onChange={(e) => updateField("status", e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
                          >
                            <option value="PUBLISHED">PUBLISHED (LIVE)</option>
                            <option value="DRAFT">DRAFT (STAGING)</option>
                            <option value="ARCHIVED">ARCHIVED</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                            SORT ORDER
                          </label>
                          <input
                            type="number"
                            value={formValues.sortOrder}
                            onChange={(e) => updateField("sortOrder", e.target.value)}
                            className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
                          />
                        </div>

                        <div className="space-y-1.5 flex flex-col justify-end">
                          <label className="flex items-center gap-2 cursor-pointer pb-3">
                            <input
                              type="checkbox"
                              checked={formValues.featured === "true"}
                              onChange={(e) =>
                                updateField("featured", e.target.checked ? "true" : "false")
                              }
                              className="w-4 h-4 text-[#111111] focus:ring-0 rounded-xs"
                            />
                            <span className="text-[12px] font-medium uppercase tracking-wider text-[#111111]">
                              FEATURE ON HOMEPAGE
                            </span>
                          </label>
                        </div>
                      </div>
                    </>
                  )}

                  {/* ── MEDIA ── */}
                  {section.id === "media" && (
                    <>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                          COVER / HERO IMAGE URL *
                        </label>
                        <input
                          type="url"
                          value={formValues.heroImage}
                          onChange={(e) => updateField("heroImage", e.target.value)}
                          required
                          placeholder="https://images.unsplash.com/photo-..."
                          className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
                        />
                      </div>

                      {formValues.heroImage && (
                        <div className="relative w-full aspect-21/9 overflow-hidden rounded-[2px] border border-[#E6E6E4] bg-neutral-100">
                          <Image
                            src={formValues.heroImage}
                            alt="Preview"
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      )}
                    </>
                  )}

                  {/* ── CONTENT ── */}
                  {section.id === "content" && (
                    <>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                          SUBTITLE (EDITORIAL STRAPLINE)
                        </label>
                        <input
                          type="text"
                          value={formValues.subtitle}
                          onChange={(e) => updateField("subtitle", e.target.value)}
                          placeholder="Next-generation workspace for high-velocity engineering teams."
                          className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                            EXCERPT (INDEX SUMMARY) *
                          </label>
                          <span className="text-[10px] font-mono text-[#8E8E93]">
                            {formValues.excerpt.length} chars
                          </span>
                        </div>
                        <textarea
                          value={formValues.excerpt}
                          onChange={(e) => updateField("excerpt", e.target.value)}
                          rows={2}
                          required
                          placeholder="Short 1-2 sentence overview for the index page..."
                          className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                            FULL DESCRIPTION *
                          </label>
                          <span className="text-[10px] font-mono text-[#8E8E93]">
                            {formValues.description.length} chars
                          </span>
                        </div>
                        <textarea
                          value={formValues.description}
                          onChange={(e) => updateField("description", e.target.value)}
                          rows={4}
                          required
                          placeholder="In-depth executive description of the project..."
                          className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                          TECHNOLOGY STACK (COMMA-SEPARATED)
                        </label>
                        <input
                          type="text"
                          value={formValues.technologies}
                          onChange={(e) => updateField("technologies", e.target.value)}
                          placeholder="NEXT.JS 15, TYPESCRIPT, SUPABASE, TAILWIND CSS"
                          className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
                        />
                        {formValues.technologies && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {formValues.technologies
                              .split(",")
                              .map((t) => t.trim())
                              .filter(Boolean)
                              .map((tech, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 text-[10px] uppercase font-mono bg-[#FAFAF9] text-[#333333] border border-[#E6E6E4] rounded-[2px]"
                                >
                                  {tech}
                                </span>
                              ))}
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* ── CASE STUDY ── */}
                  {section.id === "casestudy" && (
                    <div className="space-y-8">
                      <p className="text-[12px] text-[#8E8E93] italic border-l-2 border-[#E6E6E4] pl-4">
                        These fields power the project detail page&apos;s narrative sections.
                        Fill in as many as relevant — empty sections are automatically hidden from the public page.
                      </p>

                      {/* ── AI Generate Button ── */}
                      <div className="relative overflow-hidden rounded-[3px] border border-[#E6E6E4]">
                        {/* Subtle gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-50/80 via-indigo-50/60 to-purple-50/80" />
                        <div className="relative px-5 py-4 flex items-center justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Sparkles className="w-3.5 h-3.5 text-violet-600 flex-shrink-0" />
                              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#111111]">
                                AI CASE STUDY WRITER
                              </span>
                            </div>
                            <p className="text-[11px] text-[#71717A] leading-relaxed">
                              {canGenerate
                                ? "Auto-generate all 6 narrative sections based on your project details."
                                : "Fill in the project title, type, and description first to enable AI generation."}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={handleGenerateCaseStudy}
                            disabled={!canGenerate || isGenerating}
                            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-[3px] text-[11px] font-semibold uppercase tracking-[0.12em] transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 bg-[#111111] text-white hover:bg-[#222222] active:scale-[0.98]"
                          >
                            {isGenerating ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>GENERATING...</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>{hasExistingCaseStudy ? "REGENERATE" : "GENERATE"} WITH AI</span>
                              </>
                            )}
                          </button>
                        </div>
                        {/* Progress bar animation during generation */}
                        {isGenerating && (
                          <div className="h-[2px] w-full bg-violet-100 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500"
                              style={{
                                animation: "aiProgress 2s ease-in-out infinite",
                                width: "40%",
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Inline keyframes for the progress animation */}
                      {isGenerating && (
                        <style>{`
                          @keyframes aiProgress {
                            0% { transform: translateX(-100%); }
                            50% { transform: translateX(200%); }
                            100% { transform: translateX(-100%); }
                          }
                        `}</style>
                      )}

                      <CaseStudyField name="challenge" label="THE PROBLEM & CHALLENGE" />
                      <CaseStudyField name="approach" label="THE STRATEGY & APPROACH" />
                      <CaseStudyField name="solution" label="THE TECHNICAL SOLUTION" />
                      <CaseStudyField name="process" label="THE DESIGN PROCESS" />
                      <CaseStudyField name="results" label="MEASURABLE OUTCOMES & RESULTS" />
                      <CaseStudyField name="learnings" label="KEY LEARNINGS & TAKEAWAYS" />
                    </div>
                  )}

                  {/* ── LINKS ── */}
                  {section.id === "links" && (
                    <>
                      <p className="text-[12px] text-[#8E8E93] italic border-l-2 border-[#E6E6E4] pl-4">
                        Add links to verify the work. Only links with values will appear on the public project page.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                          { name: "liveUrl", label: "LIVE PRODUCTION URL", placeholder: "https://nexus.studio.app" },
                          { name: "githubUrl", label: "GITHUB SOURCE CODE", placeholder: "https://github.com/mirazahmed/project" },
                          { name: "figmaUrl", label: "FIGMA SPECIFICATIONS", placeholder: "https://figma.com/@miraz/project" },
                          { name: "caseStudyUrl", label: "EXTERNAL CASE STUDY", placeholder: "https://medium.com/case-study" },
                          { name: "appStoreUrl", label: "APP STORE URL", placeholder: "https://apps.apple.com/..." },
                          { name: "playStoreUrl", label: "GOOGLE PLAY URL", placeholder: "https://play.google.com/..." },
                          { name: "productHuntUrl", label: "PRODUCT HUNT URL", placeholder: "https://producthunt.com/posts/..." },
                          { name: "behanceUrl", label: "BEHANCE URL", placeholder: "https://behance.net/..." },
                          { name: "dribbbleUrl", label: "DRIBBBLE URL", placeholder: "https://dribbble.com/shots/..." },
                        ].map(({ name, label, placeholder }) => (
                          <div key={name} className="space-y-1.5">
                            <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                              {label}
                            </label>
                            <input
                              type="url"
                              value={formValues[name]}
                              onChange={(e) => updateField(name, e.target.value)}
                              placeholder={placeholder}
                              className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
                            />
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* ── SPECS ── */}
                  {section.id === "specs" && <SpecsEditor />}

                  {/* ── SEO ── */}
                  {section.id === "seo" && (
                    <>
                      <p className="text-[12px] text-[#8E8E93] italic border-l-2 border-[#E6E6E4] pl-4">
                        Override the auto-generated SEO meta tags. Leave blank to use the project title and excerpt as defaults.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                            SEO TITLE
                          </label>
                          <span
                            className={`text-[10px] font-mono ${
                              formValues.seoTitle.length > 60
                                ? "text-red-500"
                                : "text-[#8E8E93]"
                            }`}
                          >
                            {formValues.seoTitle.length}/60
                          </span>
                        </div>
                        <input
                          type="text"
                          value={formValues.seoTitle}
                          onChange={(e) => updateField("seoTitle", e.target.value)}
                          placeholder={formValues.title ? `${formValues.title} — MIRAZ STUDIO™` : "Custom SEO title..."}
                          className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                            SEO META DESCRIPTION
                          </label>
                          <span
                            className={`text-[10px] font-mono ${
                              formValues.seoDescription.length > 160
                                ? "text-red-500"
                                : "text-[#8E8E93]"
                            }`}
                          >
                            {formValues.seoDescription.length}/160
                          </span>
                        </div>
                        <textarea
                          value={formValues.seoDescription}
                          onChange={(e) => updateField("seoDescription", e.target.value)}
                          rows={3}
                          placeholder={formValues.excerpt || "Custom meta description for search engines..."}
                          className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] rounded-[2px]"
                        />
                      </div>

                      {/* SEO Preview */}
                      {(formValues.seoTitle || formValues.title) && (
                        <div className="p-4 bg-[#FAFAF9] border border-[#E6E6E4] rounded-[3px] space-y-1">
                          <span className="text-[10px] font-mono text-[#8E8E93] uppercase">
                            GOOGLE SEARCH PREVIEW
                          </span>
                          <p className="text-[16px] text-[#1a0dab] truncate">
                            {formValues.seoTitle || `${formValues.title} — MIRAZ STUDIO™`}
                          </p>
                          <p className="text-[13px] text-emerald-700 font-mono truncate">
                            mirazstudio.com/work/{formValues.slug || "project-slug"}
                          </p>
                          <p className="text-[13px] text-[#555555] line-clamp-2">
                            {formValues.seoDescription || formValues.excerpt || "No description set."}
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  {/* ── GALLERY ── */}
                  {section.id === "gallery" && (
                    <>
                      {isEditing ? (
                        <GalleryManager
                          projectId={initialData.id}
                          images={galleryImages}
                        />
                      ) : (
                        <div className="py-8 text-center border border-dashed border-[#D4D4D2] rounded-[3px] bg-[#FAFAF9]">
                          <p className="text-[13px] text-[#71717A]">
                            Gallery management is available after saving the project for the first time.
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sticky Save Bar */}
      <div className="sticky bottom-0 z-50 -mx-6 sm:-mx-10 px-6 sm:px-10 py-4 bg-white/95 backdrop-blur-sm border-t border-[#E6E6E4] flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isDirty && (
            <span className="text-[10px] font-mono text-amber-600 hidden sm:inline-flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              You have unsaved changes
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="px-5 py-3 border border-[#E6E6E4] hover:bg-neutral-100 text-[#111111] text-[11px] font-medium uppercase tracking-[0.14em] rounded-[2px] transition-colors"
          >
            CANCEL
          </Link>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className="px-7 py-3 bg-[#111111] hover:bg-[#222222] text-white text-[11px] font-medium uppercase tracking-[0.16em] rounded-[2px] transition-colors cursor-pointer disabled:opacity-60 inline-flex items-center gap-2"
          >
            {isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>SAVING...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>{isEditing ? "UPDATE PROJECT" : "PUBLISH PROJECT"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
