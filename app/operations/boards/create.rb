# frozen_string_literal: true

module Boards
  class Create
    include Dry::Monads[:result]
    attr_reader :user

    def initialize(user)
      @user = user
    end

    def call(board_params)
      board = Board.new(board_params)

      board.transaction do
        board.memberships.build(user_id: user.id)
        Boards::BuildPermissions.new(board, user).call(identifiers_scope: 'creator')
        board.save!
      end
      Success(board)
    rescue StandardError => e
      Failure(e)
    end
  end
end
