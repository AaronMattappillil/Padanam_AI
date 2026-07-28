import api from './api';

export const curriculumService = {
  async getBoards() {
    const res = await api.get('/curriculum/boards');
    return res.data;
  },

  async getSubjects(boardCode = 'SCERT_KERALA', grade = 10) {
    const res = await api.get(`/curriculum/subjects?board_code=${boardCode}&grade=${grade}`);
    return res.data;
  },

  async getChapters(subjectId) {
    const res = await api.get(`/curriculum/chapters/${subjectId}`);
    return res.data;
  },

  async getTopics(chapterId) {
    const res = await api.get(`/curriculum/topics/${chapterId}`);
    return res.data;
  },

  async getTopicDetail(topicId) {
    const res = await api.get(`/curriculum/topic/${topicId}`);
    return res.data;
  },

  async search(query, language = 'en') {
    const res = await api.get(`/curriculum/search?q=${encodeURIComponent(query)}&language=${language}`);
    return res.data;
  }
};
