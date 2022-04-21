import { createSlice } from "@reduxjs/toolkit";
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
    fetchRequest: (state): UserState => ({ ...state, fetching: true }),
    fetchSuccess: (state, action): UserState => ({
      ...state,
      fetching: false,
      currentUser: action.payload
    }),
    fetchFailure: (state): UserState => ({
      ...state,
      fetching: false,
      apiError: true
    }),
    updateRequest: (state): UserState => ({ ...state, fetching: true }),
    updateSuccess: (state, action): UserState => ({
      ...state,
      fetching: false,
      currentUser: action.payload
    }),
    updateFailure: (state): UserState => ({
      ...state,
      fetching: false,
      apiError: true
    }),
  },
});

export const { actions } = userSlice;

export default userSlice.reducer;
