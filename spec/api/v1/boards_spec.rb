# frozen_string_literal: true

require 'rails_helper'

RSpec.describe API::V1::BoardsController, type: :controller do
  let_it_be(:author) { create(:user) }
  let_it_be(:board1) { create(:board) }
  let_it_be(:board_attrs) { %w[title id slug created_at users_count private boards_count] }

  before { login_as author }

  describe 'GET /api/v1/boards/my' do
    let_it_be(:creator_permission) { create(:permission, identifier: 'destroy_board') }

    before do
      create(:board_permissions_user, permission: creator_permission,
                                      user: author, board: board1)
    end

    subject(:response) { get :my }

    it { is_expected.to have_http_status(:ok) }

    it 'returns boards' do
      expect(json_body.size).to eq(1)
      expect(json_body.first.keys).to match_array(board_attrs + ['users'])
    end
  end

  describe 'GET /api/v1/boards/participating' do
    let_it_be(:member_permission) { create(:permission, identifier: 'toggle_ready_status') }

    before do
      create(:board_permissions_user, permission: member_permission,
                                      user: author, board: board1)
    end

    subject(:response) { get :participating }

    it { is_expected.to have_http_status(:ok) }

    it 'returns boards' do
      expect(json_body.size).to eq(1)
      expect(json_body.first.keys).to match_array(board_attrs + ['users'])
    end
  end

  describe 'GET /api/v1/boards/new' do
    subject(:response) { get :new }

    it { is_expected.to have_http_status(:ok) }

    it 'returns board' do
      expect(json_body.keys).to match_array(board_attrs)
    end
  end

  describe 'GET /api/v1/boards/:slug' do
    subject(:response) { get :show, params: { slug: board1.slug } }

    it { is_expected.to have_http_status(:ok) }

    it 'returns board' do
      expect(json_body.keys).to match_array(board_attrs + ['users'])
    end
  end

  describe 'GET /api/v1/boards/:slug/edit' do
    subject(:response) { get :edit, params: { slug: board1.slug } }
    let_it_be(:edit_permission) { create(:permission, identifier: 'edit_board') }

    before do
      create(:board_permissions_user, permission: edit_permission, user: author, board: board1)
    end

    it { is_expected.to have_http_status(:ok) }

    it 'returns board' do
      expect(json_body.keys).to match_array(board_attrs)
    end
  end

  describe 'GET /api/v1/boards/:slug/history' do
    subject(:response) { get :history, params: { slug: board1.slug } }

    it { is_expected.to have_http_status(:ok) }

    it 'returns board' do
      expect(json_body.first.keys).to match_array(board_attrs + ['users'])
    end
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
          expect(json_body.keys).to match_array(board_attrs)
          expect(json_body['title']).to eq("#{board1.title} #2")
        end
      end
    end

    context 'user has not permission to continue' do
      it_behaves_like :controllers_api_unauthenticated_action
    end
  end

  describe 'POST /api/v1/boards/' do
    subject(:response) { post :create, params: { board: { title: Faker::Lorem.word } } }

    context 'when board is valid' do
      it { is_expected.to have_http_status(201) }
    end

    context 'when board is invalid' do
      subject(:response) { post :create, params: { board: { title: '' } } }

      it { is_expected.to have_http_status(422) }

      it 'returns errors' do
        expect(json_body.dig('errors', 'fullMessages'))
          .to eq("Validation failed: Title can't be blank")
      end
    end
  end

  describe 'PATCH /api/v1/boards/:slug' do
    subject(:response) { patch :update, params: params }
    let_it_be(:params) { { slug: board1.slug } }

    context 'user has permission to update' do
      let_it_be(:update_permission) { create(:permission, identifier: 'update_board') }
      let!(:permission) do
        create(:board_permissions_user,
               permission: update_permission,
               user: author,
               board: board1)
      end

      context 'board can be updated' do
        context 'when params are valid' do
          let_it_be(:new_title) { Faker::Lorem.word }
          let_it_be(:params) { params.merge board: { title: new_title } }

          it { is_expected.to have_http_status(:ok) }

          it 'returns updated board' do
            expect(json_body.keys).to match_array(board_attrs)
            expect(json_body['title']).to eq(new_title)
          end
        end

        context 'when params are invalid' do
          let_it_be(:params) { params.merge board: { title: nil } }

          it { is_expected.to have_http_status(422) }

          it 'returns errors' do
            expect(json_body.dig('errors', 'fullMessages')).to eq(["Title can't be blank"])
          end
        end
      end
    end

    context 'user has not permission to update' do
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
