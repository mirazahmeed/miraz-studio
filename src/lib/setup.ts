const API_BASE = process.env.NEXT_PUBLIC_API_URL;

const url = API_BASE ? `${API_BASE}/api/auth/setup` : '/api/auth/setup';

export async function setupAdmin(email: string, password: string, secret: string) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, setupSecret: secret }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Setup failed');
  return data;
}