import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import user from "./user/slice";
import actionItem from "./action-items/slice";
import board from "./boards-page/slice";


export const store = configureStore({
  reducer: {
    user,
    actionItem,
    board
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
