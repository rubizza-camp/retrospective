# frozen_string_literal: true

module Boards
  class Continue
    include Resultable
    attr_reader :prev_board, :current_user

    def initialize(prev_board, current_user)
      @prev_board = prev_board
      @current_user = current_user
    end

    def call
      new_board = Board.new(
        title: default_board_name,
        previous_board_id: prev_board.id
      )
      new_board.memberships = duplicate_memberships
      new_board.memberships.build(user_id: current_user.id, role: 'creator')
      new_board.save!

      Success(new_board)
    rescue StandardError => e
      Failure(e)
    end

    def duplicate_memberships
      prev_board.memberships.map do |member|
        if member.user_id == current_user.id
          member.dup.tap { |m| m.role = 'creator' }
        else
          member.dup.tap { |m| m.role = 'member' }
        end
      end
    end

    def default_board_name
      Date.today.strftime('%d-%m-%Y')
    end
  end
end
