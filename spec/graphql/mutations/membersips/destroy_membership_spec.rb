# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::DestroyMembershipMutation, type: :request do
  describe '#resolve' do
    let!(:board) { create(:board) }
    let(:author) { create(:user) }
    let(:non_author) { create(:user) }
    let!(:creatorship) do
      create(:membership, board: board, user: author, role: 'creator')
    end
    let!(:non_creatorship) do
      create(:membership, board: board, user: non_author, role: 'member')
    end
    let_it_be(:member_permission) { create(:permission, identifier: 'some_identifier') }
    let_it_be(:destroy_permission) { create(:permission, identifier: 'destroy_membership') }
    let(:request) { post '/graphql', params: { query: query(id: non_creatorship.id) } }

    before do
      create(:board_permissions_user, permission: member_permission,
                                      user: non_author, board: board)
    end

    before { sign_in author }

    context 'with permission' do
      before do
        create(:board_permissions_user, permission: destroy_permission, user: author, board: board)
      end

      it 'removes membership' do
        expect { request }.to change { Membership.count }.by(-1)
      end

      it 'removes permission' do
        expect { request }.to change { non_author.permissions.count }.by(-1)
      end

      it 'returns a membership' do
        request

        json = JSON.parse(response.body)
        data = json.dig('data', 'destroyMembership')

        expect(data).to include(
          'id' => non_creatorship.id
        )
      end
    end

    context 'without permission' do
      it 'does not remove membership' do
        expect { request }.not_to change { Membership.count }
      end

      it 'returns unauthorized error' do
        request
        json = JSON.parse(response.body)
        message = json['errors'].first['message']

        expect(message).to eq('You are not authorized to perform this action')
      end
    end
  end

  def query(id:)
    <<~GQL
      mutation {
        destroyMembership(
          input: {
            id: #{id}
          }
        ) {
          id
          errors {
            fullMessages
          }
        }
      }
    GQL
  end
end
