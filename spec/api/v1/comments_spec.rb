# frozen_string_literal: true

require 'rails_helper'

describe 'Comments API', type: :request do
  let_it_be(:author) { create(:user) }
  let_it_be(:board) { create(:board) }
  let_it_be(:card) { create(:card, board: board, author: author) }

  describe 'POST /api/v1/comments' do
    let(:request) do
      post '/api/v1/comments', params: { content: 'my test comment', card_id: card.id }
    end
    before do
      login_as author
      allow(author).to receive(:allowed?).with('create_comments', board).and_return(true)
    end

    it 'return 200' do
      request

      expect(response.status).to eq(200)
    end

    it 'return created comment' do
      request

      expect(json_body['data']['comment']).to include('content' => 'my test comment')
    end

    it 'create comment in db' do
      expect { request }.to change { Comment.count }.by(1)
    end

    it 'broadcast created comment' do
      expect { request }.to have_broadcasted_to('comment').from_channel(ActionItemsChannel)
                                                          .with(start_with('{"data":{"comment":'))
    end
  end

  describe 'PUT /api/v1/comments/:id' do
    let_it_be(:comment) { create(:comment, card: card, author: author) }

    let(:request) { put "/api/v1/comments/#{comment.id}", params: { content: 'new text' } }
    before do
      login_as author

      allow(author).to receive(:allowed?).with('update_comment', comment).and_return(true)
    end
    it 'return 200' do
      request

      expect(response.status).to eq(200)
    end

    it 'return updated comment' do
      request
      handler = serialize_resource(comment.reload)

      expect(json_body).to eq(JSON.parse(handler))
    end

    it 'broadcast updated comment' do
      handler = serialize_resource(comment)

      expect { request }.to have_broadcasted_to('comment').from_channel(ActionItemsChannel)
                                                          .with(handler)
    end
  end

  describe 'DELETE /api/v1/comments/:id' do
    let_it_be(:comment) { create(:comment, card: card, author: author) }

    let(:request) { delete "/api/v1/comments/#{comment.id}" }
    before do
      login_as author
      allow(author).to receive(:allowed?).with('destroy_comment', comment).and_return(true)
    end

    it 'return 200' do
      request

      expect(response.status).to eq(200)
    end

    it 'return deleted comment' do
      request
      handler = serialize_resource(comment)

      expect(json_body).to eq(JSON.parse(handler))
    end

    it 'delete comment in db' do
      expect { request }.to change { Comment.count }.by(-1)
    end

    it 'broadcast deleted comment' do
      handler = serialize_resource(comment)

      expect { request }.to have_broadcasted_to('comment').from_channel(ActionItemsChannel)
                                                          .with(handler)
    end
  end

  describe 'PUT /api/v1/comments/:id/like' do
    context 'like by not author of comment' do
      let_it_be(:not_author) { create(:user) }
      let_it_be(:comment) { create(:comment, card: card, author: author) }

      let(:request) { put "/api/v1/comments/#{comment.id}/like" }

      before do
        login_as not_author
        allow(not_author).to receive(:allowed?).with('like_comment', comment).and_return(true)
      end

      it 'return 200' do
        request

        expect(response.status).to eq(200)
      end

      it 'comment became liked' do
        request

        expect(comment.reload).to have_attributes(
          'likes' => 1
        )
      end

      it 'return liked comment' do
        request
        handler = serialize_resource(comment.reload)

        expect(json_body).to eq(JSON.parse(handler))
      end

      it 'broadcast liked comment' do
        handler = serialize_resource(comment)

        expect { request }.to have_broadcasted_to('comment').from_channel(ActionItemsChannel)
                                                            .with(handler)
      end
    end
  end
end
