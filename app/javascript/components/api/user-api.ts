import { api } from './api';
import { User } from '../../typings/user'

export const userApi = {
  async getUser() {
    const user = await api.get<User>(`user`);
    return user.data;
  }
};
