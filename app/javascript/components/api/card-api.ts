import { api } from './api';

export const cardApi = {
  async createCard(boardParams: any) {
    const card = await api.post(`cards`, boardParams);
    console.log('card', card)
    return {};
  },
  async likeCard(id: string) {
    try {
      await api.put(`cards/${id}/like`);
      console.log('like done')
    } catch (error) {
      console.log('like', error)
    }
    return {};
  },
  async addComment(comment: { content: string, cardId: string }) {
    try {
      const data = await api.post(`comments`, comment);
      console.log('data done', data)
    } catch (error) {
      console.log('like', error)
    }
    return {};
  }
};
