import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const contents = await prisma.content.findMany();
    const data: Record<string, unknown> = {};
    for (const item of contents) {
      data[item.key] = item.value;
    }
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return res.json(data);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}