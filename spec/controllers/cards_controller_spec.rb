# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CardsController do
  # login_user

  let_it_be(:board) { create(:board) }
  let_it_be(:user) { build_stubbed(:user) }
  let_it_be(:membership) { build_stubbed(:membership, user: user, board: board) }
  let_it_be(:card) { build_stubbed(:card, board: board, author: user) }

  context 'POST #create' do
    it 'redirects' do
      post :create, params: { board_slug: board.slug,
                              card: FactoryBot.attributes_for(:card) }
      expect(response).to have_http_status(:redirect)
    end
  end

  context 'POST #destroy' do
    it 'redirects' do
      delete :destroy, params: { board_slug: board.slug, id: card.id }
      expect(response).to have_http_status(:redirect)
    end
  end
end
