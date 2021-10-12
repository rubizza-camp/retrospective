import {api} from './api';

export const boardApi = {
  async getBoards() {
    const boards = await api.get(`boards/my`);
    return boards;
  },
  async getBoardsWhereIAm() {
    const boards = await api.get(`boards/participating`);
    return boards;
  },

  async deleteBoard(boardSlug) {
    await api.delete(`boards/${boardSlug}`, {}, {});
    return this.getBoards();
  },

  async continueBoard(boardSlug) {
    await api.post(`boards/${boardSlug}/continue`);
    return this.getBoards();
  },

  async historyBoard(boardSlug) {
    const boards = await api.get(`boards/${boardSlug}/history`);
    return boards;
  }
};
