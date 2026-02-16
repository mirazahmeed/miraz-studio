"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Lock, ArrowLeft, AlertTriangle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLocked, remainingLockTime, loginAttempts } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isLocked) {
      setError(`Account locked. Please wait ${Math.ceil(remainingLockTime / 60)} minutes.`);
      return;
    }

    const result = login(password);
    
    if (result.success) {
      router.push("/admin/dashboard");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <a
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Back to Home
        </a>

        <div className="bg-[#141414] border border-white/10 rounded-2xl p-8">
          <div className="flex items-center justify-center w-16 h-16 bg-white/5 rounded-full mx-auto mb-6">
            <Lock className="w-8 h-8 text-white/70" />
          </div>

          <h1 className="text-2xl font-bold font-[family-name:var(--font-syne)] text-center mb-2">
            Admin Access
          </h1>
          <p className="text-[#A3A3A3] text-center mb-8">
            Enter your password to manage content
          </p>

          {isLocked && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 flex items-start gap-3"
            >
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-400 text-sm font-medium">Account Temporarily Locked</p>
                <p className="text-red-400/70 text-xs mt-1">
                  Too many failed login attempts. Try again in {Math.ceil(remainingLockTime / 60)} minutes.
                </p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                disabled={isLocked}
                className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors disabled:opacity-50"
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isLocked}>
              {isLocked ? "Account Locked" : "Login"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
