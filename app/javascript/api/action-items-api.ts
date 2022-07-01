import { ActionItemType } from "../typings/actionItem";
import { api } from "./api";

export const actionItemsApi = {
  async getActionItems() {
    const actionItems = await api.get<Array<ActionItemType>>(`action_items`);
    return actionItems.data;
  },
  async createActionItems(boardSlug: string, assigneeId: string, body: string) {
    const actionItems = await api.post<Array<ActionItemType>>(`action_items`, {
      boardSlug,
      assigneeId,
      body,
    });
    // return actionItems.data;
  },
  async removeActionItems(id: number) {
    const actionItems = await api.delete<Array<ActionItemType>>(
      `action_items/${id}`
    );
    return actionItems.data;
  },
  async updateActionItems(id: number, body?: string, assigneeId?: string, status?: string) {
    const actionItems = await api.patch<Array<ActionItemType>>(
      `action_items/${id}`,
      { body, assigneeId, status }
    );
    return actionItems.data;
  },

  async changeActionItemStatus(id: number, status: string) {
    await api.put(`action_items/${id}/${status}`);
    return this.getActionItems();
  },

  async moveActionItem(id: number, data: { board_slug: string}) {
    await api.put(`action_items/${id}/move`, data);
    return this.getActionItems();
  },
};
