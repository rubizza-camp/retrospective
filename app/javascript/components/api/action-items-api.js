import {api} from './api';

export const actionItemsApi = {
  async getActionItems() {
    const actionItems = await api.get(`action_items`);
    return actionItems;
  },

  async closeActionItem(id) {
    await api.put(`action_items/${id}/close`);
    return this.getActionItems();
  },

  async completeActionItem(id) {
    await api.put(`action_items/${id}/complete`);
    return this.getActionItems();
  },

  async reopenActionItem(id) {
    await api.put(`action_items/${id}/reopen`);
    return this.getActionItems();
  },

  async moveActionItem(id) {
    await api.put(`action_items/${id}/move`);
    return this.getActionItems();
  }
};
