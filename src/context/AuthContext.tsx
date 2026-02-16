"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => { success: boolean; message: string };
  logout: () => void;
  isLocked: boolean;
  remainingLockTime: number;
  loginAttempts: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = "mirazstudio_auth";
const SESSION_EXPIRY_KEY = "mirazstudio_session_expiry";
const LOGIN_ATTEMPTS_KEY = "mirazstudio_login_attempts";
const LOCKOUT_UNTIL_KEY = "mirazstudio_lockout_until";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "";
const SESSION_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_SESSION_TIMEOUT || "30", 10);
const MAX_LOGATTEMPTS = parseInt(process.env.NEXT_PUBLIC_MAX_LOGIN_ATTEMPTS || "5", 10);
const LOCKOUT_MINUTES = parseInt(process.env.NEXT_PUBLIC_LOGIN_LOCKOUT_MINUTES || "15", 10);

function generateSecureToken(): string {
  const array = new Uint8Array(32);
  if (typeof window !== "undefined" && window.crypto) {
    window.crypto.getRandomValues(array);
  } else {
    for (let i = 0; i < 32; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function hashToken(token: string): string {
  let hash = 0;
  for (let i = 0; i < token.length; i++) {
    const char = token.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [remainingLockTime, setRemainingLockTime] = useState(0);
  const [loginAttempts, setLoginAttempts] = useState(0);

  useEffect(() => {
    const storedAuth = localStorage.getItem(AUTH_KEY);
    const sessionExpiry = localStorage.getItem(SESSION_EXPIRY_KEY);
    const lockoutUntil = localStorage.getItem(LOCKOUT_UNTIL_KEY);

    if (lockoutUntil) {
      const lockTime = parseInt(lockoutUntil, 10);
      const now = Date.now();
      if (lockTime > now) {
        setIsLocked(true);
        setRemainingLockTime(Math.ceil((lockTime - now) / 1000));
      } else {
        localStorage.removeItem(LOCKOUT_UNTIL_KEY);
        localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
      }
    }

    if (storedAuth && sessionExpiry) {
      const expiry = parseInt(sessionExpiry, 10);
      const now = Date.now();
      if (now < expiry) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem(AUTH_KEY);
        localStorage.removeItem(SESSION_EXPIRY_KEY);
      }
    }

    const attempts = localStorage.getItem(LOGIN_ATTEMPTS_KEY);
    if (attempts) {
      setLoginAttempts(parseInt(attempts, 10));
    }
  }, []);

  useEffect(() => {
    if (isLocked && remainingLockTime > 0) {
      const timer = setTimeout(() => {
        setRemainingLockTime((prev) => {
          if (prev <= 1) {
            setIsLocked(false);
            localStorage.removeItem(LOCKOUT_UNTIL_KEY);
            localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
            setLoginAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLocked, remainingLockTime]);

  useEffect(() => {
    if (isAuthenticated) {
      const checkSession = setInterval(() => {
        const sessionExpiry = localStorage.getItem(SESSION_EXPIRY_KEY);
        if (sessionExpiry && Date.now() > parseInt(sessionExpiry, 10)) {
          logout();
        }
      }, 60000);
      return () => clearInterval(checkSession);
    }
  }, [isAuthenticated]);

  const login = useCallback((password: string): { success: boolean; message: string } => {
    if (isLocked) {
      return { success: false, message: `Account locked. Try again in ${remainingLockTime} seconds.` };
    }

    if (!ADMIN_PASSWORD) {
      console.error("Admin password not configured");
      return { success: false, message: "Configuration error. Contact administrator." };
    }

    if (password !== ADMIN_PASSWORD) {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      localStorage.setItem(LOGIN_ATTEMPTS_KEY, newAttempts.toString());

      if (newAttempts >= MAX_LOGATTEMPTS) {
        const lockoutUntil = Date.now() + (LOCKOUT_MINUTES * 60 * 1000);
        localStorage.setItem(LOCKOUT_UNTIL_KEY, lockoutUntil.toString());
        setIsLocked(true);
        setRemainingLockTime(LOCKOUT_MINUTES * 60);
        return { success: false, message: `Too many failed attempts. Account locked for ${LOCKOUT_MINUTES} minutes.` };
      }

      const remaining = MAX_LOGATTEMPTS - newAttempts;
      return { success: false, message: `Invalid password. ${remaining} attempt${remaining !== 1 ? "s" : ""} remaining.` };
    }

    const secureToken = generateSecureToken();
    const tokenHash = hashToken(secureToken);
    const sessionExpiry = Date.now() + (SESSION_TIMEOUT * 60 * 1000);

    localStorage.setItem(AUTH_KEY, tokenHash);
    localStorage.setItem(SESSION_EXPIRY_KEY, sessionExpiry.toString());
    localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
    localStorage.removeItem(LOCKOUT_UNTIL_KEY);

    setIsAuthenticated(true);
    setLoginAttempts(0);
    setIsLocked(false);

    return { success: true, message: "Login successful" };
  }, [isLocked, loginAttempts, remainingLockTime, ADMIN_PASSWORD, MAX_LOGATTEMPTS, LOCKOUT_MINUTES, SESSION_TIMEOUT]);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(SESSION_EXPIRY_KEY);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLocked, remainingLockTime, loginAttempts }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
