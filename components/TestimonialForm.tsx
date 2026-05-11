"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { 
  User, 
  Briefcase, 
  Building2, 
  MessageSquare, 
  Upload as UploadIcon, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ShieldCheck,
  Star,
  ArrowRight
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormValues {
  fullname: string;
  Designation: string;
  Company: string;
  Message: string;
}

type FieldName = keyof FormValues;

interface FileItem {
  file: File;
  preview: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const API = "/strapi/api";
const UPLOAD_API = `${API}/upload`;
const LOGO_SRC = "/highbtlogo-tm-1.png";

export default function TestimonialForm() {
  const [values, setValues] = useState<FormValues>({
    fullname: "",
    Designation: "",
    Company: "",
    Message: "",
  });
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [fileItem, setFileItem] = useState<FileItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isMounted, setIsMounted] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Turnstile listener
  useEffect(() => {
    const handler = (e: Event) =>
      setTurnstileToken((e as CustomEvent<string>).detail);
    window.addEventListener("turnstile-token", handler);
    return () => window.removeEventListener("turnstile-token", handler);
  }, []);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (fileItem?.preview) URL.revokeObjectURL(fileItem.preview);
    };
  }, [fileItem]);

  const validate = useCallback((vals: FormValues): Partial<FormValues> => {
    const e: Partial<FormValues> = {};
    if (!vals.fullname.trim()) e.fullname = "Full name is required.";
    if (!vals.Message.trim()) e.Message = "Message is required.";
    else if (vals.Message.trim().length < 20)
      e.Message = "Minimum 20 characters required.";
    return e;
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...values, [name]: value };
    setValues(updated);
    if (touched[name as FieldName]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (name: FieldName) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(values));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be under 5 MB.");
      return;
    }
    if (fileItem?.preview) URL.revokeObjectURL(fileItem.preview);
    setFileItem({ file, preview: URL.createObjectURL(file) });
  };

  const removeFile = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    if (fileItem?.preview) URL.revokeObjectURL(fileItem.preview);
    setFileItem(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched: Partial<Record<FieldName, boolean>> = {
      fullname: true,
      Designation: true,
      Company: true,
      Message: true,
    };
    setTouched(allTouched);
    const errs = validate(values);
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      const firstInvalid = formRef.current?.querySelector("[aria-invalid='true']");
      if (firstInvalid) {
        (firstInvalid as HTMLElement).focus();
        firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    if (!turnstileToken) {
      alert("Please complete the security verification.");
      return;
    }

    try {
      setLoading(true);
      setStatus("idle");
      
      let uploadedFileId: number | null = null;
      if (fileItem) {
        const formData = new FormData();
        formData.append("files", fileItem.file);
        const uploadRes = await fetch(UPLOAD_API, {
          method: "POST",
          body: formData,
        });
        if (!uploadRes.ok) throw new Error("Upload failed");
        const uploadData = await uploadRes.json();
        uploadedFileId = uploadData[0]?.id ?? null;
      }

      const payload = {
        data: {
          fullname: values.fullname.trim(),
          Designation: values.Designation.trim(),
          Company: values.Company.trim(),
          Message: values.Message.trim(),
          ...(uploadedFileId ? { Profile: uploadedFileId } : {}),
        },
      };

      const res = await fetch(`${API}/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Submit failed");

      setStatus("success");
      setValues({ fullname: "", Designation: "", Company: "", Message: "" });
      if (fileItem?.preview) URL.revokeObjectURL(fileItem.preview);
      setFileItem(null);
      setTurnstileToken("");
      setTouched({});
      if (fileInputRef.current) fileInputRef.current.value = "";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const completionPct = Math.round(
    ([values.fullname, values.Designation, values.Company, values.Message].filter(
      (v) => v.trim().length > 0
    ).length / 4) * 100
  );

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row font-sans selection:bg-blue-100">
      
      {/* ── Left Side (Branding) ── */}
      <aside className="lg:w-[35%] bg-slate-50 lg:fixed lg:inset-y-0 lg:left-0 border-r border-slate-100 p-8 lg:p-12 flex flex-col justify-center">
        <div className="max-w-xs mx-auto lg:mx-0">
          <img 
            src={LOGO_SRC} 
            alt="Logo" 
            className="h-10 w-auto object-contain mb-12" 
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tighter">
              Your story <br/>
              <span className="text-blue-600">matters.</span>
            </h1>
            <p className="text-slate-500 text-base font-medium leading-relaxed">
              Share your professional journey with us. We value your feedback and insights as we grow together.
            </p>
            
            <div className="pt-4 flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest">
              Professional Registry <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </aside>

      {/* ── Right Side (Form) ── */}
      <main className="lg:ml-[35%] flex-1 bg-white">
        {/* Progress Bar */}
        <div className="sticky top-0 z-[100] w-full h-1 bg-slate-50 overflow-hidden">
           <div className="h-full bg-blue-600 transition-all duration-700" style={{ width: `${completionPct}%` }} />
        </div>

        <div className="max-w-xl mx-auto px-6 py-12 lg:py-24">
          
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Submit Testimonial</h2>
            <p className="text-slate-400 text-sm mt-1 font-medium">Draft your review below</p>
          </div>

          {/* Status */}
          {status === "success" && (
            <div className="mb-10 p-6 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-4 animate-in fade-in zoom-in-95 duration-500">
              <CheckCircle2 size={24} className="text-blue-600 shrink-0" />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Submission Successful</h3>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">Thank you for your feedback! Our team will review it shortly.</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-8" noValidate>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name *</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={16} />
                  <input
                    name="fullname"
                    type="text"
                    placeholder="Alexandra Smith"
                    value={values.fullname}
                    onChange={handleChange}
                    onBlur={() => handleBlur("fullname")}
                    className={`w-full h-12 pl-12 pr-4 bg-slate-50 border rounded-xl outline-none text-sm font-bold transition-all ${errors.fullname && touched.fullname ? 'border-red-400' : 'border-slate-100 focus:bg-white focus:border-blue-600 shadow-sm'}`}
                  />
                </div>
                {errors.fullname && touched.fullname && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.fullname}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Designation</label>
                <div className="relative group">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={16} />
                  <input
                    name="Designation"
                    type="text"
                    placeholder="Managing Director"
                    value={values.Designation}
                    onChange={handleChange}
                    className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm font-bold focus:bg-white focus:border-blue-600 transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Company / Organisation</label>
              <div className="relative group">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={16} />
                <input
                  name="Company"
                  type="text"
                  placeholder="e.g. BTL India, Google..."
                  value={values.Company}
                  onChange={handleChange}
                  className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-xl outline-none text-sm font-bold focus:bg-white focus:border-blue-600 transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Profile Image</label>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="group h-20 w-full rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-blue-600 transition-all cursor-pointer flex items-center px-5 gap-5 shadow-sm"
              >
                {fileItem ? (
                  <img src={fileItem.preview} alt="Profile" className="h-10 w-10 rounded-xl object-cover border border-white shadow-md" />
                ) : (
                  <div className="h-10 w-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-blue-600 transition-all shadow-sm">
                    <UploadIcon size={18} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">{fileItem ? fileItem.file.name : "Choose photo"}</p>
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-tight">JPG/PNG · Max 5MB</p>
                </div>
                {fileItem && (
                  <button type="button" onClick={removeFile} className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex justify-between">
                <span>Message *</span>
                <span className={values.Message.length < 20 ? 'text-red-400' : 'text-slate-300'}>{values.Message.length} / 20+</span>
              </label>
              <textarea
                name="Message"
                rows={6}
                placeholder="Share your experience..."
                value={values.Message}
                onChange={handleChange}
                onBlur={() => handleBlur("Message")}
                className={`w-full p-6 bg-slate-50 border rounded-2xl outline-none text-sm font-bold leading-relaxed transition-all resize-none ${errors.Message && touched.Message ? 'border-red-400' : 'border-slate-100 focus:bg-white focus:border-blue-600 shadow-sm'}`}
              />
              {errors.Message && touched.Message && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.Message}</p>}
            </div>

            <div className="pt-4 border-t border-slate-50">
               <div className="flex items-center gap-2 mb-4 text-slate-300 font-black uppercase tracking-widest text-[10px]">
                  <ShieldCheck size={14} className="text-blue-600" /> Human Check
               </div>
               {isMounted && (
                 <div 
                   className="cf-turnstile origin-left scale-90" 
                   data-sitekey="0x4AAAAAACNkR2ryvzP3rHKe" 
                   data-callback="onTurnstileSuccess" 
                 />
               )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-slate-900/10 hover:bg-blue-600 active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
              {loading ? "Processing..." : "Submit Review"}
            </button>
            
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest text-center leading-loose">
               © {isMounted ? new Date().getFullYear() : ""} BTL India
            </p>
          </form>
        </div>
      </main>

      {/* Assets */}
      <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.onTurnstileSuccess=function(t){window.dispatchEvent(new CustomEvent("turnstile-token",{detail:t}))};`,
        }}
      />
    </div>
  );
}