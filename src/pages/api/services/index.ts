import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
const services = await prisma.service.findMany({
    where: { visible: true },
    orderBy: { order: 'asc' },
  });
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  return res.json(services);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}