import {api} from './api';

export const actionItemsApi = {
  async getActionItems() {
    await api.get('');
  },

  async getActionItemsResolved() {
    await api.get('');
  },

  async closeActionItem(id) {
    await api.put(`action_items/${id}/close`);
  },

  async completeActionItem(id) {
    await api.put(`action_items/${id}/complete`);
  },

  async reopenActionItem(id) {
    await api.put(`action_items/${id}/reopen`);
  },

  async moveActionItem(id) {
    await api.put(`action_items/${id}/move`);
  }
};
