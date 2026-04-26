require('dotenv').config();

const { PrismaClient } = require('@prisma/client');

const schema = `
CREATE TABLE IF NOT EXISTS "Service" (
    id SERIAL PRIMARY KEY,
    icon TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    "order" INTEGER DEFAULT 0,
    visible BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Project" (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    "techStack" TEXT[] DEFAULT '{}',
    image TEXT NOT NULL,
    "liveDemo" TEXT,
    github TEXT,
    "order" INTEGER DEFAULT 0,
    visible BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "Content" (
    id SERIAL PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "User" (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'user',
    "createdAt" TIMESTAMP DEFAULT NOW()
);
`;

async function main() {
  const { Pool } = require('pg');
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL + '?sslmode=require',
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Connecting...');
    await pool.query('SELECT 1');
    console.log('Connected!');
    
    console.log('Creating tables...');
    await pool.query(schema);
    console.log('Tables created!');
    
    console.log('Done!');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await pool.end();
  }
}

main();