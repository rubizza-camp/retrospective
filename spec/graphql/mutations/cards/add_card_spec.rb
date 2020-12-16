# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::AddCardMutation, type: :request do
  describe '.resolve' do
    let_it_be(:author) { create(:user) }
    let_it_be(:board) { create(:board) }
    let(:request) { post '/graphql', params: { query: query(board_slug: board.slug) } }

    let_it_be(:creatorship) do
      create(:membership, board: board, user: author, role: 'creator')
    end

    before { sign_in author }

    it 'creates a card' do
      expect { request }.to change { Card.count }.by(1)
    end

    it 'returns a card' do
      request
      json = JSON.parse(response.body)
      data = json.dig('data', 'addCard', 'card')

      expect(data).to include(
        'id' => be_present,
        'kind' => 'mad',
        'body' => 'Some text',
        'author' => { 'id' => author.id.to_s },
        'boardId' => board.id.to_s
      )
    end
  end

  def query(board_slug:)
    <<~GQL
      mutation {
        addCard(
          input: {
            attributes: {
              boardSlug: "#{board_slug}"
              kind: "mad"
              body: "Some text"
            }
          }
        ) {
          card {
            id
            kind
            body
            author {
              id
            }
            boardId
          }
        }
      }
    GQL
  end
end
