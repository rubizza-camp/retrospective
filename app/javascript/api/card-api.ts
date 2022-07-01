import { api } from "./api";

export const cardApi = {
  async createCard(cardParams: {
    body: string,
    kind: string,
    board_slug: string
  }) {
    const card = await api.post(`cards`, cardParams);
    console.log("card", card);
    return {};
  },
  async updateCard(id: number, body: string) {
    try {
      const card = await api.patch(`cards/${id}`, { body });
      console.log("card", card);
    } catch (error) {
      console.log('err', error)
    }
 
    return {};
  },
  async likeCard(id: number) {
    try {
      await api.put(`cards/${id}/like`);
      console.log("like done");
    } catch (error) {
      console.log("like", error);
    }
    return {};
  },
  async addComment(comment: { content: string; cardId: number }) {
    try {
      const data = await api.post(`comments`, comment);
      console.log("data done", data);
    } catch (error) {
      console.log("like", error);
    }
    return {};
  },
  async removeCard(id: number) {
    try {
      const data = await api.delete(`cards/${id}`);
      console.log("data removeCard done", data);
    } catch (error) {
      console.log("removeCard", error);
    }
    return {};
  },
};
