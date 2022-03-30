import { api } from './api';
import { User } from '../../typings/user'

export const userApi = {
  async getUser() {
    const user = await api.get<User>(`user`);
    return user.data;
  },
  async updateUser(lastName: string, firstName: string, nickname: string, avatar: string | null) {
    const response = await api.patch<User>(`user`, {
      user:
        { lastName, firstName, nickname, avatar }
    });
    return response.data
  },
};
