# frozen_string_literal: true

module Boards
  class FindUsers
    attr_reader :query_string

    def initialize(str)
      @query_string = str.split(',')
    end

    def call
      fitting_team(query_string) + fitting_users(query_string)
    end

    def fitting_users(str)
      User.where(email: str)
    end

    def fitting_team(str)
      User.joins(:teams).where(teams: { name: str })
    end
  end
end
