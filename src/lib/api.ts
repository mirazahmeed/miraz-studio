const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

export async function fetchServices() {
  const res = await fetch(`${API_BASE}/api/services`);
  if (!res.ok) throw new Error('Failed to fetch services');
  return res.json();
}

export async function fetchProjects() {
  const res = await fetch(`${API_BASE}/api/projects`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function fetchContent() {
  const res = await fetch(`${API_BASE}/api/content`);
  if (!res.ok) throw new Error('Failed to fetch content');
  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function fetchAdminServices(token: string) {
  const res = await fetch(`${API_BASE}/api/admin/services`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch services');
  return res.json();
}

export async function fetchAdminProjects(token: string) {
  const res = await fetch(`${API_BASE}/api/admin/projects`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function fetchAdminContent(token: string) {
  const res = await fetch(`${API_BASE}/api/admin/content`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch content');
  return res.json();
}

export async function updateService(token: string, data: unknown) {
  const res = await fetch(`${API_BASE}/api/admin/services`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update service');
  return res.json();
}

export async function updateProject(token: string, data: unknown) {
  const res = await fetch(`${API_BASE}/api/admin/projects`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update project');
  return res.json();
}

export async function updateContent(token: string, key: string, value: unknown) {
  const res = await fetch(`${API_BASE}/api/admin/content`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ key, value }),
  });
  if (!res.ok) throw new Error('Failed to update content');
  return res.json();
}