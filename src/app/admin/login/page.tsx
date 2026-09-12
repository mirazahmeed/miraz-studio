"use client";

import { useActionState } from "react";
import { loginAdminAction } from "@/app/actions/admin";
import Link from "next/link";
import { ArrowLeft, Lock, ArrowUpRight } from "lucide-react";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdminAction, null);

  return (
    <div className="min-h-screen bg-[#F8F8F7] flex flex-col justify-between p-6 sm:p-12">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-[#71717A] hover:text-[#111111]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO STUDIO</span>
        </Link>
        <span className="text-[11px] font-mono text-[#8E8E93] uppercase tracking-widest">
          SECURITY PROTOCOL • ACCESS RESTRICTED
        </span>
      </div>

      {/* Login Box */}
      <div className="w-full max-w-md mx-auto bg-white border border-[#E6E6E4] p-8 sm:p-10 shadow-xs">
        <div className="pb-6 mb-8 border-b border-[#E6E6E4]">
          <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-[#111111] mb-4">
            <Lock className="w-4 h-4" />
          </div>
          <h1 className="text-[22px] font-normal uppercase tracking-tight text-[#111111]">
            STUDIO CMS ACCESS
          </h1>
          <p className="text-[13px] text-[#71717A] font-light mt-1">
            Authorized administrative sessions only.
          </p>
        </div>

        <form action={formAction} className="space-y-6">
          {state?.error && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-600 text-[12px]">
              {state.error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
              ADMINISTRATOR EMAIL
            </label>
            <input
              type="email"
              name="email"
              defaultValue="admin@miraz.studio"
              required
              placeholder="admin@miraz.studio"
              className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] transition-colors rounded-[2px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              defaultValue="Zero00Zero"
              required
              className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] transition-colors rounded-[2px]"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 bg-[#111111] hover:bg-[#222222] text-white text-[11px] font-medium uppercase tracking-[0.16em] transition-all rounded-[2px] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{isPending ? "AUTHENTICATING..." : "AUTHENTICATE"}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Footer Colophon */}
      <div className="text-center text-[11px] font-mono text-[#8E8E93] uppercase tracking-widest">
        MIRAZ STUDIO™ • ENCRYPTED SESSION INFRASTRUCTURE
      </div>
    </div>
  );
}
