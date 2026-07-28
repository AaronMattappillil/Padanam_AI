import api from './api';

export const authService = {
  async register(userData) {
    const res = await api.post('/auth/register', userData);
    if (res.data.access_token) {
      localStorage.setItem('padanam_token', res.data.access_token);
      localStorage.setItem('padanam_user', JSON.stringify(res.data));
    }
    return res.data;
  },

  async login(credentials) {
    const res = await api.post('/auth/login', credentials);
    if (res.data.access_token) {
      localStorage.setItem('padanam_token', res.data.access_token);
      localStorage.setItem('padanam_user', JSON.stringify(res.data));
    }
    return res.data;
  },

  // DEMO MODE: Bypasses login and instantly sets selected demo user role
  continueAsDemoRole(role) { // DEMO MODE
    const demoAccounts = {
      student: { user_id: 1, full_name: 'Anoop Kumar', role: 'student', access_token: 'demo-student', email: 'student@padanam.ai' },
      teacher: { user_id: 2, full_name: 'Suresh Kumar', role: 'teacher', access_token: 'demo-teacher', email: 'teacher@padanam.ai' },
      parent: { user_id: 3, full_name: 'Radhika Nair', role: 'parent', access_token: 'demo-parent', email: 'parent@padanam.ai' },
      admin: { user_id: 4, full_name: 'System Admin', role: 'admin', access_token: 'demo-admin', email: 'admin@padanam.ai' }
    };
    const userObj = demoAccounts[role] || demoAccounts.student;
    localStorage.setItem('padanam_token', userObj.access_token);
    localStorage.setItem('padanam_user', JSON.stringify(userObj));
    return userObj;
  }, // DEMO MODE

  async getMe() {
    const res = await api.get('/auth/me');
    return res.data;
  },

  async updateSettings(settings) {
    const res = await api.put('/auth/settings', settings);
    return res.data;
  },

  logout() {
    localStorage.removeItem('padanam_token');
    localStorage.removeItem('padanam_user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('padanam_user');
    return userStr ? JSON.parse(userStr) : null;
  }
};
