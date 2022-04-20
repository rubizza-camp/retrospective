import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userApi } from "../../components/api/user-api";
import { User } from "../../typings/user";
import { RootState } from "../store";


export interface AppState {
  currentUser: User | null;
}

const initialState: AppState = {
  currentUser: null,
};

export const getUserAsync = createAsyncThunk(
  "app/getUser",
  async () => {
    const response = await userApi.getUser();
    return response;
  }
);
export const updateUserAsync = createAsyncThunk(
  "app/updateUser",
  async (param: { lastName: string, firstName: string, nickname: string, avatar: string | null }) => {
    const response = await userApi.updateUser(param.lastName, param.firstName, param.nickname, param.avatar);
    return response;
  }
);


export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });

    builder
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      });
  },
});

export const selectCurrentUser = (state: RootState): User | null => state.app.currentUser;


export default appSlice.reducer;
