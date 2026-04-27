const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const existingUser = await prisma.user.findUnique({ where: { email: 'admin@mirazstudio.com' } });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: { email: 'admin@mirazstudio.com', password: hashedPassword, name: 'Admin', role: 'admin' }
    });
    console.log('Admin user created successfully.');
  } else {
    console.log('Admin user already exists.');
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
    console.log('Services created.');
  } else {
    console.log('Services already exist.');
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
    console.log('Projects created.');
  } else {
    console.log('Projects already exist.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });