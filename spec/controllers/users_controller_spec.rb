# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  login_user

  describe 'GET #suggestions' do
    it 'returns http success' do
      get :suggestions
      expect(response).to have_http_status(:success)
    end
  end
end
