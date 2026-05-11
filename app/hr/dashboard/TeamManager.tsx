"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  DndContext, DragEndEvent, DragOverlay, DragStartEvent,
  KeyboardSensor, PointerSensor, closestCenter,
  defaultDropAnimationSideEffects, useSensor, useSensors,
} from "@dnd-kit/core";
import {
  SortableContext, arrayMove, rectSortingStrategy,
  sortableKeyboardCoordinates, useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import axios from "axios";
import {
  AlertCircle, CheckCircle2, Edit3, GripVertical,
  Image as ImageIcon, Linkedin, Loader2, LogOut,
  Plus, Redo2, Save, Trash2, Undo2, X, Search, Filter, ArrowUpRight
} from "lucide-react";
import { Button, Form, Input, Modal, Switch, Tooltip, Upload, message } from "antd";

// ─── CONFIG ────────────────────────────────────────────────────────────────────
const API = "/strapi/api/members";
const UPLOAD = "/strapi/api/upload";
const ASSETS = "/strapi";
const BACKEND_URL = "http://183.82.117.36:2334";
const LOGO_SRC = "/highbtlogo-tm-1.png";

// ─── TYPES ─────────────────────────────────────────────────────────────────────
interface Member {
  id: string;
  numericId?: number;
  name: string;
  designation: string;
  bio: string;
  linkedin: string;
  photo: string;
  order: number;
}

// ─── HELPERS ───────────────────────────────────────────────────────────────────
const photoUrl = (p: string) => {
  if (!p) return "https://ui-avatars.com/api/?name=Team+Member&background=6366f1&color=fff";
  if (p.startsWith("http")) return p.replace(BACKEND_URL, ASSETS).replace("http://localhost:1337", ASSETS);
  if (p.startsWith("/")) return `${ASSETS}${p}`;
  return p;
};

const authHeader = () => {
  const t = typeof window !== "undefined" ? localStorage.getItem("hr_token") : null;
  if (!t || t === "undefined" || t.length > 5000) return {};
  return { headers: { Authorization: `Bearer ${t.trim()}` } };
};

// ─── MEMBER CARD ───────────────────────────────────────────────────────────────
function MemberCard({
  member, dragMode, isOverlay, onEdit, onDelete, dndRef, dndStyle, dragAttr, dragListeners,
}: any) {
  return (
    <div
      ref={dndRef}
      style={dndStyle}
      className={`
        relative group rounded-3xl overflow-hidden bg-white border border-slate-200 
        transition-all duration-300 ease-out h-[420px]
        ${isOverlay ? "shadow-2xl ring-4 ring-indigo-500/20 scale-[1.02] z-50" : "hover:shadow-2xl hover:-translate-y-1"}
      `}
    >
      {/* Photo Container */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={photoUrl(member.photo)}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
          draggable={false}
        />
        {/* Glass Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white uppercase tracking-wider">
              #{member.order + 1}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">{member.name || "Untitled Member"}</h3>
          <p className="text-indigo-200/90 text-xs font-semibold uppercase tracking-widest line-clamp-1 mb-4">{member.designation || "Executive"}</p>

          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <button
              onClick={onEdit}
              className="flex-1 bg-white/10 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md border border-white/20 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <Edit3 size={14} /> Edit
            </button>
            <button
              onClick={onDelete}
              className="w-11 h-11 bg-red-500/20 hover:bg-red-500 text-white backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center transition-all"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Drag Handle */}
      {dragMode && !isOverlay && (
        <div
          {...(dragAttr ?? {})}
          {...(dragListeners ?? {})}
          className="absolute top-4 right-4 z-50 p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white cursor-grab active:cursor-grabbing hover:bg-white hover:text-slate-900 transition-all shadow-xl"
        >
          <GripVertical size={20} />
        </div>
      )}

      {/* External Link */}
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 left-4 p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-blue-500 transition-all opacity-0 group-hover:opacity-100"
        >
          <Linkedin size={18} />
        </a>
      )}
    </div>
  );
}

