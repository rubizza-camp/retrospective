# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::ToggleReadyStatusMutation, type: :request do
  describe '.resolve' do
    let_it_be(:author) { create(:user) }
    let_it_be(:board) { create(:board) }
    let_it_be(:membership) { create(:membership, board: board, user: author, ready: false) }
    let_it_be(:permission) { create(:permission, identifier: 'toggle_ready_status') }

    let(:request) { post '/graphql', params: { query: query(id: membership.id) } }

    before { sign_in author }

    context 'with permission' do
      before do
        create(:board_permissions_user, permission: permission, board: board, user: author)
      end

      it 'toggles membership status' do
        expect { request }.to change { membership.reload.ready }.from(false).to(true)
      end

      it 'returns a membership' do
        request
        data = json_body.dig('data', 'toggleReadyStatus', 'membership')

        expect(data).to include(
          'id' => membership.id,
          'ready' => true,
          'user' => { 'id' => membership.user_id.to_s },
          'board' => { 'id' => membership.board_id.to_s }
        )
      end
    end

    context 'without permission' do
      it 'does not toggle status' do
        expect { request }.not_to change { membership.reload.ready }
      end

      it 'returns unauthorized error' do
        request
        message = json_body['errors'].first['message']

        expect(message).to eq('You are not authorized to perform this action')
      end
    end
  end

  def query(id:)
    <<~GQL
      mutation {
        toggleReadyStatus(
          input: {
            id: #{id}
          }
        ) {
          membership {
            id
            ready
            user {
              id
            }
            board {
              id
            }
          }
        }
      }
    GQL
  end
end
