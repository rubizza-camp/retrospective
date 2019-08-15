# frozen_string_literal: true

require 'rails_helper'

RSpec.describe MembershipsController do
  login_user

  let_it_be(:board) { create(:board) }
  let_it_be(:user) { create(:user, email: 'some@mail.ru') }

  let_it_be(:valid_params) do
    { board_id: board.id,
      membership: { email: user.email } }
  end

  context 'POST #create' do
    it 'redirects' do
      post :create, params: valid_params
      expect(response).to have_http_status(:redirect)
    end
  end
end
