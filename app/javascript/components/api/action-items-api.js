import {api} from './api';

export const actionItemsApi = {
  async getActionItems() {
    try {
      const {data} = await api.get(`action_items`);
      return data;
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors.fullMessages);
      } else {
        alert('Something went wrong, try again.');
      }
    }
  },

  async closeActionItem(id) {
    try {
      await api.put(`action_items/${id}/close`);
      return this.getActionItems();
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors.fullMessages);
        return this.getActionItems();
      }

      alert('Something went wrong, try again.');
    }
  },

  async completeActionItem(id) {
    try {
      await api.put(`action_items/${id}/complete`);
      return this.getActionItems();
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors.fullMessages);
        return this.getActionItems();
      }

      alert('Something went wrong, try again.');
    }
  },

  async reopenActionItem(id) {
    try {
      await api.put(`action_items/${id}/reopen`);
      return this.getActionItems();
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors.fullMessages);
        return this.getActionItems();
      }

      alert('Something went wrong, try again.');
    }
  },

  async moveActionItem(id) {
    try {
      await api.put(`action_items/${id}/move`);
      return this.getActionItems();
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors.fullMessages);
        return this.getActionItems();
      }

      alert('Something went wrong, try again.');
    }
  }
};
