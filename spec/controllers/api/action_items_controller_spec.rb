# frozen_string_literal: true

require 'rails_helper'

RSpec.describe API::ActionItemsController do
  let_it_be(:current_user) { create(:user) }
  let_it_be(:deleted_user) { create(:user) }
  let_it_be(:board) { create(:board) }
  let_it_be(:membership) { create(:membership, board: board, user: deleted_user) }
  let_it_be(:current_membership) do
    create(:membership, user: current_user, board: board, role: 'creator')
  end
  let_it_be(:action_item) { create(:action_item, board: board) }

  before { login_as current_user }

  describe 'DELETE #destroy' do
    it 'respond with no_content' do
      delete :destroy, params: { board_slug: board.slug, id: action_item.id }
      expect(response).to have_http_status(:no_content)
    end
  end

  describe 'PUT #update' do
    it 'respond with ok' do
      put :update, params: { board_slug: board.slug, id: action_item.id, edited_body: 'test' }
      expect(response).to have_http_status(:ok)
    end
  end
end
