# frozen_string_literal: true

require 'rails_helper'
Dir["#{Rails.root}/spec/support/shared_examples/controllers/*.rb"].sort.each { |f| require f }

RSpec.describe API::CardsController do
  let_it_be(:current_user) { create(:user) }
  let_it_be(:unauthorized_user) { create(:user) }
  let_it_be(:board) { create(:board) }
  let_it_be(:card) { create(:card, author: current_user) }
  
  describe 'DELETE #destroy' do
    subject(:response) { delete :destroy, params: params }
    let_it_be(:params) {{ board_slug: board.slug, id: card.id }}

    context 'when user is not logged in' do
      it_behaves_like 'an unauthenticated action'
    end

    context 'when user is logged_in' do
      before { login_as current_user }

      context 'when user is unauthorized' do
        before { login_as unauthorized_user }
        it_behaves_like 'an unauthorized action'
      end

      context 'when user is authorized' do
        it_behaves_like 'a successful action'
      end
    end
  end
end

