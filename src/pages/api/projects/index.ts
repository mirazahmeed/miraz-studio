import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const projects = await prisma.project.findMany({
      where: { visible: true },
      orderBy: { order: 'asc' },
    });

    res.setHeader('Cache-Control', 'no-store, max-age=0');
    return res.json(projects);
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return res.status(500).json({ error: 'Failed to fetch projects' });
  }
}