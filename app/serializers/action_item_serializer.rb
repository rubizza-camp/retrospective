# frozen_string_literal: true

class ActionItemSerializer < ActiveModel::Serializer
  attributes :id, :body, :times_moved, :status, :assignee_avatar_url
  belongs_to :author

  def assignee_avatar_url
    object.assignee.avatar.thumb.url if object.assignee
  end
end
