# frozen_string_literal: true

module Boards
  module Cards
    class Create
      include Dry::Monads[:result]
      attr_reader :user, :board

      def initialize(user, board)
        @board = board
        @user = user
      end

      def call(card_params)
        card = Card.new(card_params.merge(author: user, board: board))
        card.transaction do
          Boards::Cards::BuildPermissions.new(card, user).call(identifiers_scope: 'card')
          card.save!
        end
        Success(card)
      rescue StandardError => e
        Failure(e)
      end
    end
  end
end
