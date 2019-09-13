# frozen_string_literal: true

require 'rails_helper'

RSpec.describe MembershipsController do
  before do
    login_user
  end

  let_it_be(:board) { create(:board) }

  context 'POST #create' do
    it 'redirects' do
      post :create, params: { board_slug: board.slug }
      expect(response).to have_http_status(:redirect)
    end
  end
end
