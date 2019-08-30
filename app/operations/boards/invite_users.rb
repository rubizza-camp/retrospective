# frozen_string_literal: true

module Boards
  class InviteUsers
    include Resultable
    attr_reader :board, :users

    def initialize(board, users)
      @board = board
      @users = users
    end

    def call
      users.each do |user|
        membership = board.memberships.build(role: 'member', user_id: user.id)
        membership.save
        # it will not return an error without an !, and with it it will not save entries at all
      end
      Success(email: users.pluck(:email))
    rescue StandardError => e
      Failure(e)
    end
  end
end
