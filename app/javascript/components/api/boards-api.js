import {api} from './api';

export const boardApi = {
  getBoards() {
    api.get('boards/my').then((response) => console.log(response.data));
  },

  deleteBoard(boardSlug) {
    api
      .delete(`boards/${boardSlug}`, {}, {})
      .then((response) => console.log(response));
  },
  showBoard(boardSlug) {
    api
      .get(`boards/${boardSlug}`, {}, {})
      .then((response) => console.log(response.data));
  },

  continueBoard(boardSlug) {
    api
      .post(`boards/${boardSlug}/continue`)
      .then((response) => console.log(response.data));
  },

  historyBoard(boardSlug) {
    api
      .get(`boards/${boardSlug}/history`)
      .then((response) => console.log(response.data));
  }
};
