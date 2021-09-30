import {api} from './api';

export const boardApi = {
  async getBoards() {
    try {
      const {data} = await api.get(`boards/my`);
      return data;
    } catch (error) {
      alert(error);
    }
  },
  async getBoard(boardSlug) {
    try {
      const {
        data: {
          data: {board}
        }
      } = await api.get(`boards/${boardSlug}`);
      return board;
    } catch (error) {
      alert(error);
    }
  },

  async deleteBoard(boardSlug) {
    try {
      await api.delete(`boards/${boardSlug}`, {}, {});
      return await this.getBoards();
    } catch (error) {
      alert(error);
    }
  },

  async continueBoard(boardSlug) {
    try {
      await api.post(`boards/${boardSlug}/continue`);
      return await this.getBoards();
    } catch (error) {
      alert(error);
    }
  },

  async historyBoard(boardSlug) {
    try {
      const {data} = await api.get(`boards/${boardSlug}/history`);
      return data;
    } catch (error) {
      alert(error);
    }
  }
};
