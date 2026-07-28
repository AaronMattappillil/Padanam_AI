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
