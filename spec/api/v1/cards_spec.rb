# frozen_string_literal: true

require 'rails_helper'

describe 'Cards API', type: :request do
  let_it_be(:author) { create(:user) }
  let_it_be(:board) { create(:board) }
  let_it_be(:card) { create(:card) }

  before do
    login_as author
    allow(author).to receive(:allowed?).with('create_cards', board).and_return(true)
    allow(author).to receive(:allowed?).with('update_card', card).and_return(true)
    allow(author).to receive(:allowed?).with('destroy_card', card).and_return(true)
    allow(author).to receive(:allowed?).with('destroy_any_card', card).and_return(true)
  end

  describe 'POST /api/v1/cards' do
    let(:request) do
      post '/api/v1/cards', params: { body: 'my test card', kind: 'mad',
                                      board_slug: board.slug }
    end

    it 'return 200' do
      request

      expect(response.status).to eq(200)
    end

    it 'return created card' do
      request

      expect(json_body['body']).to eq('my test card')
    end

    it 'create card in db' do
      expect { request }.to change { Card.count }.by(1)
    end

    it 'broadcast created card' do
      expect { request }.to have_broadcasted_to('card').with(start_with('{"data":{"card":'))
    end
  end

  describe 'PUT /api/v1/cards/:id' do
    let_it_be(:card) { create(:card, board: board, author: author) }

    let(:request) { put "/api/v1/cards/#{card.id}", params: { body: 'new text' } }

    it 'return 200' do
      request

      expect(response.status).to eq(200)
    end

    it 'return updated card' do
      request

      expect(json_body['body']).to eq('new text')
    end

    it 'broadcast updated card' do
      expect { request }.to have_broadcasted_to('card').with(start_with('{"data":{"card":'))
    end
  end

  describe 'DELETE /api/v1/cards/:id' do
    let_it_be(:card) { create(:card, board: board, author: author) }

    let(:request) { delete "/api/v1/cards/#{card.id}" }

    it 'return 200' do
      request

      expect(response.status).to eq(200)
    end

    it 'return deleted card' do
      request
      handler = serialize_resource(card)

      expect(json_body['body']).to eq(JSON.parse(handler)['data']['card']['body'])
    end

    it 'delete card in db' do
      expect { request }.to change { Card.count }.by(-1)
    end

    it 'broadcast deleted card' do
      handler = serialize_resource(card)

      expect { request }.to have_broadcasted_to('card').from_channel(CardsChannel)
                                                       .with(handler)
    end
  end

  describe 'PUT /api/v1/cards/:id/like' do
    context 'like by not author of card' do
      let_it_be(:not_author) { create(:user) }
      let_it_be(:card) { create(:card, board: board, author: author) }

      let(:request) { put "/api/v1/cards/#{card.id}/like" }

      before do
        login_as not_author
        allow(not_author).to receive(:allowed?).with('like_card', card).and_return(true)
      end

      it 'return 200' do
        request

        expect(response.status).to eq(200)
      end

      it 'card became liked' do
        request

        expect(card.reload).to have_attributes(
          'likes' => 1
        )
      end

      it 'return liked card' do
        request
        handler = serialize_resource(card.reload)

        expect(json_body['body']).to eq(JSON.parse(handler)['data']['card']['body'])
      end

      it 'broadcast liked card' do
        handler = serialize_resource(card)

        expect { request }.to have_broadcasted_to('card').from_channel(CardsChannel)
                                                         .with(handler)
      end
    end
  end
end
