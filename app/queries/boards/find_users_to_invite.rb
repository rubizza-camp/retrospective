# frozen_string_literal: true

module Boards
  class FindUsersToInvite
    attr_reader :query_string, :board

    def initialize(str, board)
      @query_string = str.split(',')
      @board = board
    end

    def call
      all_users = User.joins(:teams)
                      .where('teams.name IN (?) or users.email IN (?)', query_string, query_string)
                      .distinct
      all_users - board.users
    end
  end
end
