# frozen_string_literal: true

module Types
  class ActionItemType < Types::BaseObject
    field :id, Int, null: false
    field :body, String, null: false
    field :times_moved, Int, null: false
    field :assignee, Types::UserType, null: true
    field :assignee_avatar_url, String, null: true
    field :status, String, null: true
    field :author, Types::UserType, null: false

    def assignee_avatar_url
      object.assignee.avatar.thumb.url if object.assignee
    end
  end
end
