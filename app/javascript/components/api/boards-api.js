import {api} from './api';

export const boardApi = {
  async getBoards() {
    const response = await api.get(`boards`);
    console.log(response.data.data);
    return response.data.data.boards;
  },
  async getBoard(boardSlug) {
    const response = await api.get(`boards/${boardSlug}`);
    return response.data.data.board;
  },

  async deleteBoard(boardSlug) {
    await api.delete(`boards/${boardSlug}`, {}, {});
  },
  showBoard(boardSlug) {
    api
      .get(`boards/${boardSlug}`, {}, {})
      .then((response) => console.log(response.data));
  },

  async continueBoard(boardSlug) {
    const response = await api.post(`boards/${boardSlug}/continue`);
    return response.data.data.boards;
  },

  async historyBoard(boardSlug) {
    const response = await api.get(`boards/${boardSlug}/history`);
    return response.data.data;
  }
};
