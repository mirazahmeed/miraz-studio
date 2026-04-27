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
    const project = await prisma.project.create({
      data: req.body,
    });
    return res.json(project);
  }

  if (req.method === 'PUT') {
    const { id, ...data } = req.body;
    const project = await prisma.project.update({
      where: { id: Number(id) },
      data,
    });
    return res.json(project);
  }

  if (req.method === 'DELETE') {
    const id = Number(req.query.id || req.body?.id);
    await prisma.project.delete({ where: { id } });
    return res.json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}