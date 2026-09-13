import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface FooterProps {
  studioName?: string;
  tagline?: string;
  email?: string;
  location?: string;
}

export function Footer({
  studioName = "MIRAZ STUDIO™",
  tagline = "DESIGNING AND BUILDING DIGITAL EXPERIENCES WITH INTENTION.",
  email = "mirazahmed0619@gmail.com",
  location = "DHAKA / AVAILABLE GLOBALLY",
}: FooterProps) {
  return (
    <footer className="bg-white border-t border-[#E6E6E4] pt-20 pb-12 mt-24">
      <div className="studio-container">
        {/* Top Callout / Big Wordmark & Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#E6E6E4]">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[18px] font-semibold tracking-tight text-[#111111]">
              {studioName}
            </span>
            <p className="text-[20px] sm:text-[24px] font-light leading-snug tracking-[-0.02em] text-[#111111] max-w-lg">
              {tagline}
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-end items-start lg:items-end space-y-3">
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
              INITIATE A CONVERSATION
            </span>
            <a
              href={`mailto:${email}`}
              className="text-[22px] sm:text-[28px] font-light text-[#111111] hover:text-[#71717A] tracking-tight underline underline-offset-8 transition-colors flex items-center gap-2"
            >
              <span>{email}</span>
              <ArrowUpRight className="w-5 h-5 inline-block" />
            </a>
          </div>
        </div>

        {/* 4 Columns Directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16 border-b border-[#E6E6E4] text-[13px]">
          {/* Col 1 */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
              EXPLORE
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/work" className="text-[#111111] hover:text-[#71717A] transition-colors">
                  SELECTED WORK
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-[#111111] hover:text-[#71717A] transition-colors">
                  CAPABILITIES
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#111111] hover:text-[#71717A] transition-colors">
                  STUDIO MONOGRAPH
                </Link>
              </li>
              <li>
                <Link href="/#process" className="text-[#111111] hover:text-[#71717A] transition-colors">
                  WORKING PRINCIPLES
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#111111] hover:text-[#71717A] transition-colors">
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
              DISCIPLINES
            </h4>
            <ul className="space-y-2.5 text-[#555555]">
              <li>DIGITAL PRODUCTS</li>
              <li>FULL-STACK NEXT.JS</li>
              <li>ARCHITECTURAL UI/UX</li>
              <li>DESIGN SYSTEMS</li>
              <li>AI & AUTOMATION</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
              NETWORK
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="https://github.com/mirazahmed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#111111] hover:text-[#71717A] transition-colors flex items-center gap-1.5"
                >
                  <span>GITHUB</span>
                  <ArrowUpRight className="w-3 h-3 text-[#8E8E93]" />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/mirazahmed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#111111] hover:text-[#71717A] transition-colors flex items-center gap-1.5"
                >
                  <span>LINKEDIN</span>
                  <ArrowUpRight className="w-3 h-3 text-[#8E8E93]" />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/mirazahmed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#111111] hover:text-[#71717A] transition-colors flex items-center gap-1.5"
                >
                  <span>X (TWITTER)</span>
                  <ArrowUpRight className="w-3 h-3 text-[#8E8E93]" />
                </a>
              </li>
              <li>
                <a
                  href="https://figma.com/@miraz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#111111] hover:text-[#71717A] transition-colors flex items-center gap-1.5"
                >
                  <span>FIGMA COMMUNITY</span>
                  <ArrowUpRight className="w-3 h-3 text-[#8E8E93]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#71717A]">
              LOCATION & ACCESS
            </h4>
            <p className="text-[#555555] leading-relaxed">
              {location}
            </p>
            <div className="pt-2">
              <Link
                href="/admin"
                className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#8E8E93] hover:text-[#111111] transition-colors"
              >
                ADMIN DASHBOARD →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] uppercase tracking-[0.12em] text-[#8E8E93] space-y-4 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} {studioName}. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center space-x-6">
            <span>EDITORIAL CODE & ARCHITECTURE</span>
            <Link href="/admin/login" className="hover:text-[#111111] transition-colors">
              CMS ACCESS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
