import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoardType, ROLE } from "../../typings/board";



export interface BoardState {
  boards: Array<BoardType> | []
  historyBoards: Array<BoardType> | []
  role: ROLE,
  fetching: boolean,
  apiError: boolean
}

const initialState: BoardState = {
  boards: [],
  historyBoards: [],
  role: ROLE.Creator,
  fetching: false,
  apiError: false
};


export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    pending: (state) => {
      state.fetching = true
    },
    rejected: (state) => {
      state.fetching = false
      state.apiError = true
    },
    setRole: (state, action: PayloadAction<ROLE>) => {
      state.role = action.payload
    },
    setBoards: (state, action: PayloadAction<BoardType[]>) => {
      state.boards = action.payload
      state.fetching = false
    },
    setHistoryBoards: (state, action: PayloadAction<BoardType[] | []>) => {
      state.historyBoards = action.payload
      state.fetching = false
    },
  }
});

export const { actions } = boardSlice;

export default boardSlice.reducer;
