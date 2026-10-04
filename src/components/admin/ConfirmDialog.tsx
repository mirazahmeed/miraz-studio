"use client";

import { useState, useCallback } from "react";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  destructive?: boolean;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "CONFIRM",
  onConfirm,
  onCancel,
  destructive = false,
}: ConfirmDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = useCallback(async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
    }
  }, [onConfirm]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[998] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative bg-white border border-[#E6E6E4] shadow-2xl w-full max-w-md mx-4 p-6 sm:p-8 space-y-5 animate-[dialogEnter_0.2s_ease-out]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {destructive && (
              <div className="w-10 h-10 rounded-full bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
            )}
            <div>
              <h3 className="text-[16px] font-medium uppercase tracking-tight text-[#111111]">
                {title}
              </h3>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-1 text-[#71717A] hover:text-[#111111] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[13px] text-[#555555] leading-relaxed">{message}</p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 border border-[#E6E6E4] hover:bg-neutral-100 text-[#111111] text-[11px] font-medium uppercase tracking-[0.14em] rounded-[2px] transition-colors cursor-pointer"
          >
            CANCEL
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`px-5 py-2.5 text-white text-[11px] font-medium uppercase tracking-[0.14em] rounded-[2px] transition-colors cursor-pointer disabled:opacity-60 ${
              destructive
                ? "bg-red-600 hover:bg-red-700"
                : "bg-[#111111] hover:bg-[#222222]"
            }`}
          >
            {loading ? "PROCESSING..." : confirmLabel}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes dialogEnter {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
