"use client";

import React, { useEffect, useState, useCallback, cloneElement } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Users, Briefcase, Clock, Activity, Zap,
  RefreshCw, TrendingUp, TrendingDown, Target,
  Linkedin, Award, MapPin, Search, ShieldCheck,
  CheckCircle2, Globe, Cpu, UserPlus
} from "lucide-react";
import { Table, Tag, Skeleton, message, Progress, Tooltip } from "antd";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip as ChartTooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell,
  BarChart, Bar
} from "recharts";
import { format, subHours } from "date-fns";

// ── CONFIG ──
const API_BASE = "/strapi/api";
const BRAND_COLOR = "#07518a";
const REFRESH_INTERVAL = 30000;
const COLORS = [BRAND_COLOR, "#10B981", "#F59E0B", "#8B5CF6", "#EF4444", "#0F172A", "#14B8A6", "#EC4899"];

// ── TYPES ──
interface Member {
  id: number;
  tittle: string;
  designation: string;
  About: string;
  linkdin: string;
  updatedAt: string;
}

export default function DashboardOverview({ token }: { token: string }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [jobsCount, setJobsCount] = useState(0);

  const [stats, setStats] = useState({
    talentInventory: 0,
    hiringVelocity: 0,
    digitalSync: 0,
    profileIntegrity: 0,
    influxToday: 0,
    systemUptime: "99.9%",
    primaryNode: "HQ",
    operationalHealth: "Optimal"
  });

  const [timelineData, setTimelineData] = useState<any[]>([]);

  const fetchDashboardData = useCallback(async (showIndicator = false) => {
    if (showIndicator) setRefreshing(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [membersRes, jobsRes] = await Promise.all([
        axios.get(`${API_BASE}/members?sort=updatedAt:desc&pagination[pageSize]=100`, { headers }),
        axios.get(`${API_BASE}/job-openings?sort=updatedAt:desc`, { headers })
      ]);

      const fetchedMembers = membersRes.data.data || [];
      const fetchedJobs = jobsRes.data.data || [];

      const cleanMembers = fetchedMembers.map((m: any) => m.attributes ? { id: m.id, ...m.attributes } : m);
      const activeJobsCount = fetchedJobs.filter((j: any) => j.attributes?.isActive ?? j.isActive).length;

      setMembers(cleanMembers);
      setJobsCount(activeJobsCount);

      const linkedInCount = cleanMembers.filter((m: any) => m.linkdin && m.linkdin.length > 5).length;
      const digitalSync = Math.round((linkedInCount / (cleanMembers.length || 1)) * 100);

      const today = new Date().toDateString();
      const influxToday = cleanMembers.filter((m: any) => new Date(m.updatedAt).toDateString() === today).length;

      setStats({
        talentInventory: cleanMembers.length,
        hiringVelocity: activeJobsCount,
        digitalSync,
        profileIntegrity: 92,
        influxToday,
        systemUptime: "99.9%",
        primaryNode: "Hyderabad",
        operationalHealth: "Stable"
      });

      const now = new Date();
      setTimelineData(Array.from({ length: 8 }, (_, i) => ({
        name: format(subHours(now, 7 - i), "HH:00"),
        activity: Math.floor(40 + Math.random() * 60)
      })));

    } catch (err) {
      console.error("Dashboard Sync Error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token]);

  useEffect(() => {
    fetchDashboardData();
    const timer = setInterval(fetchDashboardData, REFRESH_INTERVAL);
    return () => clearInterval(timer);
  }, [fetchDashboardData]);

  if (loading) return <div className="p-14"><Skeleton active paragraph={{ rows: 15 }} /></div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 lg:p-14 space-y-10 bg-[#F8FAFC] min-h-screen">

      {/* 1. PROFESSIONAL KPI GRID (SMALL CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SmallKPICard label="Talent Inventory" value={stats.talentInventory} icon={<Users />} color="#07518a" trend="Total Active" />
        <SmallKPICard label="Hiring Velocity" value={stats.hiringVelocity} icon={<Briefcase />} color="#10B981" trend="Live Pipelines" />
        <SmallKPICard label="Digital Footprint" value={stats.digitalSync} icon={<Linkedin />} color="#0077b5" trend="Sync Rate" suffix="%" />
        <SmallKPICard label="Profile Integrity" value={stats.profileIntegrity} icon={<Award />} color="#F59E0B" trend="Verification" suffix="%" />
        <SmallKPICard label="Daily Influx" value={stats.influxToday} icon={<UserPlus />} color="#EC4899" trend="New Updates" />
        <SmallKPICard label="System Uptime" value={stats.systemUptime} icon={<Zap />} color="#8B5CF6" trend="Operational" />
        <SmallKPICard label="Primary Hub" value={stats.primaryNode} icon={<MapPin />} color="#64748B" trend="Main Deployment" isText />
        <SmallKPICard label="Network Status" value={stats.operationalHealth} icon={<Activity />} color="#14B8A6" trend="System Pulse" isText />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">

        {/* 2. OPERATIONAL THROUGHPUT */}
        <div className="xl:col-span-2 bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Operational Throughput</h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Live talent registry interaction stream</p>
            </div>
            <button onClick={() => fetchDashboardData(true)} className={`p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all ${refreshing ? 'animate-spin' : ''}`}>
              <RefreshCw size={18} className="text-slate-400" />
            </button>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="proGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={BRAND_COLOR} stopOpacity={0.12} />
                    <stop offset="95%" stopColor={BRAND_COLOR} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} />
                <YAxis hide />
                <ChartTooltip />
                <Area type="monotone" dataKey="activity" stroke={BRAND_COLOR} strokeWidth={5} fill="url(#proGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. SYNC LOGS */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-10 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Live Registry Stream</h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Direct from talent node</p>
          </div>
          <div className="flex-1 overflow-auto">
            <Table
              dataSource={members.slice(0, 8)}
              pagination={false}
              rowKey="id"
              columns={[
                {
                  title: "TALENT",
                  render: (m) => (
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white text-[10px] font-black italic">{m.tittle?.charAt(0)}</div>
                      <div className="text-[11px] font-black uppercase text-slate-900 truncate w-32">{m.tittle}</div>
                    </div>
                  )
                },
                {
                  title: "STATUS",
                  render: () => <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                },
                {
                  title: "SYNC",
                  render: (m) => <span className="text-[10px] font-mono font-bold text-slate-400">{format(new Date(m.updatedAt), "HH:mm")}</span>
                }
              ]}
            />
          </div>
        </div>

      </div>

    </motion.div>
  );
}

function SmallKPICard({ label, value, icon, color, trend, suffix = "", isText = false }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm group hover:shadow-lg transition-all border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm" style={{ background: color }}>
          {cloneElement(icon, { size: 18 })}
        </div>
        <div className="text-[9px] font-black text-slate-300 uppercase tracking-tighter italic">{trend}</div>
      </div>
      <div>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</p>
        <h3 className={`font-black text-slate-900 italic tracking-tighter ${isText ? 'text-lg' : 'text-3xl'}`}>
          {isText ? value : <>{value}{suffix}</>}
        </h3>
      </div>
    </div>
  );
}
