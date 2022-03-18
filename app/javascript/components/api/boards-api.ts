import { api } from './api';
import { BoardType } from '../../typings/board'

export const boardApi = {
  async getBoards() {
    const boards = await api.get<Array<BoardType>>(`boards/my`);
    return boards.data;
  },
  async getBoardsWhereIAm() {
    const boards = await api.get<Array<BoardType>>(`boards/participating`);
    return boards.data;
  },

  async deleteBoard(boardSlug: string) {
    await api.delete(`boards/${boardSlug}`, {});
    return this.getBoards();
  },

  async continueBoard(boardSlug: string) {
    await api.post<BoardType>(`boards/${boardSlug}/continue`);
    return this.getBoards();
  },

  async historyBoard(boardSlug: string) {
    const boards = await api.get<Array<BoardType>>(`boards/${boardSlug}/history`);
    return boards.data;
  },
  async getBoard(boardSlug: string) {
    const board = await api.get<BoardType>(`boards/${boardSlug}`);
    return board.data;
  },

};
