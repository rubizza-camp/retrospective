import { ROLE } from "../../typings/board";
import boardSlice, { actions, BoardState } from "./slice";

describe("boardSlice", () => {
  const initialState: BoardState = {
    boards: [],
    historyBoards: [],
    currentBoard: null,
    role: ROLE.Creator,
    fetching: false,
    apiError: false,
  };
  it("should changes role", () => {
    const state = boardSlice(initialState, actions.setRole(ROLE.Participating));
    expect(state.role).toEqual("participating");
  });
});
