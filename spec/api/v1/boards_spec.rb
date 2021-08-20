# frozen_string_literal: true

require 'rails_helper'

RSpec.describe API::V1::BoardsController, type: :controller do
  let_it_be(:author) { create(:user) }
  let_it_be(:board1) { create(:board) }
  let_it_be(:board_attrs) { %w[title id slug createdAt updatedAt cards] }

  before { login_as author }

  describe 'GET /api/v1/boards' do
    subject(:response) { get :index }
    let_it_be(:board2) { create(:board) }

    it { is_expected.to have_http_status(:ok) }

    it 'returns boards' do
      handler = serialize_resource([board1, board2])

      expect(json_body).to eq(JSON.parse(handler))
    end
  end

  describe 'GET /api/v1/boards/:slug' do
    subject(:response) { get :show, params: { slug: board1.slug } }

    it { is_expected.to have_http_status(:ok) }

    it 'returns board' do
      handler = serialize_resource(board1)

      expect(json_body).to eq(JSON.parse(handler))
    end
  end

  describe 'GET /api/v1/boards/:slug/history' do
    subject(:response) { get :history, params: { slug: board1.slug } }

    it { is_expected.to have_http_status(:ok) }
  end

  describe 'POST /api/v1/boards/:slug/continue' do
    subject(:response) { post :continue, params: { slug: board1.slug } }

    context 'user has permission to continue' do
      let_it_be(:continue_permission) { create(:permission, identifier: 'continue_board') }
      let!(:permission) do
        create(:board_permissions_user,
               permission: continue_permission,
               user: author,
               board: board1)
      end

      context 'board can be continued' do
        it { is_expected.to have_http_status(:ok) }

        it 'adds board in db' do
          expect { subject }.to change { Board.count }.by(1)
        end

        it 'returns new board' do
          expect(json_body.dig('data', 'board').keys).to match_array(board_attrs)
          expect(json_body.dig('data', 'board', 'title')).to eq("#{board1.title} #2")
        end
      end
    end

    context 'user has not permission to continue' do
      it_behaves_like :controllers_api_unauthenticated_action
    end
  end

  describe 'DELETE /api/v1/boards/:slug' do
    subject(:response) { delete :destroy, params: { slug: board1.slug } }

    context 'user has permission to destroy' do
      let_it_be(:destroy_permission) { create(:permission, identifier: 'destroy_board') }
      let!(:permission) do
        create(:board_permissions_user,
               permission: destroy_permission,
               user: author,
               board: board1)
      end

      context 'board can be deleted' do
        it { is_expected.to have_http_status(:no_content) }

        it 'deletes board in db' do
          expect { subject }.to change { Board.count }.by(-1)
        end
      end

      context "board can't be deleted" do
        let!(:action_item) { create(:action_item, board: board1) }

        it { is_expected.to have_http_status(:unprocessable_entity) }
        it 'returns error message' do
          expect(json_body.dig('errors', 'fullMessages'))
            .to eq(['Cannot delete record because dependent action items exist'])
        end
      end
    end

    context 'user has not permission to destroy' do
      it_behaves_like :controllers_api_unauthenticated_action
    end
  end
end
