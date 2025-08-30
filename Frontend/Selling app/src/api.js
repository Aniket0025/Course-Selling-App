export const api = {
  async request(path, { method = 'GET', body, tokenType } = {}) {
    const headers = { 'Content-Type': 'application/json' };
    if (tokenType === 'user') {
      const t = localStorage.getItem('userToken');
      if (t) headers.token = t;
    }
    if (tokenType === 'admin') {
      const t = localStorage.getItem('adminToken');
      if (t) headers.token = t;
    }
    const res = await fetch(path, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data?.message || `Request failed: ${res.status}`);
    }
    return data;
  },

  // User
  userSignup(payload) {
    return this.request('/app/v1/user/signup', { method: 'POST', body: payload });
  },
  userSignin(payload) {
    return this.request('/app/v1/user/signin', { method: 'POST', body: payload });
  },

  // Admin
  adminSignup(payload) {
    return this.request('/app/v1/admin/signup', { method: 'POST', body: payload });
  },
  adminSignin(payload) {
    return this.request('/app/v1/admin/signin', { method: 'POST', body: payload });
  },

  // Courses (admin protected)
  createCourse(payload) {
    return this.request('/app/v1/admin/course', { method: 'POST', body: payload, tokenType: 'admin' });
  },
  updateCourse(payload) {
    return this.request('/app/v1/admin/course', { method: 'PUT', body: payload, tokenType: 'admin' });
  },
  listMyCourses() {
    return this.request('/app/v1/admin/course/bulk', { tokenType: 'admin' });
  },
};
