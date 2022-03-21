import { ActionItemType } from '../../typings/actionItem';
import { api } from './api';

export const actionItemsApi = {
  async getActionItems() {
    const actionItems = await api.get<Array<ActionItemType>>(`action_items`);
    return actionItems.data;
  },

  async changeActionItemStatus(id: number, status: string) {
    await api.put(`action_items/${id}/${status}`);
    return this.getActionItems();
  }
};
