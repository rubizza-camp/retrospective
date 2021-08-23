import {api} from './api';

export const boardApi = {
  getBoards() {
    api
      .get(`boards`)
      .then((response) => console.log(response.data.data.boards));
  },

  deleteBoard(boardSlug) {
    api
      .delete(`boards/${boardSlug}`, {}, {})
      .then((response) => console.log(response));
  },

  continueBoard(boardSlug) {
    api
      .post(`boards/${boardSlug}/continue`)
      .then((response) => console.log(response.data.data.board));
  },

  historyBoard(boardSlug) {
    api
      .get(`boards/${boardSlug}/history`)
      .then((response) => console.log(response.data.data.august_2021));
  }
};
