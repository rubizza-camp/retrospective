# frozen_string_literal: true

module Boards
  class Continue
    include Resultable
    attr_reader :prev_board

    def initialize(prev_board)
      @prev_board = prev_board
    end

    # rubocop: disable Metrics/AbcSize
    # rubocop: disable Metrics/MethodLength
    def call
      new_board = Board.new(
        title: default_board_name,
        previous_board_id: prev_board.id
      )
      prev_board.memberships.each do |member|
        new_board.memberships.build(user_id: member.user_id,
                                    role: member.role)
      end
      new_board.save

      Result.new(value: new_board, success?: true)
    rescue StandardError => e
      Result.new(error: e.message, success?: false)
    end
    # rubocop: enable Metrics/AbcSize
    # rubocop: enable Metrics/MethodLength

    def default_board_name
      Date.today.strftime('%d-%m-%Y')
    end
  end
end
