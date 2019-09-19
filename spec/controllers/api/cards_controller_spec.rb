# frozen_string_literal: true

RSpec.describe API::CardsController do
  let_it_be(:authorized_user) { create(:user) }
  let_it_be(:unauthorized_user) { create(:user) }
  let_it_be(:board) { create(:board) }
  let_it_be(:card) { create(:card, author: authorized_user) }

  describe 'DELETE #destroy' do
    subject(:response) { delete :destroy, params: params }
    let_it_be(:params) { { board_slug: board.slug, id: card.id } }

    context 'when user is not logged in' do
      it_behaves_like 'an unauthenticated action'
    end

    context 'when user is logged_in' do
      context 'when user is unauthorized' do
        before { login_as unauthorized_user }
        it_behaves_like 'an unauthorized action'
      end

      context 'when user is authorized' do
        before { login_as authorized_user }
        it_behaves_like 'a successful action'
      end
    end
  end

  describe 'PATCH #update' do
    subject(:response) { patch :update, params: params }
    let_it_be(:params) do
      {
        board_slug: board.slug,
        id: card.id,
        edited_body: Faker::ChuckNorris.fact
      }
    end

    context 'when user is not logged in' do
      it_behaves_like 'an unauthenticated action'
    end

    context 'when user is logged_in' do
      context 'when user is unauthorized' do
        before { login_as unauthorized_user }
        it_behaves_like 'an unauthorized action'
      end

      context 'when user is authorized' do
        before { login_as authorized_user }

        context 'when params are not valid' do
          let_it_be(:params) { params.merge edited_body: nil }
          it_behaves_like 'a failed action'
        end

        context 'when params are valid' do
          it_behaves_like 'a successful action'
          it { is_expected.to match_json_schema('api/cards/update') }
          it { expect(json_body['updated_body']).to eql params[:edited_body] }
        end
      end
    end
  end
end
