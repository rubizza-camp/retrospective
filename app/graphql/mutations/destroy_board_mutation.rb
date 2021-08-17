# frozen_string_literal: true

module Mutations
  class DestroyBoardMutation < Mutations::BaseMutation
    argument :board_slug, String, required: true

    field :board_slug, String, null: true

    def resolve(board_slug:)
      board = Board.find_by_slug(board_slug)
      authorize! board, to: :destroy?, context: { user: context[:current_user] }

      if board.destroy
        RetrospectiveSchema.subscriptions.trigger('board_destroyed',
                                                  { board_slug: board_slug },
                                                  board_slug: board_slug)
        { board_slug: board_slug }
      else
        { errors: { full_messages: board.errors.full_messages } }
      end
    end
  end
end
