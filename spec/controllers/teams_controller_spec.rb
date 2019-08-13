# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TeamsController do
  context 'GET #index' do
    it 'returns http success' do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  context 'GET #show' do
    it 'returns http success' do
      team = create(:team)
      get :show, params: { id: team.id }
      expect(response).to have_http_status(:success)
    end
  end

  # context 'POST #create' do
  #  it 'redirects' do
  #    post :create, params: { board_id: board.id,
  #                            card: FactoryBot.attributes_for(:card) }
  #    expect(response).to have_http_status(:redirect)
  #  end
  # end
end
