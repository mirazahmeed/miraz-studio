"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, ArrowLeft, ExternalLink, Github, Image as ImageIcon, Settings, Layout, Code, Mail, Globe, Menu, GripVertical, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useProjects, type Project } from "@/context/ProjectsContext";
import { useServices, type Service } from "@/context/ServicesContext";
import { useContent } from "@/context/ContentContext";
import { useNavbar, type NavItem, type NavbarConfig } from "@/context/NavbarContext";
import { useFooter, type FooterConfig, type SocialLink } from "@/context/FooterContext";
import Button from "@/components/ui/Button";

type Tab = "projects" | "services" | "content" | "navbar" | "footer";

const iconOptions = [
  { value: "Code", label: "Code" },
  { value: "Globe", label: "Globe" },
  { value: "Figma", label: "Figma" },
  { value: "Zap", label: "Zap" },
  { value: "Shield", label: "Shield" },
  { value: "Rocket", label: "Rocket" },
  { value: "Mail", label: "Mail" },
  { value: "Phone", label: "Phone" },
  { value: "MapPin", label: "MapPin" },
  { value: "Palette", label: "Palette" },
  { value: "Database", label: "Database" },
  { value: "Cloud", label: "Cloud" },
];

function ProjectForm({
  project,
  onSave,
  onCancel,
}: {
  project?: Project;
  onSave: (data: Omit<Project, "id">) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    techStack: project?.techStack.join(", ") || "",
    image: project?.image || "",
    liveDemo: project?.liveDemo || "",
    github: project?.github || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title: formData.title,
      description: formData.description,
      techStack: formData.techStack.split(",").map((t) => t.trim()).filter(Boolean),
      image: formData.image,
      liveDemo: formData.liveDemo,
      github: formData.github,
    });
  };

  const inputClass = "w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors";

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4"
    >
      <div>
        <label className="block text-sm text-[#A3A3A3] mb-2">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Project title"
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm text-[#A3A3A3] mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Project description"
          required
          rows={3}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm text-[#A3A3A3] mb-2">Tech Stack (comma separated)</label>
        <input
          type="text"
          value={formData.techStack}
          onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
          placeholder="React, Next.js, TypeScript"
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm text-[#A3A3A3] mb-2">Image URL</label>
        <input
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="https://example.com/image.jpg"
          required
          className={inputClass}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-[#A3A3A3] mb-2">Live Demo URL</label>
          <input
            type="url"
            value={formData.liveDemo}
            onChange={(e) => setFormData({ ...formData, liveDemo: e.target.value })}
            placeholder="https://example.com"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm text-[#A3A3A3] mb-2">GitHub URL</label>
          <input
            type="url"
            value={formData.github}
            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
            placeholder="https://github.com/..."
            required
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" size="md">
          {project ? "Update Project" : "Add Project"}
        </Button>
        <Button type="button" variant="outline" size="md" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </motion.form>
  );
}

function ServiceForm({
  service,
  onSave,
  onCancel,
}: {
  service?: Service;
  onSave: (data: Omit<Service, "id">) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    icon: service?.icon || "Code",
    title: service?.title || "",
    description: service?.description || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const inputClass = "w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors";

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4"
    >
      <div>
        <label className="block text-sm text-[#A3A3A3] mb-2">Icon</label>
        <select
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          className={inputClass}
        >
          {iconOptions.map((icon) => (
            <option key={icon.value} value={icon.value}>
              {icon.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm text-[#A3A3A3] mb-2">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Service title"
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm text-[#A3A3A3] mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Service description"
          required
          rows={3}
          className={inputClass}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" size="md">
          {service ? "Update Service" : "Add Service"}
        </Button>
        <Button type="button" variant="outline" size="md" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </motion.form>
  );
}

function ContentEditor() {
  const { content, updateContent } = useContent();
  const [activeSection, setActiveSection] = useState<"hero" | "about" | "contact">("hero");

  const inputClass = "w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors";
  const labelClass = "block text-sm text-[#A3A3A3] mb-2";

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setActiveSection("hero")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeSection === "hero" ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          <Globe size={16} className="inline mr-2" />
          Hero
        </button>
        <button
          onClick={() => setActiveSection("about")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeSection === "about" ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          <Layout size={16} className="inline mr-2" />
          About
        </button>
        <button
          onClick={() => setActiveSection("contact")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeSection === "contact" ? "bg-white text-black" : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          <Mail size={16} className="inline mr-2" />
          Contact
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeSection === "hero" && (
          <motion.div
            key="hero"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Hero Section</h3>
            <div>
              <label className={labelClass}>Tagline</label>
              <input
                type="text"
                value={content.hero.tagline}
                onChange={(e) => updateContent("hero", { tagline: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Title Line 1</label>
              <input
                type="text"
                value={content.hero.titleLine1}
                onChange={(e) => updateContent("hero", { titleLine1: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Title Line 2 (highlighted)</label>
              <input
                type="text"
                value={content.hero.titleLine2}
                onChange={(e) => updateContent("hero", { titleLine2: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Title Line 3</label>
              <input
                type="text"
                value={content.hero.titleLine3}
                onChange={(e) => updateContent("hero", { titleLine3: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Subtitle</label>
              <textarea
                value={content.hero.subtitle}
                onChange={(e) => updateContent("hero", { subtitle: e.target.value })}
                rows={3}
                className={inputClass}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Primary CTA</label>
                <input
                  type="text"
                  value={content.hero.ctaPrimary}
                  onChange={(e) => updateContent("hero", { ctaPrimary: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Secondary CTA</label>
                <input
                  type="text"
                  value={content.hero.ctaSecondary}
                  onChange={(e) => updateContent("hero", { ctaSecondary: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === "about" && (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4"
          >
            <h3 className="text-lg font-semibold text-white mb-4">About Section</h3>
            <div>
              <label className={labelClass}>Subtitle</label>
              <input
                type="text"
                value={content.about.subtitle}
                onChange={(e) => updateContent("about", { subtitle: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Title</label>
              <input
                type="text"
                value={content.about.title}
                onChange={(e) => updateContent("about", { title: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Highlight Title</label>
              <input
                type="text"
                value={content.about.highlightTitle}
                onChange={(e) => updateContent("about", { highlightTitle: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Paragraphs (one per line)</label>
              <textarea
                value={content.about.paragraphs.join("\n")}
                onChange={(e) => updateContent("about", { paragraphs: e.target.value.split("\n").filter(Boolean) })}
                rows={6}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Skills (comma separated)</label>
              <input
                type="text"
                value={content.about.skills.join(", ")}
                onChange={(e) => updateContent("about", { skills: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Stats (format: value|label, one per line)</label>
              <textarea
                value={content.about.stats.map(s => `${s.value}|${s.label}`).join("\n")}
                onChange={(e) => updateContent("about", { stats: e.target.value.split("\n").filter(Boolean).map(line => {
                  const [value, label] = line.split("|");
                  return { value: value || "", label: label || "" };
                }) })}
                rows={3}
                className={inputClass}
              />
            </div>
          </motion.div>
        )}

        {activeSection === "contact" && (
          <motion.div
            key="contact"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Contact Section</h3>
            <div>
              <label className={labelClass}>Subtitle</label>
              <input
                type="text"
                value={content.contact.subtitle}
                onChange={(e) => updateContent("contact", { subtitle: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Title</label>
              <input
                type="text"
                value={content.contact.title}
                onChange={(e) => updateContent("contact", { title: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                value={content.contact.description}
                onChange={(e) => updateContent("contact", { description: e.target.value })}
                rows={3}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Contact Info (format: label|value, one per line)</label>
              <textarea
                value={content.contact.info.map(i => `${i.label}|${i.value}`).join("\n")}
                onChange={(e) => updateContent("contact", { info: e.target.value.split("\n").filter(Boolean).map(line => {
                  const [label, value] = line.split("|");
                  return { label: label || "", value: value || "" };
                }) })}
                rows={3}
                className={inputClass}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavbarEditor() {
  const { config, updateConfig, updateItem, addItem, removeItem, reorderItems } = useNavbar();
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", href: "", visible: true });
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const inputClass = "w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors";
  const labelClass = "block text-sm text-[#A3A3A3] mb-2";

  const handleAddItem = () => {
    if (newItem.name && newItem.href) {
      addItem({ name: newItem.name, href: newItem.href, visible: newItem.visible });
      setNewItem({ name: "", href: "", visible: true });
      setIsAddingItem(false);
    }
  };

  const handleDragStart = (id: string) => {
    setDraggedItem(id);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) return;

    const items = [...config.items].sort((a, b) => a.order - b.order);
    const draggedIndex = items.findIndex((i) => i.id === draggedItem);
    const targetIndex = items.findIndex((i) => i.id === targetId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const newItems = [...items];
      const [removed] = newItems.splice(draggedIndex, 1);
      newItems.splice(targetIndex, 0, removed);
      reorderItems(newItems);
    }
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const sortedItems = [...config.items].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">Logo Configuration</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Logo Text</label>
            <input
              type="text"
              value={config.logo.text}
              onChange={(e) => updateConfig({ logo: { ...config.logo, text: e.target.value } })}
              className={inputClass}
              placeholder="MIRAZ"
            />
          </div>
          <div>
            <label className={labelClass}>Highlight Text</label>
            <input
              type="text"
              value={config.logo.highlight}
              onChange={(e) => updateConfig({ logo: { ...config.logo, highlight: e.target.value } })}
              className={inputClass}
              placeholder="STUDIO"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">Call to Action</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>CTA Button Text</label>
            <input
              type="text"
              value={config.cta.text}
              onChange={(e) => updateConfig({ cta: { ...config.cta, text: e.target.value } })}
              className={inputClass}
              placeholder="Let's Talk"
            />
          </div>
          <div className="flex items-center gap-3 pt-8">
            <button
              onClick={() => updateConfig({ cta: { ...config.cta, visible: !config.cta.visible } })}
              className={`px-4 py-2 rounded-lg transition-colors ${
                config.cta.visible ? "bg-white text-black" : "bg-white/10 text-white"
              }`}
            >
              {config.cta.visible ? "Visible" : "Hidden"}
            </button>
            <span className="text-[#A3A3A3] text-sm">CTA button visibility</span>
          </div>
        </div>
      </div>

      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Navigation Items</h3>
          <Button size="sm" onClick={() => setIsAddingItem(true)}>
            <Plus size={16} className="mr-2" />
            Add Item
          </Button>
        </div>

        {isAddingItem && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4 space-y-4"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Name</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className={inputClass}
                  placeholder="About"
                />
              </div>
              <div>
                <label className={labelClass}>Href (e.g. #about)</label>
                <input
                  type="text"
                  value={newItem.href}
                  onChange={(e) => setNewItem({ ...newItem, href: e.target.value })}
                  className={inputClass}
                  placeholder="#about"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button size="sm" onClick={handleAddItem}>Add</Button>
              <Button size="sm" variant="outline" onClick={() => setIsAddingItem(false)}>Cancel</Button>
            </div>
          </motion.div>
        )}

        <div className="space-y-2">
          {sortedItems.map((item) => (
            <motion.div
              key={item.id}
              draggable
              onDragStart={() => handleDragStart(item.id)}
              onDragOver={(e) => handleDragOver(e, item.id)}
              onDragEnd={handleDragEnd}
              className={`bg-[#0A0A0A] border border-white/10 rounded-xl p-4 flex items-center gap-4 ${
                draggedItem === item.id ? "opacity-50" : ""
              }`}
            >
              <GripVertical size={18} className="text-white/30 cursor-grab" />
              <div className="flex-1 grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateItem(item.id, { name: e.target.value })}
                  className={inputClass}
                />
                <input
                  type="text"
                  value={item.href}
                  onChange={(e) => updateItem(item.id, { href: e.target.value })}
                  className={inputClass}
                />
              </div>
              <button
                onClick={() => updateItem(item.id, { visible: !item.visible })}
                className={`p-2 rounded-lg transition-colors ${
                  item.visible ? "text-green-400" : "text-white/30"
                }`}
                title={item.visible ? "Hide" : "Show"}
              >
                {item.visible ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
              <button
                onClick={() => removeItem(item.id)}
                className="p-2 text-white/30 hover:text-red-500 transition-colors"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">Mobile Menu</h3>
        <button
          onClick={() => updateConfig({ mobileMenu: { enabled: !config.mobileMenu.enabled } })}
          className={`px-4 py-2 rounded-lg transition-colors ${
            config.mobileMenu.enabled ? "bg-white text-black" : "bg-white/10 text-white"
          }`}
        >
          {config.mobileMenu.enabled ? "Enabled" : "Disabled"}
        </button>
      </div>
    </div>
  );
}

function FooterEditor() {
  const { config, updateConfig, updateSocialLink, addSocialLink, removeSocialLink } = useFooter();
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [newLink, setNewLink] = useState({ name: "", href: "", icon: "Github", visible: true });

  const inputClass = "w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors";
  const labelClass = "block text-sm text-[#A3A3A3] mb-2";

  const handleAddLink = () => {
    if (newLink.name && newLink.href) {
      addSocialLink({ name: newLink.name, href: newLink.href, icon: newLink.icon, visible: newLink.visible });
      setNewLink({ name: "", href: "", icon: "Github", visible: true });
      setIsAddingLink(false);
    }
  };

  const iconOptions = [
    { value: "Github", label: "GitHub" },
    { value: "Linkedin", label: "LinkedIn" },
    { value: "Twitter", label: "Twitter" },
    { value: "Instagram", label: "Instagram" },
    { value: "Mail", label: "Mail" },
    { value: "Globe", label: "Globe" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">Logo Configuration</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Logo Text</label>
            <input
              type="text"
              value={config.logo.text}
              onChange={(e) => updateConfig({ logo: { ...config.logo, text: e.target.value } })}
              className={inputClass}
              placeholder="MIRAZ"
            />
          </div>
          <div>
            <label className={labelClass}>Highlight Text</label>
            <input
              type="text"
              value={config.logo.highlight}
              onChange={(e) => updateConfig({ logo: { ...config.logo, highlight: e.target.value } })}
              className={inputClass}
              placeholder="STUDIO"
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Description</label>
          <textarea
            value={config.logo.description}
            onChange={(e) => updateConfig({ logo: { ...config.logo, description: e.target.value } })}
            rows={3}
            className={inputClass}
          />
        </div>
      </div>

      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
        <button
          onClick={() => updateConfig({ quickLinks: { visible: !config.quickLinks.visible } })}
          className={`px-4 py-2 rounded-lg transition-colors ${
            config.quickLinks.visible ? "bg-white text-black" : "bg-white/10 text-white"
          }`}
        >
          {config.quickLinks.visible ? "Visible" : "Hidden"}
        </button>
      </div>

      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Social Links</h3>
          <Button size="sm" onClick={() => setIsAddingLink(true)}>
            <Plus size={16} className="mr-2" />
            Add Link
          </Button>
        </div>

        {isAddingLink && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4 space-y-4"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Name</label>
                <input
                  type="text"
                  value={newLink.name}
                  onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                  className={inputClass}
                  placeholder="GitHub"
                />
              </div>
              <div>
                <label className={labelClass}>URL</label>
                <input
                  type="text"
                  value={newLink.href}
                  onChange={(e) => setNewLink({ ...newLink, href: e.target.value })}
                  className={inputClass}
                  placeholder="https://github.com/..."
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Icon</label>
              <select
                value={newLink.icon}
                onChange={(e) => setNewLink({ ...newLink, icon: e.target.value })}
                className={inputClass}
              >
                {iconOptions.map((icon) => (
                  <option key={icon.value} value={icon.value}>
                    {icon.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-3">
              <Button size="sm" onClick={handleAddLink}>Add</Button>
              <Button size="sm" variant="outline" onClick={() => setIsAddingLink(false)}>Cancel</Button>
            </div>
          </motion.div>
        )}

        <div className="space-y-2">
          {config.socialLinks.map((link) => (
            <div
              key={link.id}
              className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4 flex items-center gap-4"
            >
              <div className="flex-1 grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={link.name}
                  onChange={(e) => updateSocialLink(link.id, { name: e.target.value })}
                  className={inputClass}
                />
                <input
                  type="text"
                  value={link.href}
                  onChange={(e) => updateSocialLink(link.id, { href: e.target.value })}
                  className={inputClass}
                />
              </div>
              <button
                onClick={() => updateSocialLink(link.id, { visible: !link.visible })}
                className={`p-2 rounded-lg transition-colors ${
                  link.visible ? "text-green-400" : "text-white/30"
                }`}
                title={link.visible ? "Hide" : "Show"}
              >
                {link.visible ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
              <button
                onClick={() => removeSocialLink(link.id)}
                className="p-2 text-white/30 hover:text-red-500 transition-colors"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">Copyright</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Copyright Text</label>
            <input
              type="text"
              value={config.copyright.text}
              onChange={(e) => updateConfig({ copyright: { ...config.copyright, text: e.target.value } })}
              className={inputClass}
              placeholder="All rights reserved."
            />
          </div>
          <div className="flex items-center gap-3 pt-8">
            <button
              onClick={() => updateConfig({ copyright: { ...config.copyright, showYear: !config.copyright.showYear } })}
              className={`px-4 py-2 rounded-lg transition-colors ${
                config.copyright.showYear ? "bg-white text-black" : "bg-white/10 text-white"
              }`}
            >
              {config.copyright.showYear ? "Show Year" : "Hide Year"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">Legal Links</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white">Privacy Policy</span>
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={config.legalLinks.privacy.text}
                onChange={(e) => updateConfig({ legalLinks: { ...config.legalLinks, privacy: { ...config.legalLinks.privacy, text: e.target.value } } })}
                className={inputClass}
                placeholder="Privacy Policy"
              />
              <button
                onClick={() => updateConfig({ legalLinks: { ...config.legalLinks, privacy: { ...config.legalLinks.privacy, visible: !config.legalLinks.privacy.visible } } })}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  config.legalLinks.privacy.visible ? "bg-white text-black" : "bg-white/10 text-white"
                }`}
              >
                {config.legalLinks.privacy.visible ? "Visible" : "Hidden"}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white">Terms of Service</span>
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={config.legalLinks.terms.text}
                onChange={(e) => updateConfig({ legalLinks: { ...config.legalLinks, terms: { ...config.legalLinks.terms, text: e.target.value } } })}
                className={inputClass}
                placeholder="Terms of Service"
              />
              <button
                onClick={() => updateConfig({ legalLinks: { ...config.legalLinks, terms: { ...config.legalLinks.terms, visible: !config.legalLinks.terms.visible } } })}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  config.legalLinks.terms.visible ? "bg-white text-black" : "bg-white/10 text-white"
                }`}
              >
                {config.legalLinks.terms.visible ? "Visible" : "Hidden"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { isAuthenticated, logout } = useAuth();
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const { services, addService, updateService, deleteService } = useServices();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isAddingService, setIsAddingService] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: "project" | "service"; id: number } | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const handleSaveProject = (data: Omit<Project, "id">) => {
    if (editingProject) {
      updateProject(editingProject.id, data);
    } else {
      addProject(data);
    }
    setEditingProject(null);
    setIsAddingProject(false);
  };

  const handleSaveService = (data: Omit<Service, "id">) => {
    if (editingService) {
      updateService(editingService.id, data);
    } else {
      addService(data);
    }
    setEditingService(null);
    setIsAddingService(false);
  };

  const handleDelete = () => {
    if (deleteConfirm) {
      if (deleteConfirm.type === "project") {
        deleteProject(deleteConfirm.id);
      } else {
        deleteService(deleteConfirm.id);
      }
      setDeleteConfirm(null);
    }
  };

  const tabs = [
    { id: "projects" as Tab, label: "Projects", count: projects.length, icon: Code },
    { id: "services" as Tab, label: "Services", count: services.length, icon: Settings },
    { id: "navbar" as Tab, label: "Navbar", count: 0, icon: Menu },
    { id: "footer" as Tab, label: "Footer", count: 0, icon: Globe },
    { id: "content" as Tab, label: "Content", count: 3, icon: Layout },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <header className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Site
            </a>
            <span className="text-white/30">|</span>
            <h1 className="text-xl font-bold font-[family-name:var(--font-syne)]">
              Admin Dashboard
            </h1>
          </div>
          <Button variant="ghost" size="sm" onClick={logout}>
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-white text-black"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
              <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id ? "bg-black/20" : "bg-white/20"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold font-[family-name:var(--font-syne)] text-white">
                    Manage Projects
                  </h2>
                  <p className="text-[#A3A3A3] mt-1">
                    {projects.length} project{projects.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <Button onClick={() => setIsAddingProject(true)}>
                  <Plus size={18} className="mr-2" />
                  Add Project
                </Button>
              </div>

              <AnimatePresence>
                {isAddingProject && (
                  <div className="mb-8">
                    <ProjectForm onSave={handleSaveProject} onCancel={() => setIsAddingProject(false)} />
                  </div>
                )}
              </AnimatePresence>

              {editingProject && (
                <div className="mb-8">
                  <ProjectForm
                    project={editingProject}
                    onSave={handleSaveProject}
                    onCancel={() => setEditingProject(null)}
                  />
                </div>
              )}

              <div className="space-y-4">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-[#141414] border border-white/10 rounded-xl p-4 flex flex-col md:flex-row gap-4"
                  >
                    <div className="w-full md:w-32 h-24 bg-[#0A0A0A] rounded-lg overflow-hidden flex-shrink-0">
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-white/20" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate">{project.title}</h3>
                      <p className="text-sm text-[#A3A3A3] line-clamp-2 mt-1">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-white/5 rounded text-xs text-white/60">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="p-2 text-white/60 hover:text-white transition-colors" title="View Live">
                        <ExternalLink size={18} />
                      </a>
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 text-white/60 hover:text-white transition-colors" title="View GitHub">
                        <Github size={18} />
                      </a>
                      <button onClick={() => setEditingProject(project)} className="p-2 text-white/60 hover:text-white transition-colors" title="Edit">
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => setDeleteConfirm({ type: "project", id: project.id })} className="p-2 text-white/60 hover:text-red-500 transition-colors" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {projects.length === 0 && !isAddingProject && (
                <div className="text-center py-16">
                  <p className="text-[#A3A3A3]">No projects yet. Add your first project!</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "services" && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold font-[family-name:var(--font-syne)] text-white">
                    Manage Services
                  </h2>
                  <p className="text-[#A3A3A3] mt-1">
                    {services.length} service{services.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <Button onClick={() => setIsAddingService(true)}>
                  <Plus size={18} className="mr-2" />
                  Add Service
                </Button>
              </div>

              <AnimatePresence>
                {isAddingService && (
                  <div className="mb-8">
                    <ServiceForm onSave={handleSaveService} onCancel={() => setIsAddingService(false)} />
                  </div>
                )}
              </AnimatePresence>

              {editingService && (
                <div className="mb-8">
                  <ServiceForm
                    service={editingService}
                    onSave={handleSaveService}
                    onCancel={() => setEditingService(null)}
                  />
                </div>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-[#141414] border border-white/10 rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <span className="inline-block px-3 py-1 bg-white/5 rounded-full text-xs text-white/60 mb-2">
                          {service.icon}
                        </span>
                        <h3 className="font-semibold text-white">{service.title}</h3>
                        <p className="text-sm text-[#A3A3A3] mt-1 line-clamp-2">{service.description}</p>
                      </div>
                      <div className="flex flex-col gap-1 ml-2">
                        <button onClick={() => setEditingService(service)} className="p-2 text-white/60 hover:text-white transition-colors" title="Edit">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => setDeleteConfirm({ type: "service", id: service.id })} className="p-2 text-white/60 hover:text-red-500 transition-colors" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {services.length === 0 && !isAddingService && (
                <div className="text-center py-16">
                  <p className="text-[#A3A3A3]">No services yet. Add your first service!</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "navbar" && (
            <motion.div
              key="navbar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold font-[family-name:var(--font-syne)] text-white">
                  Manage Navbar
                </h2>
                <p className="text-[#A3A3A3] mt-1">
                  Configure navigation menu, logo, and CTA button
                </p>
              </div>
              <NavbarEditor />
            </motion.div>
          )}

          {activeTab === "footer" && (
            <motion.div
              key="footer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold font-[family-name:var(--font-syne)] text-white">
                  Manage Footer
                </h2>
                <p className="text-[#A3A3A3] mt-1">
                  Configure footer logo, links, and legal information
                </p>
              </div>
              <FooterEditor />
            </motion.div>
          )}

          {activeTab === "content" && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold font-[family-name:var(--font-syne)] text-white">
                  Manage Content
                </h2>
                <p className="text-[#A3A3A3] mt-1">
                  Edit hero, about, and contact section content
                </p>
              </div>
              <ContentEditor />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {deleteConfirm !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setDeleteConfirm(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#141414] border border-white/10 rounded-2xl p-6 z-50 w-full max-w-md"
            >
              <h3 className="text-xl font-bold text-white mb-2">
                Delete {deleteConfirm.type === "project" ? "Project" : "Service"}?
              </h3>
              <p className="text-[#A3A3A3] mb-6">
                This action cannot be undone. Are you sure you want to delete this {deleteConfirm.type}?
              </p>
              <div className="flex gap-3">
                <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                  Delete
                </Button>
                <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
                  Cancel
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
