import {api} from './api';

export const actionItemsApi = {
  async getActionItems() {
    try {
      const {data} = await api.get(`action_items`);
      return data;
    } catch (error) {
      alert(error);
    }
  },

  async closeActionItem(id) {
    try {
      await api.put(`action_items/${id}/close`);
      return this.getActionItems();
    } catch (error) {
      alert(error);
    }
  },

  async completeActionItem(id) {
    try {
      await api.put(`action_items/${id}/complete`);
      return this.getActionItems();
    } catch (error) {
      alert(error);
    }
  },

  async reopenActionItem(id) {
    try {
      await api.put(`action_items/${id}/reopen`);
      return this.getActionItems();
    } catch (error) {
      alert(error);
    }
  },

  async moveActionItem(id) {
    try {
      await api.put(`action_items/${id}/move`);
      return this.getActionItems();
    } catch (error) {
      alert(error);
    }
  }
};
