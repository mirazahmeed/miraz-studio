"use client";

import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { useNavbar } from "@/context/NavbarContext";
import { useFooter } from "@/context/FooterContext";

const iconMap: Record<string, any> = {
  Github,
  Linkedin,
  Twitter,
  Instagram,
};

export default function Footer() {
  const { config: navbarConfig } = useNavbar();
  const { config: footerConfig } = useFooter();

  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const visibleNavLinks = navbarConfig.items
    .filter((item) => item.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <a
              href="#"
              className="text-xl md:text-2xl font-bold font-[family-name:var(--font-syne)] tracking-tight"
            >
              {footerConfig.logo.text}
              <span className="text-[#A3A3A3]">{footerConfig.logo.highlight}</span>
            </a>
            <p className="mt-4 text-[#A3A3A3] leading-relaxed max-w-sm">
              {footerConfig.logo.description}
            </p>
          </div>

          {footerConfig.quickLinks.visible && (
            <div>
              <h4 className="text-white font-semibold mb-4 font-[family-name:var(--font-syne)]">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {visibleNavLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-[#A3A3A3] hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className="text-white font-semibold mb-4 font-[family-name:var(--font-syne)]">
              Follow Us
            </h4>
            <div className="flex gap-4">
              {footerConfig.socialLinks
                .filter((link) => link.visible)
                .map((social) => {
                  const IconComponent = iconMap[social.icon];
                  if (!IconComponent) return null;
                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#A3A3A3] hover:bg-white/10 hover:text-white transition-all duration-300"
                      aria-label={social.name}
                    >
                      <IconComponent size={18} />
                    </a>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#525252] text-sm">
            &copy; {footerConfig.copyright.showYear ? currentYear : ""} {footerConfig.logo.text}{footerConfig.logo.highlight}. {footerConfig.copyright.text}
          </p>
          <div className="flex gap-6 text-sm">
            {footerConfig.legalLinks.privacy.visible && (
              <a href="#" className="text-[#525252] hover:text-white transition-colors">
                {footerConfig.legalLinks.privacy.text}
              </a>
            )}
            {footerConfig.legalLinks.terms.visible && (
              <a href="#" className="text-[#525252] hover:text-white transition-colors">
                {footerConfig.legalLinks.terms.text}
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
