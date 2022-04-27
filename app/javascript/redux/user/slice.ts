import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../typings/user";

export interface UserState {
  currentUser: User | null;
  fetching: boolean,
  apiError: boolean
}

const initialState: UserState = {
  fetching: false,
  currentUser: null,
  apiError: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    pending: (state) => {
      state.fetching = true
    },
    rejected: (state) => {
      state.fetching = false
      state.apiError = true
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.fetching = false
      state.currentUser = action.payload
    }
  },
});

export const { actions } = userSlice;

export default userSlice.reducer;
