const API_BASE = process.env.NEXT_PUBLIC_API_URL || '';

function buildUrl(path: string) {
  return API_BASE ? `${API_BASE}${path}` : path;
}

export async function fetchServices() {
  const url = buildUrl('/api/services');
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    console.error('fetchServices:', res.status, url);
    throw new Error('Failed to fetch services');
  }
  return res.json();
}

export async function fetchProjects() {
  const url = buildUrl('/api/projects');
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    console.error('fetchProjects:', res.status, url);
    throw new Error('Failed to fetch projects');
  }
  return res.json();
}

export async function fetchContent() {
  const url = buildUrl('/api/content');
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    console.error('fetchContent:', res.status, url);
    throw new Error('Failed to fetch content');
  }
  return res.json();
}

export async function login(email: string, password: string) {
  const url = buildUrl('/api/auth/login');
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}

export async function fetchAdminServices(token: string) {
  const url = buildUrl('/api/admin/services');
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch services');
  return res.json();
}

export async function fetchAdminProjects(token: string) {
  const url = buildUrl('/api/admin/projects');
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function fetchAdminContent(token: string) {
  const url = buildUrl('/api/admin/content');
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch content');
  return res.json();
}

export async function updateService(token: string, data: unknown) {
  const url = buildUrl('/api/admin/services');
  const res = await fetch(url, {
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
  const url = buildUrl('/api/admin/projects');
  const res = await fetch(url, {
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

export async function createProject(token: string, data: unknown) {
  const url = buildUrl('/api/admin/projects');
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create project');
  return res.json();
}

export async function deleteProject(token: string, id: number) {
  const url = buildUrl('/api/admin/projects');
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error('Failed to delete project');
  return res.json();
}

export async function updateContent(token: string, key: string, value: unknown) {
  const url = buildUrl('/api/admin/content');
  const res = await fetch(url, {
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