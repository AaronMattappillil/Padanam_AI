import api from './api';

export const agentService = {
  async chat(message, topicId = null, languagePreference = 'en') {
    const res = await api.post('/agent/chat', {
      message,
      topic_id: topicId,
      language_preference: languagePreference
    });
    return res.data;
  },

  async generateQuiz(topicId, difficulty = 'medium', numQuestions = 3) {
    const res = await api.post('/quiz/generate', {
      topic_id: topicId,
      difficulty,
      num_questions: numQuestions
    });
    return res.data;
  },

  async submitQuiz(topicId, answers, timeTakenSeconds = 120) {
    const res = await api.post('/quiz/submit', {
      topic_id: topicId,
      time_taken_seconds: timeTakenSeconds,
      answers
    });
    return res.data;
  },

  async getStudentSummary() {
    const res = await api.get('/student/summary');
    return res.data;
  },

  async generateStudyPlan(timeframe = '7_days') {
    const res = await api.post(`/student/study-plan/generate?timeframe=${timeframe}`);
    return res.data;
  },

  async getCurrentStudyPlan() {
    const res = await api.get('/student/study-plan/current');
    return res.data;
  },

  async getTeacherAnalytics() {
    const res = await api.get('/analytics/teacher/dashboard');
    return res.data;
  },

  async getParentReport() {
    const res = await api.get('/analytics/parent/report');
    return res.data;
  },

  async getAdminStats() {
    const res = await api.get('/analytics/admin/stats');
    return res.data;
  },

  async getNotifications() {
    const res = await api.get('/notifications/list');
    return res.data;
  }
};
