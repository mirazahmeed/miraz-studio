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
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' },
    });
    return res.json(services);
  }

  if (req.method === 'POST') {
    const service = await prisma.service.create({
      data: req.body,
    });
    return res.json(service);
  }

  if (req.method === 'PUT') {
    const { id, ...data } = req.body;
    const service = await prisma.service.update({
      where: { id: Number(id) },
      data,
    });
    return res.json(service);
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    await prisma.service.delete({ where: { id: Number(id) } });
    return res.json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}