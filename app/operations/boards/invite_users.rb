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
      selected_users = users.reject { |user| board.users.include?(user) }
      selected_users.each do |user|
        membership = board.memberships.build(role: 'member', user_id: user.id)
        membership.save
      end

      Success(email: selected_users.pluck(:email))
    end
  end
end
