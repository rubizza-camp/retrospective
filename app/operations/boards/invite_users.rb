# frozen_string_literal: true

module Boards
  class InviteUsers
    include Resultable
    attr_reader :board, :users

    def initialize(board, users)
      @board = board
      @users = users
    end

    # rubocop: disable Metrics/AbcSize
    def call
      board_users_ids = board.users.pluck(:id)
      selected_ids = users.pluck(:id) - board_users_ids
      users_array = []
      selected_ids.each do |id|
        users_array << { role: 'member', user_id: id }
      end
      board.memberships.build(users_array)
      board.save
      users_emails = User.find(selected_ids).pluck(:email)
      Success(email: users_emails)
    end
    # rubocop: enable Metrics/AbcSize
  end
end
