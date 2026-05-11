"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Plus, Trash2, Edit3, Search, Loader2,
  MapPin, Phone, Building2, LayoutDashboard,
  ChevronLeft, ChevronRight, Calendar
} from "lucide-react";
import {
  Form, Input, Modal, Button, message,
  Switch, Tag, Empty, Popconfirm
} from "antd";
import { motion } from "framer-motion";
import Sidebar from "../dashboard/Sidebar";

// ─────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────
const API_URL = "/strapi/api/job-openings";

interface JobOpening {
  id: number;
  documentId: string;
  title: string;
  department: string;
  location: string;
  experience: string;
  description: string;
  contactNumber: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function VacanciesPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [form] = Form.useForm();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const getAuthHeaders = useCallback(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("hr_token") : null;
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  }, []);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}?sort=createdAt:desc`, getAuthHeaders());
      const rawData = response.data.data || [];
      const cleanData = rawData.map((item: any) => item.attributes ? { id: item.id, documentId: item.documentId, ...item.attributes } : item);
      setJobs(cleanData);
    } catch (err: any) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [getAuthHeaders]);

  useEffect(() => {
    const token = localStorage.getItem("hr_token");
    if (!token) { router.push("/hr/login"); return; }
    fetchJobs();
  }, [fetchJobs, router]);

  const handleSave = async (values: any) => {
    setSubmitting(true);
    try {
      const payload = { data: { ...values, isActive: values.isActive ?? true } };
      if (editingJob) {
        await axios.put(`${API_URL}/${editingJob.documentId || editingJob.id}`, payload, getAuthHeaders());
        message.success("Updated Successfully");
      } else {
        await axios.post(API_URL, payload, getAuthHeaders());
        message.success("Vacancy Created");
      }
      setIsModalOpen(false);
      setEditingJob(null);
      form.resetFields();
      fetchJobs();
    } catch (err: any) {
      message.error("Failed to save vacancy");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
      message.success("Vacancy Removed");
      fetchJobs();
    } catch (err: any) { message.error("Delete failed"); }
  };

  const toggleStatus = async (job: JobOpening) => {
    try {
      const payload = { data: { isActive: !job.isActive } };
      await axios.put(`${API_URL}/${job.documentId || job.id}`, payload, getAuthHeaders());
      fetchJobs();
      message.success("Status Updated");
    } catch (err: any) { message.error("Status update failed"); }
  };

  if (!mounted) return null;

  const SW = collapsed ? 68 : 248;
  const filteredJobs = jobs.filter(job =>
    job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", background: "#F8FAFC", overflow: "hidden", fontFamily: "DM Sans, sans-serif" }}>

      {/* GLOBAL SIDEBAR */}
      <Sidebar
        activeTab="Vacancies"
        onTabChange={() => router.push("/hr/dashboard")}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        vacanciesCount={jobs.length}
      />

      {/* MAIN CONTENT */}
      <main style={{ marginLeft: SW, flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", transition: "margin-left 0.28s ease" }}>

        {/* HEADER */}
        <header style={{ height: 72, background: "rgba(255,255,255,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", position: "sticky", top: 0, zIndex: 900 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.5px" }}>Vacancies Management</h1>
            <Tag color="blue" className="!rounded-full !px-3 !font-black !text-[10px] uppercase">{jobs.length} ROLES</Tag>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative" }}>
              <Search style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} size={16} />
              <input
                type="text"
                placeholder="Search roles..."
                style={{ padding: "10px 12px 10px 40px", borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 13, outline: "none", width: 220, background: "#F1F5F9" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="primary" icon={<Plus size={16} />} onClick={() => { setEditingJob(null); form.resetFields(); setIsModalOpen(true); }} className="!rounded-xl !h-[42px] !bg-[#07518a] !font-bold">
              Post New Role
            </Button>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div style={{ flex: 1, overflowY: "auto", padding: "32px" }}>
          {loading ? (
            <div style={{ height: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}><Loader2 className="animate-spin text-blue-600" size={32} /></div>
          ) : filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
              {filteredJobs.map(job => (
                <motion.div key={job.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 italic uppercase tracking-tighter">{job.title}</h3>
                      <div className="flex items-center gap-3 mt-2">
                        <Tag color={job.isActive ? 'blue' : 'default'} className="!rounded-lg !font-black !text-[9px] uppercase tracking-wider">{job.isActive ? 'Active' : 'Draft'}</Tag>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{job.department}</span>
                      </div>
                    </div>
                    <Switch checked={job.isActive} size="small" onChange={() => toggleStatus(job)} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3 border border-slate-100"><MapPin size={16} className="text-slate-400" /><span className="text-[11px] font-black text-slate-700 uppercase tracking-tighter">{job.location}</span></div>
                    <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3 border border-slate-100"><Calendar size={16} className="text-slate-400" /><span className="text-[11px] font-black text-slate-700 uppercase tracking-tighter">{job.experience}</span></div>
                  </div>

                  <p className="text-xs text-slate-500 mb-8 italic line-clamp-3 leading-relaxed">"{job.description}"</p>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-3 text-slate-400 font-mono text-[10px] font-black"><Phone size={14} />{job.contactNumber}</div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setEditingJob(job); form.setFieldsValue(job); setIsModalOpen(true); }} className="p-3 text-slate-400 hover:text-[#07518a] hover:bg-blue-50 rounded-xl transition-all"><Edit3 size={18} /></button>
                      <Popconfirm title="Permanently delete this vacancy?" onConfirm={() => handleDelete(job.documentId || job.id)} okText="Delete" cancelText="Cancel" okButtonProps={{ danger: true }}><button className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button></Popconfirm>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="h-[500px] flex items-center justify-center"><Empty description="No vacancies detected in global registry" /></div>
          )}
        </div>
      </main>

      {/* MODAL */}
      <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null} width={700} centered title={<span className="text-2xl font-black italic uppercase tracking-tighter">{editingJob ? 'Refine Vacancy' : 'Initialize New Opening'}</span>}>
        <Form form={form} layout="vertical" onFinish={handleSave} className="pt-6">
          <div className="grid grid-cols-2 gap-6">
            <Form.Item name="title" label={<span className="text-[10px] font-black uppercase tracking-widest">Job Identity</span>} rules={[{ required: true }]}><Input className="!rounded-2xl !py-3" placeholder="e.g. Senior Software Engineer" /></Form.Item>
            <Form.Item name="department" label={<span className="text-[10px] font-black uppercase tracking-widest">Department Cluster</span>} rules={[{ required: true }]}><Input className="!rounded-2xl !py-3" placeholder="e.g. Technology" /></Form.Item>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <Form.Item name="location" label={<span className="text-[10px] font-black uppercase tracking-widest">Operational Node</span>} rules={[{ required: true }]}><Input className="!rounded-2xl !py-3" placeholder="e.g. Hyderabad" /></Form.Item>
            <Form.Item name="experience" label={<span className="text-[10px] font-black uppercase tracking-widest">Experience Tier</span>} rules={[{ required: true }]}><Input className="!rounded-2xl !py-3" placeholder="e.g. 5+ Years" /></Form.Item>
            <Form.Item name="contactNumber" label={<span className="text-[10px] font-black uppercase tracking-widest">Pulse Contact</span>} rules={[{ required: true }]}><Input className="!rounded-2xl !py-3" placeholder="e.g. +91 9999999999" /></Form.Item>
          </div>
          <Form.Item name="description" label={<span className="text-[10px] font-black uppercase tracking-widest">Mission Description</span>} rules={[{ required: true }]}><Input.TextArea rows={4} className="!rounded-2xl !py-3" placeholder="Outline the core responsibilities and requirements..." /></Form.Item>
          <Form.Item name="isActive" valuePropName="checked"><div className="flex items-center gap-4 p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100"><Switch defaultChecked /><span className="text-[10px] font-black uppercase tracking-widest">Synchronize to Global Board</span></div></Form.Item>
          <div className="flex gap-4 pt-8">
            <Button onClick={() => setIsModalOpen(false)} className="flex-1 !h-14 !rounded-2xl !font-black !uppercase !tracking-widest !text-[10px]">Abort</Button>
            <Button type="primary" htmlType="submit" loading={submitting} className="flex-[2] !h-14 !rounded-2xl !font-black !uppercase !tracking-widest !text-[10px] !bg-[#07518a]">Execute Save</Button>
          </div>
        </Form>
      </Modal>

      <style jsx global>{`
        .ant-modal-content { border-radius: 3rem !important; padding: 40px !important; }
        .ant-modal-header { margin-bottom: 24px !important; }
        .ant-switch-checked { background-color: #07518a !important; }
      `}</style>

      {/* Sidebar Toggle (Floating) */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{ position: "fixed", top: 82, left: SW - 14, width: 28, height: 28, background: "#fff", border: "1px solid #E2E8F0", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", zIndex: 1001, transition: "left 0.28s cubic-bezier(0.4,0,0.2,1)", padding: 0 }}
      >
        {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
      </button>

    </div>
  );
}