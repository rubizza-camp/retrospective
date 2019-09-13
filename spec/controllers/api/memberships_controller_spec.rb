# frozen_string_literal: true

require 'rails_helper'

RSpec.describe API::MembershipsController do
  login_user

  let_it_be(:board) { create(:board) }
  let_it_be(:user) { create(:user) }
  let_it_be(:membership) do
    create(:membership, user_id: user.id, board_id: board.id, role: 'creator') 
  end

  context 'DELETE #destroy' do
    it 'redirects' do
      destroy :destroy, params: { id: membership.id }
      expect(response).to have_http_status(:no_content)
    end
  end
end
