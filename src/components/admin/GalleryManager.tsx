"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ImageIcon,
  GripVertical,
} from "lucide-react";
import {
  addGalleryImageAction,
  deleteGalleryImageAction,
  reorderGalleryAction,
} from "@/app/actions/admin";
import { ConfirmDialog } from "./ConfirmDialog";
import { useToast } from "./Toast";

interface GalleryImage {
  id: string;
  imageUrl: string;
  caption: string | null;
  alt: string | null;
  sortOrder: number;
}

interface GalleryManagerProps {
  projectId: string;
  images: GalleryImage[];
}

export function GalleryManager({ projectId, images: initialImages }: GalleryManagerProps) {
  const [images, setImages] = useState(initialImages);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [newAlt, setNewAlt] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleAdd = () => {
    if (!newUrl.trim()) return;
    startTransition(async () => {
      try {
        await addGalleryImageAction(projectId, newUrl, newCaption || null, newAlt || null);
        // Optimistically add to the list
        setImages((prev) => [
          ...prev,
          {
            id: `temp-${Date.now()}`,
            imageUrl: newUrl,
            caption: newCaption || null,
            alt: newAlt || null,
            sortOrder: prev.length,
          },
        ]);
        setNewUrl("");
        setNewCaption("");
        setNewAlt("");
        setShowAddForm(false);
        toast("success", "Gallery image added successfully.");
      } catch {
        toast("error", "Failed to add image. Please try again.");
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      try {
        await deleteGalleryImageAction(id);
        setImages((prev) => prev.filter((img) => img.id !== id));
        setDeleteId(null);
        toast("success", "Image removed from gallery.");
      } catch {
        toast("error", "Failed to delete image.");
        setDeleteId(null);
      }
    });
  };

  const handleReorder = (index: number, direction: "up" | "down") => {
    const newImages = [...images];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newImages.length) return;
    [newImages[index], newImages[swapIndex]] = [newImages[swapIndex], newImages[index]];
    newImages.forEach((img, i) => (img.sortOrder = i));
    setImages(newImages);

    startTransition(async () => {
      try {
        await reorderGalleryAction(
          projectId,
          newImages.map((img) => img.id)
        );
      } catch {
        toast("error", "Failed to reorder images.");
      }
    });
  };

  return (
    <div className="space-y-6">
      {images.length === 0 && !showAddForm ? (
        <div className="py-12 text-center border border-dashed border-[#D4D4D2] rounded-[3px] bg-[#FAFAF9]">
          <ImageIcon className="w-8 h-8 text-[#8E8E93] mx-auto mb-3" />
          <p className="text-[13px] text-[#71717A] font-light mb-4">
            No gallery images yet. Add screenshots, mockups, or design artifacts.
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-[#111111] text-white text-[11px] font-medium uppercase tracking-[0.14em] rounded-[2px] hover:bg-[#222222] transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <Plus className="w-3.5 h-3.5" />
            ADD FIRST IMAGE
          </button>
        </div>
      ) : (
        <>
          {/* Gallery Grid */}
          <div className="space-y-3">
            {images.map((img, index) => (
              <div
                key={img.id}
                className="flex items-start gap-4 p-4 bg-[#FAFAF9] border border-[#E6E6E4] rounded-[3px] group hover:border-[#D0D0CE] transition-colors"
              >
                <div className="flex flex-col items-center gap-1 pt-2 text-[#8E8E93]">
                  <GripVertical className="w-4 h-4" />
                  <span className="text-[10px] font-mono">{index + 1}</span>
                </div>

                {/* Thumbnail */}
                <div className="relative w-24 h-16 sm:w-32 sm:h-20 rounded-[2px] overflow-hidden border border-[#E6E6E4] bg-neutral-100 shrink-0">
                  <Image
                    src={img.imageUrl}
                    alt={img.alt || "Gallery image"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-[12px] text-[#555555] font-mono truncate">
                    {img.imageUrl}
                  </p>
                  {img.caption && (
                    <p className="text-[12px] text-[#71717A]">{img.caption}</p>
                  )}
                  {img.alt && (
                    <p className="text-[10px] text-[#8E8E93] font-mono">
                      ALT: {img.alt}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleReorder(index, "up")}
                    disabled={index === 0 || isPending}
                    className="p-1.5 text-[#71717A] hover:text-[#111111] disabled:opacity-30 cursor-pointer"
                    title="Move up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleReorder(index, "down")}
                    disabled={index === images.length - 1 || isPending}
                    className="p-1.5 text-[#71717A] hover:text-[#111111] disabled:opacity-30 cursor-pointer"
                    title="Move down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeleteId(img.id)}
                    className="p-1.5 text-red-400 hover:text-red-600 cursor-pointer"
                    title="Delete image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Image Form */}
          {showAddForm ? (
            <div className="p-5 border border-[#E6E6E4] rounded-[3px] bg-white space-y-4">
              <h4 className="text-[12px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
                ADD NEW GALLERY IMAGE
              </h4>
              <div className="space-y-1.5">
                <label className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8E8E93]">
                  IMAGE URL *
                </label>
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 bg-white border border-[#E6E6E4] text-[#111111] text-[13px] focus:outline-none focus:border-[#111111] rounded-[2px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8E8E93]">
                    CAPTION
                  </label>
                  <input
                    type="text"
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    placeholder="Dashboard overview"
                    className="w-full px-4 py-2.5 bg-white border border-[#E6E6E4] text-[#111111] text-[13px] focus:outline-none focus:border-[#111111] rounded-[2px]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8E8E93]">
                    ALT TEXT
                  </label>
                  <input
                    type="text"
                    value={newAlt}
                    onChange={(e) => setNewAlt(e.target.value)}
                    placeholder="Screenshot of the dashboard"
                    className="w-full px-4 py-2.5 bg-white border border-[#E6E6E4] text-[#111111] text-[13px] focus:outline-none focus:border-[#111111] rounded-[2px]"
                  />
                </div>
              </div>

              {/* URL Preview */}
              {newUrl && (
                <div className="relative w-full aspect-video max-w-sm overflow-hidden rounded-[2px] border border-[#E6E6E4] bg-neutral-100">
                  <Image
                    src={newUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleAdd}
                  disabled={!newUrl.trim() || isPending}
                  className="px-4 py-2 bg-[#111111] text-white text-[11px] font-medium uppercase tracking-[0.14em] rounded-[2px] hover:bg-[#222222] transition-colors cursor-pointer disabled:opacity-50 inline-flex items-center gap-2"
                >
                  {isPending ? "ADDING..." : "ADD IMAGE"}
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewUrl("");
                    setNewCaption("");
                    setNewAlt("");
                  }}
                  className="px-4 py-2 border border-[#E6E6E4] text-[#555555] text-[11px] font-medium uppercase tracking-[0.14em] rounded-[2px] hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full py-3 border border-dashed border-[#D4D4D2] text-[#71717A] text-[11px] font-medium uppercase tracking-[0.14em] rounded-[2px] hover:bg-neutral-50 hover:border-[#B0B0AE] transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Plus className="w-3.5 h-3.5" />
              ADD IMAGE TO GALLERY
            </button>
          )}
        </>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteId}
        title="DELETE GALLERY IMAGE"
        message="This image will be permanently removed from the project gallery. This cannot be undone."
        confirmLabel="DELETE IMAGE"
        destructive
        onConfirm={() => {
          if (deleteId) handleDelete(deleteId);
        }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
