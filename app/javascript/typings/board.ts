import { ActionItemType } from "./actionItem";
import { User } from "./user";

export enum ROLE {
  Creator = "creator",
  Participating = "participating",
}

export type CardComment = {
  id: number;
  content: string;
  card_id: number;
  likes: number;
  author: User;
};

export type Card = {
  author: User;
  body: string;
  comments: Array<CardComment>;
  id: number;
  kind: string;
  likes: number;
};

export type BoardType = {
  actionItems: Array<ActionItemType>;
  boardsCount: number;
  columnEmojis: Array<string>;
  columnNames: Array<string>;
  createdAt: string;
  id: number;
  nextBoardSlug: null | string;
  previousActionItems: Array<ActionItemType>;
  previousBoardSlug: null | string;
  private: boolean;
  slug: string;
  title: string;
  users: Array<User>;
  usersCount: number;
  cardsByType: {
    [key: string]: Array<Card>;
  };
};

export type NewBoardType = {
  title: string | number;
  columnEmojis: Array<string>;
  columnNames: Array<string>;
  private: boolean;
};
