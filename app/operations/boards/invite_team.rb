# frozen_string_literal: true

module Boards
  class InviteTeam
    include Resultable
    attr_reader :board, :team

    def initialize(board, team)
      @board = board
      @team = team
    end

    def call
      team.users.each do |user|
        membership = board.memberships.build(role: 'member', user_id: user.id)
        membership.save
        # it will not return an error without an !, and with it it will not save entries at all
      end
      Success(email: team.users.pluck(:email))
    rescue StandardError => e
      Failure(e)
    end
  end
end
