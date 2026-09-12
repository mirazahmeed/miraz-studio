"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface HeaderProps {
  studioName?: string;
}

export function Header({ studioName = "MIRAZ™" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "WORK", href: "/work" },
    { label: "SERVICES", href: "/services" },
    { label: "ABOUT", href: "/about" },
    { label: "PROCESS", href: "/#process" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-[#E6E6E4] py-4"
          : "bg-white py-6 border-b border-[#E6E6E4]/60"
      }`}
    >
      <div className="studio-container flex items-center justify-between">
        {/* Left: Studio Wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-[17px] font-medium tracking-tight text-[#111111]"
        >
          <span className="font-semibold tracking-[-0.03em]">{studioName}</span>
          <span className="hidden sm:inline-block text-[11px] uppercase tracking-[0.14em] text-[#71717A] font-normal pl-3 border-l border-[#E6E6E4]">
            DIGITAL STUDIO
          </span>
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-9">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[12px] font-medium uppercase tracking-[0.12em] transition-colors duration-200 ${
                  isActive
                    ? "text-[#111111]"
                    : "text-[#71717A] hover:text-[#111111]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] hover:bg-[#222222] text-white text-[11px] font-medium uppercase tracking-[0.14em] transition-all rounded-full"
          >
            <span>LET&apos;S TALK</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#111111] hover:bg-neutral-100 rounded-sm"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[73px] bg-white border-b border-[#E6E6E4] px-6 py-8 shadow-xl">
          <nav className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[14px] font-medium uppercase tracking-[0.14em] text-[#111111] hover:text-[#71717A]"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-[#E6E6E4]">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between w-full px-5 py-3 bg-[#111111] text-white text-[12px] font-medium uppercase tracking-[0.14em] rounded-full"
              >
                <span>LET&apos;S TALK</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
