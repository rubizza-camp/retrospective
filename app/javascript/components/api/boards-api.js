import {api} from './api';

export const boardApi = {
  async getBoards() {
    const response = await api.get(`boards/my`);
    return response.data;
  },
  async getBoard(boardSlug) {
    const response = await api.get(`boards/${boardSlug}`);
    return response.data.data.board;
  },

  async deleteBoard(boardSlug) {
    await api.delete(`boards/${boardSlug}`, {}, {});
  },

  async continueBoard(boardSlug) {
    await api.post(`boards/${boardSlug}/continue`);
  },

  async historyBoard(boardSlug) {
    const response = await api.get(`boards/${boardSlug}/history`);
    return response.data;
  }
};
