import { ActionItemType } from '../../typings/actionItem';
import { api } from './api';

export const actionItemsApi = {
  async getActionItems() {
    const actionItems = await api.get<Array<ActionItemType>>(`action_items`);
    return actionItems.data;
  },


  async closeActionItem(id: number) {
    await api.put(`action_items/${id}/close`);
    return this.getActionItems();
  },

  async completeActionItem(id: number) {
    await api.put(`action_items/${id}/complete`);
    return this.getActionItems();
  },

  async reopenActionItem(id: number) {
    await api.put(`action_items/${id}/reopen`);
    return this.getActionItems();
  },

  async moveActionItem(id: number) {
    await api.put(`action_items/${id}/move`);
    return this.getActionItems();
  }
};
