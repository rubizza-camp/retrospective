# frozen_string_literal: true

module Mutations
  class ContinueBoardMutation < Mutations::BaseMutation
    argument :board_slug, String, required: true

    field :board_slug, String, null: true

    # rubocop:disable Metrics/MethodLength
    def resolve(board_slug:)
      board = Board.find_by_slug(board_slug)
      authorize! board, to: :continue?, context: { user: context[:current_user] }

      result = Boards::Continue.new(board, context[:current_user]).call
      if result.success?
        RetrospectiveSchema.subscriptions.trigger('board_continued',
                                                  { board_slug: result.value!.slug },
                                                  board_slug: result.value!.slug)
        { board_slug: result.value!.slug }
      else
        { errors: { full_messages: board.errors.full_messages } }
      end
    end
    # rubocop:enable Metrics/MethodLength
  end
end
