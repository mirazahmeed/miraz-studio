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
  X,
  MessageSquare
} from "lucide-react";
import { 
  fetchAdminServices, 
  fetchAdminProjects, 
  fetchAdminContent,
  updateService,
  updateProject,
  updateContent,
  createProject,
  deleteProject,
  fetchContent
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

type Tab = "services" | "projects" | "content" | "contact" | "settings";

function isProject(item: Service | Project | null): item is Project {
  return !!item && 'image' in item && 'techStack' in item;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("services");
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [content, setContent] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | "new" | null>(null);
  const [editData, setEditData] = useState<Service | Project | null>(null);
  const [contactData, setContactData] = useState({
    title: "",
    subtitle: "",
    description: "",
    info: [] as { label: string; value: string }[],
  });
  const [contactSaving, setContactSaving] = useState(false);

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
      
      const siteContent = await fetchContent();
      if (siteContent.contact) {
        setContactData(siteContent.contact);
      }
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
      // If id is 0, it's a new project
      if (editData.id === 0) {
        await createProject(token, editData);
      } else {
        await updateProject(token, editData);
      }
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

  const handleDeleteProject = async (id: number) => {
    if (!token) return;
    try {
      await deleteProject(token, id);
      await loadData();
    } catch (err) {
      console.error("Failed to delete project:", err);
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

  const handleSaveContact = async () => {
    if (!token) return;
    setContactSaving(true);
    try {
      await updateContent(token, "contact", contactData);
      alert("Contact section saved successfully!");
    } catch (err) {
      console.error("Failed to save contact:", err);
      alert("Failed to save contact section");
    } finally {
      setContactSaving(false);
    }
  };

  const handleAddContactInfo = () => {
    setContactData({
      ...contactData,
      info: [...contactData.info, { label: "New Field", value: "" }],
    });
  };

  const handleRemoveContactInfo = (index: number) => {
    setContactData({
      ...contactData,
      info: contactData.info.filter((_, i) => i !== index),
    });
  };

  const handleUpdateContactInfo = (index: number, field: "label" | "value", value: string) => {
    const newInfo = [...contactData.info];
    newInfo[index] = { ...newInfo[index], [field]: value };
    setContactData({ ...contactData, info: newInfo });
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
            { id: "contact" as Tab, icon: MessageSquare, label: "Contact" },
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
              <button
                onClick={() => {
                  setEditingId('new');
                  setEditData({
                    id: 0,
                    title: '',
                    description: '',
                    techStack: [],
                    image: '',
                    liveDemo: '',
                    github: '',
                    order: 0,
                    visible: true
                  } as Service | Project);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg"
              >
                <Plus className="w-4 h-4" />
                New Project
              </button>
            </div>

            <div className="grid gap-4">
              {editingId === 'new' && editData && (
                <motion.div
                  className="bg-[#141414] border border-white/10 rounded-xl p-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="space-y-4">
                    <h3 className="text-white font-semibold text-lg">New Project</h3>
                    <div>
                      <label className="block text-white/70 text-sm mb-1">Title</label>
                      <input
                        type="text"
                        value={editData.title || ""}
                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                        className="w-full px-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-white"
                        placeholder="Project Title"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-1">Description</label>
                      <textarea
                        value={editData.description || ""}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        className="w-full px-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-white"
                        placeholder="Project Description"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-1">Image URL</label>
                      <input
                        type="text"
                        value={(editData as Project).image || ""}
                        onChange={(e) => setEditData({ ...editData, image: e.target.value } as Service | Project)}
                        className="w-full px-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-white"
                        placeholder="https://example.com/image.jpg"
                      />
                      {(editData as Project).image && (
                        <img src={(editData as Project).image} alt="Preview" className="mt-2 h-32 object-cover rounded-lg" />
                      )}
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-1">Tech Stack (comma-separated)</label>
                      <input
                        type="text"
                        value={(editData as Project).techStack?.join(", ") || ""}
                        onChange={(e) => setEditData({ ...editData, techStack: e.target.value.split(",").map(t => t.trim()).filter(Boolean) } as Service | Project)}
                        className="w-full px-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-white"
                        placeholder="React, Node.js, PostgreSQL"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-1">Live Demo URL</label>
                      <input
                        type="text"
                        value={(editData as Project).liveDemo || ""}
                        onChange={(e) => setEditData({ ...editData, liveDemo: e.target.value } as Service | Project)}
                        className="w-full px-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-white"
                        placeholder="https://example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-1">GitHub URL</label>
                      <input
                        type="text"
                        value={(editData as Project).github || ""}
                        onChange={(e) => setEditData({ ...editData, github: e.target.value } as Service | Project)}
                        className="w-full px-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-white"
                        placeholder="https://github.com/username/repo"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-1">Order</label>
                      <input
                        type="number"
                        value={(editData as Project).order || 0}
                        onChange={(e) => setEditData({ ...editData, order: parseInt(e.target.value) || 0 } as Service | Project)}
                        className="w-full px-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-white"
                        placeholder="0"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={(editData as Project).visible || false}
                        onChange={(e) => setEditData({ ...editData, visible: e.target.checked } as Service | Project)}
                        className="w-4 h-4"
                        id="visible-new"
                      />
                      <label htmlFor="visible-new" className="text-white/70 text-sm">Visible</label>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveProject}
                        disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg"
                      >
                        <Save className="w-4 h-4" />
                        {saving ? "Saving..." : "Create Project"}
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setEditData(null);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  className="bg-[#141414] border border-white/10 rounded-xl p-4"
                >
                  {editingId === project.id ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Title</label>
                        <input
                          type="text"
                          value={editData?.title || ""}
                          onChange={(e) => setEditData({ ...editData!, title: e.target.value })}
                          className="w-full px-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-white"
                          placeholder="Project Title"
                        />
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-1">Description</label>
                        <textarea
                          value={editData?.description || ""}
                          onChange={(e) => setEditData({ ...editData!, description: e.target.value })}
                          className="w-full px-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-white"
                          placeholder="Project Description"
                          rows={3}
                        />
                      </div>
                      {isProject(editData) && (
                        <>
                          <div>
                            <label className="block text-white/70 text-sm mb-1">Image URL</label>
                            <input
                              type="text"
                              value={(editData as Project).image || ""}
                              onChange={(e) => setEditData({ ...editData!, image: e.target.value } as Service | Project)}
                              className="w-full px-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-white"
                              placeholder="https://example.com/image.jpg"
                            />
                            {(editData as Project).image && (
                              <img src={(editData as Project).image} alt="Preview" className="mt-2 h-32 object-cover rounded-lg" />
                            )}
                          </div>
                          <div>
                            <label className="block text-white/70 text-sm mb-1">Tech Stack (comma-separated)</label>
                            <input
                              type="text"
                              value={(editData as Project).techStack?.join(", ") || ""}
                              onChange={(e) => setEditData({ ...editData!, techStack: e.target.value.split(",").map(t => t.trim()).filter(Boolean) } as Service | Project)}
                              className="w-full px-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-white"
                              placeholder="React, Node.js, PostgreSQL"
                            />
                          </div>
                          <div>
                            <label className="block text-white/70 text-sm mb-1">Live Demo URL</label>
                            <input
                              type="text"
                              value={(editData as Project).liveDemo || ""}
                              onChange={(e) => setEditData({ ...editData!, liveDemo: e.target.value } as Service | Project)}
                              className="w-full px-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-white"
                              placeholder="https://example.com"
                            />
                          </div>
                          <div>
                            <label className="block text-white/70 text-sm mb-1">GitHub URL</label>
                            <input
                              type="text"
                              value={(editData as Project).github || ""}
                              onChange={(e) => setEditData({ ...editData!, github: e.target.value } as Service | Project)}
                              className="w-full px-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-white"
                              placeholder="https://github.com/username/repo"
                            />
                          </div>
                          <div>
                            <label className="block text-white/70 text-sm mb-1">Order</label>
                            <input
                              type="number"
                              value={(editData as Project).order || 0}
                              onChange={(e) => setEditData({ ...editData!, order: parseInt(e.target.value) || 0 } as Service | Project)}
                              className="w-full px-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-white"
                              placeholder="0"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={(editData as Project).visible || false}
                              onChange={(e) => setEditData({ ...editData!, visible: e.target.checked } as Service | Project)}
                              className="w-4 h-4"
                              id="visible"
                            />
                            <label htmlFor="visible" className="text-white/70 text-sm">Visible</label>
                          </div>
                        </>
                      )}
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
                    <div className="flex gap-4">
                      {'image' in project && project.image && (
                        <div className="w-32 h-24 flex-shrink-0">
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      )}
                      <div className="flex-1">
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
                            {(project.liveDemo || project.github) && (
                              <div className="flex gap-3 mt-2 text-xs">
                                {project.liveDemo && (
                                  <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                                    Live Demo ↗
                                  </a>
                                )}
                                {project.github && (
                                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                                    GitHub ↗
                                  </a>
                                )}
                              </div>
                            )}
                            <p className="text-white/30 text-xs mt-2">Order: {project.order}</p>
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
                            <button
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this project?')) {
                                  handleDeleteProject(project.id);
                                }
                              }}
                              className="p-2 text-[#dc2626] hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
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

        {tab === "contact" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Contact Section</h2>
              <button
                onClick={handleSaveContact}
                disabled={contactSaving}
                className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg"
              >
                <Save className="w-4 h-4" />
                {contactSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>

            <div className="space-y-6 max-w-2xl">
              <div className="bg-[#141414] border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">Header Content</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-1">Title</label>
                    <input
                      type="text"
                      value={contactData.title}
                      onChange={(e) => setContactData({ ...contactData, title: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-white"
                      placeholder="Get in Touch"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={contactData.subtitle}
                      onChange={(e) => setContactData({ ...contactData, subtitle: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-white"
                      placeholder="Let's work together"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-1">Description</label>
                    <textarea
                      value={contactData.description}
                      onChange={(e) => setContactData({ ...contactData, description: e.target.value })}
                      className="w-full px-4 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-white"
                      placeholder="Description text"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#141414] border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-semibold">Contact Info</h3>
                  <button
                    onClick={handleAddContactInfo}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-white/10 text-white rounded-lg hover:bg-white/20"
                  >
                    <Plus className="w-4 h-4" />
                    Add Field
                  </button>
                </div>
                <div className="space-y-4">
                  {contactData.info.map((item, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="flex-1">
                        <label className="block text-white/50 text-xs mb-1">Label</label>
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => handleUpdateContactInfo(index, "label", e.target.value)}
                          className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-white text-sm"
                          placeholder="Email"
                        />
                      </div>
                      <div className="flex-[2]">
                        <label className="block text-white/50 text-xs mb-1">Value</label>
                        <input
                          type="text"
                          value={item.value}
                          onChange={(e) => handleUpdateContactInfo(index, "value", e.target.value)}
                          className="w-full px-3 py-2 bg-[#0A0A0A] border border-white/10 rounded-lg text-white text-sm"
                          placeholder="hello@example.com"
                        />
                      </div>
                      <button
                        onClick={() => handleRemoveContactInfo(index)}
                        className="mt-6 p-2 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {contactData.info.length === 0 && (
                    <p className="text-white/40 text-sm text-center py-4">
                      No contact info fields. Click &quot;Add Field&quot; to add one.
                    </p>
                  )}
                </div>
              </div>
            </div>
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