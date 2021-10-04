import {api} from './api';

export const boardApi = {
  async getBoards() {
    try {
      const {data} = await api.get(`boards/my`);
      return data;
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors.fullMessages);
      } else {
        alert('Something went wrong, try again.');
      }
    }
  },
  async getBoardsWhereIAm() {
    try {
      const {data} = await api.get(`boards/participating`);
      return data;
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors.fullMessages);
      } else {
        alert('Something went wrong, try again.');
      }
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
      if (error.response) {
        alert(error.response.data.errors.fullMessages);
      } else {
        alert('Something went wrong, try again.');
      }
    }
  },

  async deleteBoard(boardSlug) {
    try {
      await api.delete(`boards/${boardSlug}`, {}, {});
      return await this.getBoards();
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors.fullMessages);
        return this.getBoards();
      }

      alert('Something went wrong, try again.');
    }
  },

  async continueBoard(boardSlug) {
    try {
      await api.post(`boards/${boardSlug}/continue`);
      return await this.getBoards();
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors.fullMessages);
        return this.getBoards();
      }

      alert('Something went wrong, try again.');
    }
  },

  async historyBoard(boardSlug) {
    try {
      const {data} = await api.get(`boards/${boardSlug}/history`);
      return data;
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors.fullMessages);
        return this.getBoards();
      }

      alert('Something went wrong, try again.');
    }
  }
};
