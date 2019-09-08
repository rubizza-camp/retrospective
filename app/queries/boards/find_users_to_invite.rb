# frozen_string_literal: true

module Boards
  class FindUsersToInvite
    attr_reader :query_string, :board

    def initialize(str, board)
      @query_string = str.split(',')
      @board = board
    end

    def call
      all_users = fitting_team(query_string) + fitting_users(query_string)
      all_users - board.users.ids
    end

    private

    def fitting_users(str)
      User.where(email: str).ids
    end

    def fitting_team(str)
      User.joins(:teams).where(teams: { name: str }).ids
    end
  end
end
