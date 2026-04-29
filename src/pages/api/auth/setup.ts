import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, setupSecret } = req.body;
  const secret = process.env.SETUP_SECRET;

  if (setupSecret !== secret) {
    return res.status(401).json({ error: 'Invalid setup secret' });
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: 'Admin',
        role: 'admin',
      },
    });

    return res.json({ success: true, userId: user.id });
  } catch (error) {
    console.error('Setup error:', error);
    return res.status(500).json({ error: 'Failed to create user' });
  }
}