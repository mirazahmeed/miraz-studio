"use client";

import { useActionState } from "react";
import { submitContactMessage, ContactFormState } from "@/app/actions/contact";
import { ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";

const initialState: ContactFormState = {};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactMessage,
    initialState
  );

  if (state.success) {
    return (
      <div className="p-8 sm:p-12 bg-[#FAFAF9] border border-[#E6E6E4] text-center space-y-4">
        <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
        <h3 className="text-[22px] font-normal uppercase tracking-tight text-[#111111]">
          TRANSMISSION RECEIVED
        </h3>
        <p className="text-[14px] text-[#555555] font-light max-w-md mx-auto leading-relaxed">
          Thank you for reaching out. We review every prospective project brief thoroughly and will respond within 24 business hours.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      {state.error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-[13px] flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
            YOUR NAME *
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Jane Doe"
            className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] transition-colors rounded-[2px]"
          />
          {state.fieldErrors?.name && (
            <span className="text-[11px] text-red-500">{state.fieldErrors.name[0]}</span>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
            EMAIL ADDRESS *
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="jane@company.com"
            className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] transition-colors rounded-[2px]"
          />
          {state.fieldErrors?.email && (
            <span className="text-[11px] text-red-500">{state.fieldErrors.email[0]}</span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Company */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
            ORGANIZATION / COMPANY
          </label>
          <input
            type="text"
            name="company"
            placeholder="Acme Studio"
            className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] transition-colors rounded-[2px]"
          />
        </div>

        {/* Project Type */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
            PROJECT SCOPE
          </label>
          <select
            name="projectType"
            className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] transition-colors rounded-[2px]"
          >
            <option value="Digital Product / Web App">Digital Product / Web App</option>
            <option value="Editorial Website">Editorial Website</option>
            <option value="Design System Infrastructure">Design System Infrastructure</option>
            <option value="AI Workflow & Automation">AI Workflow & Automation</option>
            <option value="Technical Advisory / Audit">Technical Advisory / Audit</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Budget */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
            BUDGET RANGE
          </label>
          <select
            name="budget"
            className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] transition-colors rounded-[2px]"
          >
            <option value="$5k – $10k">$5,000 – $10,000</option>
            <option value="$10k – $25k">$10,000 – $25,000</option>
            <option value="$25k – $50k+">$25,000 – $50,000+</option>
            <option value="Retainer / Advisory">Retainer / Advisory</option>
          </select>
        </div>

        {/* Timeline */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
            TARGET LAUNCH TIMELINE
          </label>
          <select
            name="timeline"
            className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] transition-colors rounded-[2px]"
          >
            <option value="Immediate (< 1 Month)">Immediate (&lt; 1 Month)</option>
            <option value="1 – 3 Months">1 – 3 Months</option>
            <option value="Flexible / Q3 2026">Flexible / Q3 2026</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
          PROJECT DETAILS & OBJECTIVES *
        </label>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Please describe the problem you are solving, core requirements, or links to existing briefs..."
          className="w-full px-4 py-3 bg-white border border-[#E6E6E4] text-[#111111] text-[14px] focus:outline-none focus:border-[#111111] transition-colors rounded-[2px]"
        />
        {state.fieldErrors?.message && (
          <span className="text-[11px] text-red-500">{state.fieldErrors.message[0]}</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full sm:w-auto px-8 py-4 bg-[#111111] hover:bg-[#222222] text-white text-[11px] font-medium uppercase tracking-[0.16em] transition-all rounded-full flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        <span>{isPending ? "TRANSMITTING..." : "SUBMIT INQUIRY"}</span>
        <ArrowUpRight className="w-3.5 h-3.5" />
      </button>
    </form>
  );
}
