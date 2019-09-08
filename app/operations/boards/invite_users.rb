# frozen_string_literal: true

module Boards
  class InviteUsers
    include Resultable
    attr_reader :board, :users_ids

    def initialize(board, users_ids)
      @board = board
      @users_ids = users_ids
    end

    def call
      users_array = []
      users_ids.each do |id|
        users_array << { role: 'member', user_id: id }
      end
      board.memberships.build(users_array)
      board.save
      users_emails = User.find(users_ids).pluck(:email)
      Success(email: users_emails)
    end
  end
end
