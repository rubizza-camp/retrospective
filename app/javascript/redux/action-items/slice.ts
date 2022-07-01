import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionItemType } from "../../typings/actionItem";

export interface ActionItemState {
  actionItems: ActionItemType[] | [];
  fetching: boolean;
  apiError: boolean;
}

const initialState: ActionItemState = {
  fetching: false,
  actionItems: [],
  apiError: false,
};

const actionItemSlice = createSlice({
  name: "actionItem",
  initialState,
  reducers: {
    pending: (state) => {
      state.fetching = true;
    },
    rejected: (state) => {
      state.fetching = false;
      state.apiError = true;
    },
    setActionItems: (state, action: PayloadAction<ActionItemType[]>) => {
      state.actionItems = action.payload;
      state.fetching = false;
    },
  },
});

export const { actions } = actionItemSlice;

export default actionItemSlice.reducer;
