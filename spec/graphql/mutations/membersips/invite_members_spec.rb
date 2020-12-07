# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::InviteMembersMutation, type: :request do
  describe '.resolve' do
    let!(:author) { create(:user) }
    let!(:board) { create(:board) }
    let!(:creatorship) do
      create(:membership, board: board, user: author, role: 'creator')
    end

    let(:invitee_1) { build_stubbed(:user) }
    let(:invitee_2) { build_stubbed(:user) }

    let(:membership_1) { build_stubbed(:membership, board: board, user: invitee_1) }
    let(:membership_2) { build_stubbed(:membership, board: board, user: invitee_2) }

    let(:request) do
      post '/graphql', params: { query: query(board_slug: board.slug,
                                              email: "#{invitee_1.email},#{invitee_2.email}") }
    end

    before do
      sign_in author
      allow_any_instance_of(Boards::FindUsersToInvite)
        .to receive(:call)
        .and_return([invitee_1, invitee_2])
      allow_any_instance_of(Boards::InviteUsers)
        .to receive(:call)
        .and_return(Dry::Monads.Success([membership_1, membership_2]))
    end

    it 'returns a list of memberships' do
      request
      json = JSON.parse(response.body)
      data = json.dig('data', 'inviteMembers', 'memberships')

      expect(data).to match_array(
        [
          {
            'id' => membership_1.id,
            'ready' => membership_1.ready,
            'board' => {
              'id' => membership_1.board_id.to_s
            },
            'user' => {
              'id' => membership_1.user_id.to_s
            }
          },
          {
            'id' => membership_2.id,
            'ready' => membership_2.ready,
            'board' => {
              'id' => membership_2.board_id.to_s
            },
            'user' => {
              'id' => membership_2.user_id.to_s
            }
          }
        ]
      )
    end
  end

  def query(board_slug:, email:)
    <<~GQL
      mutation {
        inviteMembers(
          input: {
            boardSlug: "#{board_slug}"
            email: "#{email}"
          }
        ) {
          memberships {
            id
            ready
            user {
              id
            }
            board {
              id
            }
          }
          errors {
            fullMessages
          }
        }
      }
    GQL
  end
end
