# frozen_string_literal: true

module Boards
  class Continue
    include Dry::Monads[:result]
    attr_reader :prev_board, :current_user

    def initialize(prev_board, current_user)
      @prev_board = prev_board
      @current_user = current_user
    end

    def call
      if prev_board.continued?
        raise StandardError.new "This board was already continued! Only one continuation per board is allowed!"  
      end

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
      prev_board.memberships
                .map(&:dup)
                .delete_if { |member| member.user == current_user }
                .each do |member|
                  member.role = 'member'
                  member.ready = false
                end
    end

    def default_board_name
      Date.today.strftime('%d-%m-%Y')
    end
  end
end
