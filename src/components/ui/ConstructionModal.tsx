"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ConstructionModal() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem("hasSeenConstructionModal");
    if (!hasSeenModal) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("hasSeenConstructionModal", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative max-w-md w-full p-8 bg-[#151515] border border-white/10 rounded-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 text-5xl">🚧</div>
            <h2 className="mb-3 text-2xl font-bold text-white font-[family-name:var(--font-heading)]">
              Site Under Construction
            </h2>
            <p className="mb-6 text-white/60 font-[family-name:var(--font-body)]">
              This site is still being built. Some features may be incomplete or
              change frequently. Thank you for your patience!
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2 text-sm font-semibold text-black bg-white rounded-lg hover:bg-white/90 transition-colors font-[family-name:var(--font-body)]"
            >
              I Understand
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}