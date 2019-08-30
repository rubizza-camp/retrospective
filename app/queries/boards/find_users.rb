# frozen_string_literal: true

module Boards
  class FindUsers
    attr_reader :query_string

    def initialize(str)
      @query_string = str
    end

    def call
      {
        user: fitting_user(query_string),
        team: fitting_team(query_string)
      }
    end

    def fitting_user(str)
      User.find_by(email: str)
    end

    def fitting_team(str)
      Team.find_by(name: str)
    end
  end
end
