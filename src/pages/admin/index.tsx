"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { 
  FileText, 
  Briefcase, 
  Settings, 
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X
} from "lucide-react";
import { 
  fetchAdminServices, 
  fetchAdminProjects, 
  fetchAdminContent,
  updateService,
  updateProject,
  updateContent
} from "@/lib/api";

interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
  order: number;
  visible: boolean;
}

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  liveDemo?: string;
  github?: string;
  order: number;
  visible: boolean;
}

type Tab = "services" | "projects" | "content" | "settings";

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("services");
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [content, setContent] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Service | Project | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
      return;
    }
    loadData();
  }, [token]);

  const loadData = async () => {
    try {
      const [srv, proj, cont] = await Promise.all([
        fetchAdminServices(token!),
        fetchAdminProjects(token!),
        fetchAdminContent(token!),
      ]);
      setServices(srv);
      setProjects(proj);
      setContent(cont);
    } catch (err) {
      console.error("Failed to load data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
  };

  const handleSaveService = async () => {
    if (!editData || !token) return;
    setSaving(true);
    try {
      await updateService(token, editData);
      await loadData();
      setEditingId(null);
      setEditData(null);
    } catch (err) {
      console.error("Failed to save:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveProject = async () => {
    if (!editData || !token) return;
    setSaving(true);
    try {
      await updateProject(token, editData);
      await loadData();
      setEditingId(null);
      setEditData(null);
    } catch (err) {
      console.error("Failed to save:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleVisibility = async (type: "service" | "project", id: number, current: boolean) => {
    if (!token) return;
    const data = { id, visible: !current };
    try {
      if (type === "service") {
        await updateService(token, data);
      } else {
        await updateProject(token, data);
      }
      await loadData();
    } catch (err) {
      console.error("Failed to toggle:", err);
    }
  };

  const startEdit = (item: Service | Project) => {
    setEditingId(item.id);
    setEditData(item);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
        <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#141414] border-r border-white/10 p-6 flex flex-col">
        <h2 className="text-xl font-bold font-[family-name:var(--font-syne)] text-white mb-8">
          Admin Panel
        </h2>
        
        <nav className="flex-1 space-y-2">
          {[
            { id: "services" as Tab, icon: FileText, label: "Services" },
            { id: "projects" as Tab, icon: Briefcase, label: "Projects" },
            { id: "content" as Tab, icon: Settings, label: "Content" },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                tab === id
                  ? "bg-white text-black"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {tab === "services" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Services</h2>
            </div>

            <div className="space-y-4">
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  className="bg-[#141414] border border-white/10 rounded-xl p-4"
                >
                  {editingId === service.id ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={editData?.title || ""}
                        onChange={(e) => setEditData({ ...editData!, title: e.target.value })}
                        className="w-full px-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-white"
                        placeholder="Title"
                      />
                      <textarea
                        value={editData?.description || ""}
                        onChange={(e) => setEditData({ ...editData!, description: e.target.value })}
                        className="w-full px-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-white"
                        placeholder="Description"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveService}
                          disabled={saving}
                          className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg"
                        >
                          <Save className="w-4 h-4" />
                          {saving ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-white font-semibold">{service.title}</h3>
                        <p className="text-[#A3A3A3] text-sm mt-1">{service.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggleVisibility("service", service.id, service.visible)}
                          className="p-2 text-[#525252] hover:text-white transition-colors"
                        >
                          {service.visible ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => startEdit(service)}
                          className="p-2 text-[#525252] hover:text-white transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {tab === "projects" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Projects</h2>
            </div>

            <div className="grid gap-4">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  className="bg-[#141414] border border-white/10 rounded-xl p-4"
                >
                  {editingId === project.id ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={editData?.title || ""}
                        onChange={(e) => setEditData({ ...editData!, title: e.target.value })}
                        className="w-full px-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-white"
                        placeholder="Title"
                      />
                      <textarea
                        value={editData?.description || ""}
                        onChange={(e) => setEditData({ ...editData!, description: e.target.value })}
                        className="w-full px-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-white"
                        placeholder="Description"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveProject}
                          disabled={saving}
                          className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg"
                        >
                          <Save className="w-4 h-4" />
                          {saving ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-white font-semibold">{project.title}</h3>
                        <p className="text-[#A3A3A3] text-sm mt-1">{project.description}</p>
                        <div className="flex gap-2 mt-2">
                          {project.techStack?.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggleVisibility("project", project.id, project.visible)}
                          className="p-2 text-[#525252] hover:text-white transition-colors"
                        >
                          {project.visible ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => startEdit(project)}
                          className="p-2 text-[#525252] hover:text-white transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {tab === "content" && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Site Content</h2>
            <p className="text-[#A3A3A3]">
              Content editing coming soon. Edit content directly in the JSON files or via API.
            </p>
          </div>
        )}

        {tab === "settings" && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
            <p className="text-[#A3A3A3]">
              Settings management coming soon.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}