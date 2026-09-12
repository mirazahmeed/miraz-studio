-- ==========================================================
-- MIRAZ STUDIO™ - Supabase / PostgreSQL Production Schema & RLS
-- ==========================================================

-- Enable pgcrypto for UUIDs if needed
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  subtitle TEXT,
  excerpt TEXT NOT NULL,
  description TEXT NOT NULL,
  year TEXT NOT NULL,
  client TEXT NOT NULL,
  type TEXT NOT NULL,
  role TEXT NOT NULL,
  duration TEXT,
  status TEXT DEFAULT 'PUBLISHED' CHECK (status IN ('PUBLISHED', 'DRAFT', 'ARCHIVED')),
  featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  hero_image TEXT NOT NULL,
  category TEXT DEFAULT 'WEBSITES',
  technologies JSONB DEFAULT '[]'::JSONB,
  specifications JSONB,
  challenge TEXT,
  approach TEXT,
  solution TEXT,
  process TEXT,
  results TEXT,
  learnings TEXT,
  live_url TEXT,
  github_url TEXT,
  figma_url TEXT,
  case_study_url TEXT,
  app_store_url TEXT,
  play_store_url TEXT,
  product_hunt_url TEXT,
  behance_url TEXT,
  dribbble_url TEXT,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Project Gallery Table
CREATE TABLE IF NOT EXISTS project_gallery (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  project_id TEXT REFERENCES projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  alt TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Services Table
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  number TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  technologies JSONB DEFAULT '[]'::JSONB,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  quote TEXT NOT NULL,
  avatar_url TEXT,
  project_ref TEXT,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  project_type TEXT,
  budget TEXT,
  timeline TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for maximum query performance
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_sort ON projects(sort_order);
CREATE INDEX IF NOT EXISTS idx_gallery_project ON project_gallery(project_id, sort_order);

-- Row Level Security (RLS) Policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public can read published items
CREATE POLICY "Public can read published projects" ON projects FOR SELECT USING (status = 'PUBLISHED');
CREATE POLICY "Public can read published project gallery" ON project_gallery FOR SELECT USING (EXISTS (SELECT 1 FROM projects WHERE projects.id = project_gallery.project_id AND projects.status = 'PUBLISHED'));
CREATE POLICY "Public can read published services" ON services FOR SELECT USING (published = TRUE);
CREATE POLICY "Public can read published testimonials" ON testimonials FOR SELECT USING (published = TRUE);
CREATE POLICY "Public can read site settings" ON site_settings FOR SELECT USING (TRUE);
-- Public can submit contact messages
CREATE POLICY "Public can insert contact messages" ON contact_messages FOR INSERT WITH CHECK (TRUE);
