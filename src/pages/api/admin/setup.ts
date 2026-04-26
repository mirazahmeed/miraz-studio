import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { secret } = req.body;
  if (secret !== process.env.SETUP_SECRET && process.env.NODE_ENV === 'production') {
    return res.status(401).json({ error: 'Invalid secret' });
  }

  try {
    await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS "Service" (id SERIAL PRIMARY KEY, "icon" TEXT NOT NULL, "title" TEXT NOT NULL, "description" TEXT NOT NULL, "order" INTEGER DEFAULT 0, "visible" BOOLEAN DEFAULT true, "createdAt" TIMESTAMP DEFAULT NOW(), "updatedAt" TIMESTAMP DEFAULT NOW())`).catch(() => {});

    await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS "Project" (id SERIAL PRIMARY KEY, "title" TEXT NOT NULL, "description" TEXT NOT NULL, "techStack" TEXT[] DEFAULT '{}', "image" TEXT NOT NULL, "liveDemo" TEXT, "github" TEXT, "order" INTEGER DEFAULT 0, "visible" BOOLEAN DEFAULT true, "createdAt" TIMESTAMP DEFAULT NOW(), "updatedAt" TIMESTAMP DEFAULT NOW())`).catch(() => {});

    await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS "Content" (id SERIAL PRIMARY KEY, "key" TEXT UNIQUE NOT NULL, "value" JSONB NOT NULL, "updatedAt" TIMESTAMP DEFAULT NOW())`).catch(() => {});

    await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS "User" (id SERIAL PRIMARY KEY, "email" TEXT UNIQUE NOT NULL, "password" TEXT NOT NULL, "name" TEXT, "role" TEXT DEFAULT 'user', "createdAt" TIMESTAMP DEFAULT NOW())`).catch(() => {});

    const existingUser = await prisma.user.findUnique({ where: { email: 'admin@mirazstudio.com' } });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await prisma.user.create({
        data: { email: 'admin@mirazstudio.com', password: hashedPassword, name: 'Admin', role: 'admin' }
      });
    }

    const existingServices = await prisma.service.count();
    if (existingServices === 0) {
      const services = [
        { icon: 'Code', title: 'Frontend Development', description: 'Building performant, scalable interfaces with React, Next.js, and Tailwind CSS.' },
        { icon: 'Globe', title: 'Full Website Development', description: 'End-to-end web solutions.' },
        { icon: 'Figma', title: 'UI/UX Implementation', description: 'Pixel-perfect responsive code.' },
        { icon: 'Zap', title: 'Performance Optimization', description: 'Core Web Vitals optimization.' },
        { icon: 'Shield', title: 'Basic Web Security', description: 'XSS, CSRF protection.' },
        { icon: 'Rocket', title: 'Deployment & Hosting', description: 'CI/CD with Netlify, Vercel.' },
      ];
      for (let i = 0; i < services.length; i++) {
        await prisma.service.create({ data: { ...services[i], order: i + 1, visible: true } });
      }
    }

    const existingProjects = await prisma.project.count();
    if (existingProjects === 0) {
      const projects = [
        { title: 'E-Commerce Platform', description: 'Modern e-commerce with Stripe.', techStack: ['Next.js', 'React', 'Tailwind'], image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800' },
        { title: 'SaaS Dashboard', description: 'Analytics with data visualization.', techStack: ['Next.js', 'TypeScript', 'Framer Motion'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800' },
        { title: 'Portfolio Generator', description: 'Creative portfolio builder.', techStack: ['React', 'Node.js', 'MongoDB'], image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800' },
        { title: 'Task Management App', description: 'Kanban with real-time updates.', techStack: ['Next.js', 'Prisma', 'PostgreSQL'], image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800' },
      ];
      for (let i = 0; i < projects.length; i++) {
        await prisma.project.create({ data: { ...projects[i], order: i + 1, visible: true } });
      }
    }

    return res.json({ success: true, message: 'Setup complete!' });
  } catch (error) {
    console.error('Setup error:', error);
    return res.status(500).json({ error: String(error) });
  }
}