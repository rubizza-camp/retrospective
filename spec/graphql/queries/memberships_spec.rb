# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Queries::Memberships, type: :request do
  describe '.resolve' do
    let!(:author) { create(:user) }
    let!(:board) { create(:board) }
    let!(:membership1) { create(:membership, board: board, user: author) }
    let!(:member) { create(:user) }
    let!(:membership2) { create(:membership, board: board, user: member, ready: true) }

    before { sign_in author }

    it 'returns membership for provided board slug' do
      post '/graphql', params: { query: query(board_slug: board.slug) }

      expect(json_body['data']['memberships']).to match_array(
        [
          {
            'id' => membership1.id,
            'board' => { 'id' => board.id.to_s },
            'user' => { 'id' => author.id.to_s },
            'ready' => membership1.ready
          },
          {
            'id' => membership2.id,
            'board' => { 'id' => board.id.to_s },
            'user' => { 'id' => member.id.to_s },
            'ready' => membership2.ready
          }
        ]
      )
    end
  end

  def query(board_slug:)
    <<~GQL
      query {
        memberships(boardSlug: "#{board_slug}") {
          id
          board{
            id
          }
          user{
            id
          }
          ready
        }
      }
    GQL
  end
end
