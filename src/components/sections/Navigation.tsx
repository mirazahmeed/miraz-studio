"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Button from "../ui/Button";
import { useNavbar } from "@/context/NavbarContext";

export default function Navigation() {
  const { config } = useNavbar();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const visibleItems = config.items
    .filter((item) => item.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a
              href="#"
              className="text-xl md:text-2xl font-bold font-[family-name:var(--font-syne)] tracking-tight"
            >
              {config.logo.text}
              <span className="text-[#A3A3A3]">{config.logo.highlight}</span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {visibleItems.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm text-white/70 hover:text-white transition-colors duration-300"
                >
                  {link.name}
                </button>
              ))}
              {config.cta.visible && (
                <Button href="#contact" size="sm">
                  {config.cta.text}
                </Button>
              )}
            </div>

            {config.mobileMenu.enabled && (
              <button
                className="md:hidden p-2 text-white"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
            )}
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && config.mobileMenu.enabled && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-[#0A0A0A] z-50 md:hidden p-6"
            >
              <div className="flex justify-end">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col gap-6 mt-8">
                {visibleItems.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.href)}
                    className="text-lg text-white/70 hover:text-white transition-colors duration-300 text-left"
                  >
                    {link.name}
                  </button>
                ))}
                {config.cta.visible && (
                  <Button
                    href="#contact"
                    size="md"
                    className="mt-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {config.cta.text}
                  </Button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
