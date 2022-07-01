import { api } from "./api";
import { BoardType, NewBoardType } from "../typings/board";
import { User } from "../typings/user";

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
    const boards = await api.get<Array<BoardType>>(
      `boards/${boardSlug}/history`
    );
    return boards.data;
  },
  async getBoard(boardSlug: string) {
    const board = await api.get<BoardType>(`boards/${boardSlug}`);
    return board.data;
  },
  async createBoard(board: NewBoardType) {
    await api.post<BoardType>(`boards`, { board });
    return this.getBoards();
  },
  async getMemberships(id: string) {
    const memberships = await api.get<{
      id: number
      ready: boolean
      user: User
    }[]>(`memberships/${id}`);
    return memberships;
  },
  async addUser(email: string, boardSlug: string) {
    await api.post<{
      id: number
      ready: boolean
      user: User
    }>(`memberships`, { email, boardSlug });
  },
  async removeUser(id: number) {
    await api.delete<{
      id: number
      ready: boolean
      user: User
    }>(`memberships/${id}`);
  },
  async updateBoard(board: NewBoardType, boardSlug: string) {
    await api.patch<BoardType>(`/boards/${boardSlug}`, { board });
    return this.getBoard(boardSlug);
  },
};
