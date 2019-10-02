# frozen_string_literal: true

require 'rails_helper'

RSpec.describe API::ActionItemsController do
  let(:creator) { build_stubbed(:user) }
  let(:not_creator) { build_stubbed(:user) }
  let(:board) { build_stubbed(:board) }
  let(:action_item) { build_stubbed(:action_item) }

  describe 'DELETE #destroy' do
    subject(:response) { delete :destroy, params: params }
    let(:params) { { board_slug: board.slug, id: action_item.id } }

    context 'authentication' do
      it_behaves_like :controllers_api_unauthenticated_action
    end

    context 'authorization' do
      before do
        login_as(not_creator)

        allow(Board).to receive(:find_by!).with(slug: board.slug).and_return(board)
        allow(ActionItem).to receive(:find).with(action_item.id.to_s).and_return(action_item)
      end

      it_behaves_like :controllers_api_unauthorized_action
    end

    context 'happy path' do
      before do
        login_as(creator)
        authorize

        allow(Board).to receive(:find_by!).with(slug: board.slug).and_return(board)
        allow(ActionItem).to receive(:find).with(action_item.id.to_s).and_return(action_item)
        allow(action_item).to receive(:destroy).and_return(true)
      end

      it_behaves_like :controllers_api_successful_action, :no_content
    end
  end

  describe 'PATCH #update' do
    subject(:response) { patch :update, params: params }
    let(:params) do
      {
        board_slug: board.slug,
        id: action_item.id,
        edited_body: Faker::ChuckNorris.fact
      }
    end

    context 'authentication' do
      it_behaves_like :controllers_api_unauthenticated_action
    end

    context 'authorization' do
      before do
        login_as(not_creator)

        allow(Board).to receive(:find_by!).with(slug: board.slug).and_return(board)
        allow(ActionItem).to receive(:find).with(action_item.id.to_s).and_return(action_item)
      end

      it_behaves_like :controllers_api_unauthorized_action
    end

    context 'happy path' do
      before do
        login_as(creator)
        authorize

        allow(Board).to receive(:find_by!).with(slug: board.slug).and_return(board)
        allow(ActionItem).to receive(:find).with(action_item.id.to_s).and_return(action_item)
        allow(action_item).to receive(:update).with(body: params[:edited_body]).and_return(true)
      end

      it_behaves_like :controllers_api_successful_action

      it { is_expected.to match_json_schema('api/cards/update') }
    end
  end
end
