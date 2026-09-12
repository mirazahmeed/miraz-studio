import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col justify-between p-8 sm:p-16">
      <div className="text-[13px] font-semibold tracking-tight uppercase">
        MIRAZ STUDIO™
      </div>

      <div className="max-w-2xl space-y-6">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#71717A]">
          ERROR 404 • ROUTE UNRESOLVED
        </span>
        <h1 className="text-[36px] sm:text-[56px] font-normal leading-tight uppercase tracking-tight text-[#111111]">
          THIS PAGE DOESN&apos;T EXIST.
        </h1>
        <p className="text-[15px] text-[#555555] font-light leading-relaxed">
          The requested coordinate or project monograph does not exist within the studio directory.
        </p>
        <div className="pt-4">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] text-white text-[11px] font-medium uppercase tracking-[0.14em] rounded-full hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO SELECTED WORK</span>
          </Link>
        </div>
      </div>

      <div className="text-[11px] uppercase tracking-widest text-[#8E8E93]">
        © {new Date().getFullYear()} MIRAZ STUDIO™
      </div>
    </div>
  );
}
