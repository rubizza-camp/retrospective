import { User } from "./user";


export type BoardType = {
  boardsCount: number
  createdAt: string
  id: number
  private: false
  slug: string
  title: string
  users: Array<User>
  users_count: number
};
