# frozen_string_literal: true

class ActionItemSerializer < ActiveModel::Serializer
  attributes :id, :body, :times_moved, :status, :board_id, :board_title

  belongs_to :author
  belongs_to :assignee
end
