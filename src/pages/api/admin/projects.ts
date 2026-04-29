import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await getAuthUser(req);
  if (!user || user.role !== 'admin') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' },
    });
    return res.json(projects);
  }

  if (req.method === 'POST') {
    const { title, description, image, techStack, liveDemo, github, order, visible } = req.body;

    if (!title || !description || !image) {
      return res.status(400).json({ error: 'Title, description, and image are required' });
    }

    try {
      const project = await prisma.project.create({
        data: {
          title,
          description,
          image,
          techStack: techStack || [],
          liveDemo,
          github,
          order: order || 0,
          visible: visible ?? true,
        },
      });
      return res.json(project);
    } catch (error) {
      console.error('Failed to create project:', error);
      return res.status(500).json({ error: 'Failed to create project' });
    }
  }

  if (req.method === 'PUT') {
    const { id, title, description, image, techStack, liveDemo, github, order, visible } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Project ID is required' });
    }

    try {
      const project = await prisma.project.update({
        where: { id: Number(id) },
        data: {
          ...(title && { title }),
          ...(description && { description }),
          ...(image && { image }),
          ...(techStack && { techStack }),
          ...(liveDemo !== undefined && { liveDemo }),
          ...(github !== undefined && { github }),
          ...(order !== undefined && { order }),
          ...(visible !== undefined && { visible }),
        },
      });
      return res.json(project);
    } catch (error) {
      console.error('Failed to update project:', error);
      return res.status(500).json({ error: 'Failed to update project' });
    }
  }

  if (req.method === 'DELETE') {
    const id = Number(req.query.id || req.body?.id);
    await prisma.project.delete({ where: { id } });
    return res.json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}