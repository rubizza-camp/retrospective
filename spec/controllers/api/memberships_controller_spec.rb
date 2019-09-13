# frozen_string_literal: true

require 'rails_helper'

RSpec.describe API::MembershipsController do
  let(:current_user) { create(:user, :github) }
  let(:deleted_user) { create(:user, email: 'test@test.ru') }

  before do
    login_as current_user
  end

  let(:board) { create(:board) }

  let(:membership) { create(:membership, board: board, user: deleted_user) }
  let!(:current_membership) do
    create(:membership, user: current_user, board: board, role: 'creator')
  end

  context 'DELETE #destroy' do
    it 'respond with no_content' do
      delete :destroy, params: { board_slug: board.slug, id: membership.id }
      expect(response).to have_http_status(:no_content)
    end
  end
end