// ─── SORTABLE WRAPPER ──────────────────────────────────────────────────────────
function SortableCard(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: props.member.id, disabled: !props.dragMode });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition: isDragging ? "none" : transition,
    zIndex: isDragging ? 100 : 1,
  };

  return (
    <MemberCard
      {...props}
      dndRef={setNodeRef}
      dndStyle={style}
      dragAttr={attributes}
      dragListeners={listeners}
      isDragging={isDragging}
    />
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function TeamManager() {
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [dragMode, setDragMode] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState("");
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const membersRef = useRef<Member[]>([]);
  useEffect(() => { membersRef.current = members; }, [members]);

  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [history, setHistory] = useState<{ past: Member[][], future: Member[][] }>({ past: [], future: [] });

  // ── Fetch Registry ──
  const fetchMembers = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}?populate=image&sort=order:asc&pagination[pageSize]=100`, authHeader());
      const mapped = (data.data || []).map((m: any, i: number) => {
        const a = m.attributes || m;
        return {
          id: m.documentId || String(m.id),
          numericId: m.id,
          name: a.tittle || a.name || "",
          designation: a.designation || "",
          bio: a.About || a.bio || "",
          linkedin: a.linkdin || a.linkedin || "",
          photo: a.image?.url || a.image?.data?.attributes?.url || "",
          order: a.order ?? i,
        };
      }).sort((a: any, b: any) => a.order - b.order);
      setMembers(mapped);
    } catch (err) {
      console.error(err);
      message.error("Failed to sync with Strapi");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("hr_token")) { router.push("/hr/login"); return; }
    fetchMembers();
  }, [fetchMembers, router]);

  // ── Sync Logic ──
  const performSync = useCallback(async (reordered: Member[]) => {
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    setSyncing(true);
    try {
      const indexMap = new Map(reordered.map((m, i) => [m.id, i]));
      const chunk = (arr: any[], size: number) => Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));
      const chunks = chunk(reordered, 8);

      // Phase 1: Temp Offsets to avoid unique key collisions
      for (const c of chunks) {
        await Promise.all(c.map(m => axios.put(`${API}/${m.id}`, { data: { order: 10000 + (indexMap.get(m.id) ?? 0) } }, authHeader())));
      }
      // Phase 2: Actual Order
      for (const c of chunks) {
        await Promise.all(c.map(m => axios.put(`${API}/${m.id}`, { data: { order: indexMap.get(m.id) ?? 0 } }, authHeader())));
      }
      message.success({ content: "Registry Order Synchronized", key: "sync" });
    } catch (err) {
      message.error("Sync failed. Check console for details.");
      fetchMembers();
    } finally {
      setSyncing(false);
    }
  }, [fetchMembers]);

  // ── Handlers ──
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveId(null);
    if (!over || active.id === over.id) return;
    const oldIdx = members.findIndex(m => m.id === active.id);
    const newIdx = members.findIndex(m => m.id === over.id);
    const reordered = arrayMove(members, oldIdx, newIdx).map((m, i) => ({ ...m, order: i }));
    setHistory(h => ({ past: [...h.past, members].slice(-10), future: [] }));
    setMembers(reordered);
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    syncTimeoutRef.current = setTimeout(() => performSync(reordered), 1200);
  };

  const handleSave = async (values: any) => {
    setSyncing(true);
    const original = [...members];
    try {
      let imageId = null;
      if (fileList.length && fileList[0].originFileObj) {
        const fd = new FormData();
        fd.append("files", fileList[0].originFileObj);
        const { data } = await axios.post(UPLOAD, fd, authHeader());
        imageId = data[0]?.id;
      }

      const payload = {
        data: {
          tittle: values.name,
          designation: values.designation,
          About: values.bio,
          linkdin: values.linkedin,
          order: editing ? editing.order : (members.length > 0 ? Math.max(...members.map(m => m.order)) + 1 : 0),
          ...(imageId ? { image: imageId } : {}),
        }
      };

      if (editing) {
        await axios.put(`${API}/${editing.id}`, payload, authHeader());
      } else {
        await axios.post(API, payload, authHeader());
      }
      setModalOpen(false);
      fetchMembers();
    } catch (err) {
      setMembers(original);
      message.error("Save failed.");
    } finally {
      setSyncing(false);
    }
  };

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999]">
      <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
      <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Initializing Registry</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">

      {/* ── Top Navigation Bar ── */}
      <nav className="sticky top-0 z-[1000] bg-white/80 backdrop-blur-2xl border-b border-slate-200 px-6 py-4">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Logo & Info */}
          <div className="flex items-center gap-6">
            <img
              src={LOGO_SRC}
              alt="Logo"
              className="h-10 w-auto object-contain"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
            <div className="h-8 w-px bg-slate-200 hidden md:block" />
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-900">Team Registry</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`w-2 h-2 rounded-full ${syncing ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {members.length} Total Records {syncing && "• Syncing Changes"}
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative group flex-1 md:flex-none md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
              <input
                type="text"
                placeholder="Search registry..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              <button
                onClick={() => setDragMode(!dragMode)}
                className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${dragMode ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-white hover:text-slate-900'}`}
              >
                Reorder Mode
              </button>
            </div>

            <button
              onClick={() => { setEditing(null); form.resetFields(); setFileList([]); setModalOpen(true); }}
              className="px-6 py-2.5 bg-slate-900 text-white rounded-2xl text-sm font-bold shadow-xl shadow-slate-900/10 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Plus size={18} /> Add New
            </button>

            <button
              onClick={() => { localStorage.removeItem("hr_token"); router.push("/hr/login"); }}
              className="w-11 h-11 flex items-center justify-center bg-red-50 text-red-500 rounded-2xl border border-red-100 hover:bg-red-100 transition-all"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Main Content Area ── */}
      <main className="max-w-[1800px] mx-auto px-6 py-10">

        {/* Banner Section */}
        <div className="mb-10 bg-indigo-600 rounded-[2.5rem] p-10 relative overflow-hidden shadow-2xl shadow-indigo-200 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 max-w-xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Management Dashboard</span>
            <h2 className="text-4xl font-black text-white mb-4 leading-tight">Master Your <br /> Corporate Identity</h2>
            <p className="text-indigo-100/80 font-medium leading-relaxed">Organize, customize, and synchronize your professional team registry with our ultra-low latency administrative engine.</p>
          </div>
          <div className="relative z-10 flex gap-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-center w-32">
              <div className="text-3xl font-black text-white mb-1">{members.length}</div>
              <div className="text-[10px] font-bold text-indigo-100 uppercase tracking-widest">Profiles</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-center w-32">
              <div className="text-3xl font-black text-white mb-1">{members.filter(m => m.photo).length}</div>
              <div className="text-[10px] font-bold text-indigo-100 uppercase tracking-widest">Active Photos</div>
            </div>
          </div>
        </div>

        {/* Registry Grid */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={(e) => setActiveId(e.active.id as string)}
          onDragEnd={onDragEnd}
        >
          <SortableContext items={filteredMembers.map(m => m.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
              <AnimatePresence>
                {filteredMembers.map((m) => (
                  <motion.div
                    key={m.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <SortableCard
                      member={m}
                      dragMode={dragMode}
                      onEdit={() => {
                        setEditing(m);
                        form.setFieldsValue({ name: m.name, designation: m.designation, bio: m.bio, linkedin: m.linkedin });
                        setFileList(m.photo ? [{ uid: "-1", name: "photo", status: "done", url: photoUrl(m.photo) }] : []);
                        setModalOpen(true);
                      }}
                      onDelete={() => {
                        Modal.confirm({
                          title: 'Remove Profile?',
                          content: `Are you sure you want to delete ${m.name}? This will permanently remove them from the registry.`,
                          okText: 'Delete',
                          okType: 'danger',
                          cancelText: 'Cancel',
                          className: 'pro-modal',
                          onOk: async () => {
                            try {
                              await axios.delete(`${API}/${m.id}`, authHeader());
                              message.success("Profile Removed");
                              fetchMembers();
                            } catch (err) {
                              message.error("Delete failed");
                            }
                          }
                        });
                      }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </SortableContext>

          <DragOverlay adjustScale={false} dropAnimation={{ sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: "0.5" } } }) }}>
            {activeId ? (
              <div className="h-[420px] w-full">
                <MemberCard member={members.find(m => m.id === activeId)} dragMode={false} isOverlay />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

        {/* Empty State */}
        {!loading && filteredMembers.length === 0 && (
          <div className="py-32 flex flex-col items-center justify-center bg-white rounded-[3rem] border border-slate-200 border-dashed">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
              <ImageIcon size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No matching profiles found</h3>
            <p className="text-slate-500 mb-8 max-w-sm text-center">We couldn't find any registry entries matching your current filters or search terms.</p>
            <button onClick={() => setSearchTerm("")} className="px-6 py-2.5 bg-indigo-600 text-white rounded-2xl text-sm font-bold">Clear Search</button>
          </div>
        )}
      </main>

      {/* ── Modal Component ── */}
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={640}
        centered
        closeIcon={null}
        styles={{ body: { padding: 0 }, mask: { backdropFilter: 'blur(8px)', backgroundColor: 'rgba(15, 23, 42, 0.4)' } }}
        className="rounded-[2.5rem] overflow-hidden"
      >
        <div className="p-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-slate-900">{editing ? 'Modify Profile' : 'Register Member'}</h2>
              <p className="text-sm font-medium text-slate-400 mt-1">Configure professional identity details.</p>
            </div>
            <button onClick={() => setModalOpen(false)} className="w-12 h-12 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-2xl transition-all">
              <X size={20} />
            </button>
          </div>

          <Form form={form} layout="vertical" onFinish={handleSave} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Form.Item label={<span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Legal Name</span>} name="name" rules={[{ required: true, message: 'Required' }]}>
                <Input placeholder="e.g. John Doe" className="h-12 rounded-2xl bg-slate-50 border-slate-200 focus:ring-indigo-500 focus:border-indigo-500" />
              </Form.Item>
              <Form.Item label={<span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Designation</span>} name="designation">
                <Input placeholder="e.g. Lead Developer" className="h-12 rounded-2xl bg-slate-50 border-slate-200" />
              </Form.Item>
            </div>

            <Form.Item label={<span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">LinkedIn Profile</span>} name="linkedin">
              <Input prefix={<Linkedin size={16} className="text-blue-600 mr-2" />} placeholder="https://linkedin.com/in/..." className="h-12 rounded-2xl bg-slate-50 border-slate-200" />
            </Form.Item>

            <Form.Item label={<span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Professional Summary</span>} name="bio">
              <Input.TextArea rows={4} className="rounded-2xl bg-slate-50 border-slate-200 resize-none" maxLength={1500} showCount />
            </Form.Item>

            <Form.Item label={<span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Identity Image</span>}>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={({ fileList }) => setFileList(fileList)}
                beforeUpload={() => false}
                maxCount={1}
                className="pro-upload"
              >
                {fileList.length === 0 && (
                  <div className="flex flex-col items-center">
                    <Plus size={24} className="text-indigo-600 mb-2" />
                    <span className="text-[10px] font-bold text-slate-500">Upload</span>
                  </div>
                )}
              </Upload>
            </Form.Item>

            <div className="flex gap-4 pt-4">
              <button type="button" onClick={() => setModalOpen(false)} className="flex-1 h-14 rounded-2xl bg-slate-100 text-slate-900 font-bold hover:bg-slate-200 transition-all">Cancel</button>
              <button type="submit" disabled={syncing} className="flex-[2] h-14 rounded-2xl bg-indigo-600 text-white font-bold shadow-xl shadow-indigo-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                {syncing ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                {editing ? 'Update Profile' : 'Confirm Registry'}
              </button>
            </div>
          </Form>
        </div>
      </Modal>

      {/* Global Sync Notification */}
      <AnimatePresence>
        {syncing && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[2000] bg-slate-900 text-white px-8 py-4 rounded-[2rem] shadow-2xl flex items-center gap-4 border border-white/10 backdrop-blur-xl"
          >
            <Loader2 className="animate-spin text-indigo-400" size={18} />
            <span className="text-[11px] font-black uppercase tracking-[0.2em]">Synchronizing Backend Core</span>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .ant-upload-select, .ant-upload-list-item-container {
          width: 110px !important;
          height: 110px !important;
          border-radius: 2rem !important;
        }
        .ant-upload-select {
          background-color: #f8fafc !important;
          border: 2px dashed #e2e8f0 !important;
        }
        .ant-upload-select:hover {
          border-color: #6366f1 !important;
        }
      `}</style>
    </div>
  );
}