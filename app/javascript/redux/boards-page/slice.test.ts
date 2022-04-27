import boardSlice, { actions, BoardState } from "./slice";



describe('boardSlice', () => {
  const initialState: BoardState = {
    boards: [],
    historyBoards: [],
    role: 'creator',
    fetching: false,
    apiError: false
  }
  it('should changes role', () => {
    const state = boardSlice(initialState, actions.setRole('participating'));
    expect(state.role).toEqual('participating');
  });
});
