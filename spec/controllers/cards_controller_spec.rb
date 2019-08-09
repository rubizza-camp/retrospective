# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CardsController do
  login_user

  before(:each) do
    @board = create(:board)
  end

  context 'POST #create' do
    it 'redirects if params valid' do
      post :create, params: { board_id: @board.id,
                              card: FactoryBot.attributes_for(:card) }
      expect(response).to have_http_status(:redirect)
    end

    it 'redirects if params not valid' do
      post :create, params: { board_id: @board.id,
                              card: FactoryBot.attributes_for(:card, body: nil) }
      expect(response).to have_http_status(:redirect)
    end
  end
end
