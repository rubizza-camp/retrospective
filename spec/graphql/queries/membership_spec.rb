# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Queries::Membership, type: :request do
  describe '.resolve' do
    let!(:author) { create(:user) }
    let!(:board) { create(:board) }
    let!(:membership) { create(:membership, board: board, user: author) }

    before { sign_in author }

    it 'returns membership for provided id' do
      post '/graphql', params: { query: query(board_slug: board.slug) }

      expect(json_body.dig('data', 'membership')).to include(
        'id' => be_present,
        'board' => { 'id' => board.id.to_s },
        'user' => { 'id' => author.id.to_s },
        'ready' => membership.ready
      )
    end
  end

  def query(board_slug:)
    <<~GQL
      query {
        membership(boardSlug: "#{board_slug}") {
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
