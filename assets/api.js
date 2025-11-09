const API_BASE = location.origin + '/api/v1';

function getToken() { return localStorage.getItem('token'); }

async function apiFetch(path, opts = {}) {
  const headers = opts.headers || {};
  if (getToken()) headers['Authorization'] = 'Bearer ' + getToken();
  headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  const res = await fetch(API_BASE + path, { ...opts, headers });
  if (res.status === 401) { localStorage.removeItem('token'); window.location = 'login.html'; }
  return res.json();
}
