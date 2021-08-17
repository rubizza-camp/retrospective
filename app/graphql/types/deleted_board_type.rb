# frozen_string_literal: true

module Types
  class DeletedBoardType < Types::BaseObject
    field :board_slug, String, null: false
  end
end
