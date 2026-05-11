"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, Loader2, ShieldCheck, UserCheck, AlertCircle } from "lucide-react";

const BRAND_BLUE = "#07518a";
const API_ENDPOINT = "/strapi/api/auth/local";

export default function HRLogin() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Invalid credentials");
      }

      // Success
      localStorage.setItem("hr_token", data.jwt);
      localStorage.setItem("hr_user", JSON.stringify(data.user));
      setSuccess(true);

      // Delay redirect to show success state
      setTimeout(() => {
        router.push("/hr/dashboard");
      }, 1500);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center font-sans selection:bg-[#07518a]/10"
      style={{
        backgroundImage: "linear-gradient(45deg, transparent 0%, transparent 2%,rgba(116, 116, 116,0.04) 2%, rgba(116, 116, 116,0.04) 36%,transparent 36%, transparent 100%),linear-gradient(0deg, transparent 0%, transparent 48%,rgba(116, 116, 116,0.04) 48%, rgba(116, 116, 116,0.04) 64%,transparent 64%, transparent 100%),linear-gradient(90deg, transparent 0%, transparent 70%,rgba(116, 116, 116,0.04) 70%, rgba(116, 116, 116,0.04) 73%,transparent 73%, transparent 100%),linear-gradient(90deg, transparent 0%, transparent 17%,rgba(116, 116, 116,0.04) 17%, rgba(116, 116, 116,0.04) 54%,transparent 54%, transparent 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255))"
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-screen overflow-hidden flex flex-col md:flex-row"
      >
        {/* LEFT SIDE: ILLUSTRATION */}
        <div className="hidden md:flex md:w-1/2 bg-slate-50 items-end justify-center relative overflow-hidden h-full">
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="relative z-10 w-full h-full flex items-end justify-center"
          >
            <img 
              src="/hr-login-woman.png" 
              alt="Successful Career Illustration" 
              className="w-full h-[90%] object-contain object-bottom"
            />
          </motion.div>
          
          {/* Subtle decoration */}
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#07518a]/5 rounded-full blur-[100px] -ml-48" />
          <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-blue-400/5 rounded-full blur-[80px] -mr-32" />
        </div>

        {/* RIGHT SIDE: LOGIN FORM */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 md:p-24 flex flex-col justify-center bg-white z-10 h-full overflow-y-auto custom-scrollbar">
          <div className="max-w-md mx-auto w-full">
            <header className="mb-10">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-[#07518a]/5 rounded-2xl mb-6">
                <UserCheck className="text-[#07518a]" size={28} />
              </div>
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Portal Sign In</h1>
              <p className="text-slate-500 mt-3 text-base font-medium">Please enter your administrator credentials</p>
            </header>

            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-12 text-center"
                >
                  <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                    <ShieldCheck className="text-green-600" size={48} />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">Access Granted</h3>
                  <p className="text-slate-500 mt-3 text-lg">Synchronizing your dashboard data...</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleLogin}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 bg-red-50 text-red-600 text-sm rounded-2xl flex gap-3 items-center border border-red-100 shadow-sm"
                    >
                      <AlertCircle size={20} />
                      {error}
                    </motion.div>
                  )}

                  <div className="space-y-2.5">
                    <label className="text-sm font-bold text-slate-500 ml-1">
                      Administrator Email
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#07518a] transition-colors">
                        <Mail size={20} />
                      </div>
                      <input
                        type="text"
                        required
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="admin@brihaspathi.com"
                        className="w-full pl-12 pr-5 py-4.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#07518a]/5 focus:border-[#07518a] transition-all outline-none text-slate-900 placeholder:text-slate-400 text-lg shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center ml-1">
                      <label className="text-sm font-bold text-slate-500">
                        Secure Password
                      </label>
                      <button type="button" className="text-sm font-bold text-[#07518a] hover:underline">
                        Recovery?
                      </button>
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#07518a] transition-colors">
                        <Lock size={20} />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-12 pr-12 py-4.5 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#07518a]/5 focus:border-[#07518a] transition-all outline-none text-slate-900 placeholder:text-slate-400 text-lg shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#07518a] hover:bg-[#064272] text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-900/10 active:scale-[0.99] transition-all flex items-center justify-center gap-4 disabled:opacity-70 disabled:cursor-not-allowed text-lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={24} className="animate-spin" />
                        Authenticating...
                      </>
                    ) : (
                      <>
                        Log In to Dashboard
                        <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            <footer className="mt-12 pt-8 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
                  © {new Date().getFullYear()} Brihaspathi Tech
                </p>
                <div className="flex gap-4">
                  <span className="text-[10px] font-bold text-slate-300 uppercase">System Active</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mt-0.5" />
                </div>
              </div>
            </footer>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
