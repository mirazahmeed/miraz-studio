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
    const contents = await prisma.content.findMany();
    const data: Record<string, unknown> = {};
    for (const item of contents) {
      data[item.key] = item.value;
    }
    return res.json(data);
  }

  if (req.method === 'PUT' || req.method === 'PATCH') {
    const { key, value } = req.body;
    const content = await prisma.content.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
    return res.json(content);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}