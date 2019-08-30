# frozen_string_literal: true

module Boards
  class InviteUser
    include Resultable
    attr_reader :board, :user

    def initialize(board, user)
      @board = board
      @user = user
    end

    def call
      membership = board.memberships.build(role: 'member', user_id: user.id)
      membership.save!
      Success(email: user.email)
    rescue StandardError => e
      Failure(e)
    end
  end
end
