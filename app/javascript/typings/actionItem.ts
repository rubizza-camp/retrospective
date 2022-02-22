import { User } from "./user";

export enum ACTION_ITEM_STATUS {
  ToDo = "pending",
  InProgress = "in_progress",
  Done = "done",
  Closed = "closed",
}

export type ActionItemType = {
  id: number;
  body: string;
  timesMoved: number;
  status: ACTION_ITEM_STATUS;
  author: User;
  assignee: User;
};
