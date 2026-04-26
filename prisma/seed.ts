import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const servicesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/data/services.json'), 'utf-8')
);

const projectsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/data/projects.json'), 'utf-8')
);

const contentData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/data/content.json'), 'utf-8')
);

const navbarData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/data/navbar.json'), 'utf-8')
);

const footerData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/data/footer.json'), 'utf-8')
);

async function main() {
  console.log('🌱 Seeding database...');

  await prisma.service.deleteMany();
  await prisma.project.deleteMany();
  await prisma.content.deleteMany();
  await prisma.user.deleteMany();

  for (const service of servicesData) {
    await prisma.service.create({
      data: {
        icon: service.icon,
        title: service.title,
        description: service.description,
        order: service.id,
        visible: true,
      },
    });
  }
  console.log('✅ Services seeded');

  for (const project of projectsData) {
    await prisma.project.create({
      data: {
        title: project.title,
        description: project.description,
        techStack: project.techStack,
        image: project.image,
        liveDemo: project.liveDemo,
        github: project.github,
        order: project.id,
        visible: true,
      },
    });
  }
  console.log('✅ Projects seeded');

  const heroContent = contentData.hero;
  const aboutContent = contentData.about;
  const contactContent = contentData.contact;

  const navbar = {
    key: 'navbar',
    value: {
      logo: navbarData.logo,
      cta: navbarData.cta,
      items: navbarData.items,
      mobileMenu: navbarData.mobileMenu,
    },
  };

  const hero = {
    key: 'hero',
    value: heroContent,
  };

  const about = {
    key: 'about',
    value: {
      subtitle: aboutContent.subtitle,
      title: aboutContent.title,
      highlightTitle: aboutContent.highlightTitle,
      paragraphs: aboutContent.paragraphs,
      stats: aboutContent.stats,
      skills: aboutContent.skills,
    },
  };

  const contact = {
    key: 'contact',
    value: {
      title: contactContent.title,
      subtitle: contactContent.subtitle,
      description: contactContent.description,
      info: contactContent.info,
    },
  };

  const footer = {
    key: 'footer',
    value: footerData,
  };

  await prisma.content.createMany({
    data: [navbar, hero, about, contact, footer],
  });
  console.log('✅ Content seeded');

  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      email: 'admin@mirazstudio.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    },
  });
  console.log('✅ Admin user created (email: admin@mirazstudio.com, password: admin123)');

  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });