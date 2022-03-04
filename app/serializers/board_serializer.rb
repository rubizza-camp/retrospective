# frozen_string_literal: true

class BoardSerializer < ActiveModel::Serializer
  USERS_LIMIT = 4

  # rubocop:disable Layout/LineLength
  attributes :id, :title, :slug, :created_at, :users_count, :private, :boards_count, :column_emojis, :next_board_slug, :previous_board_slug
  # rubocop:enable Layout/LineLength
  attribute :users, if: :include_users?
  attribute :previous_action_items
  has_many :action_items

  def previous_action_items
    if object.previous_board.nil?
      []
    else
      object.previous_board.action_items
    end
  end

  def previous_board_slug
    if object.previous_board.nil?
      object.previous_board&.slug = null
    else
      object.previous_board&.slug
    end
  end
  
  def next_board_slug
    if object.next_board.nil?
      object.next_board&.slug = null
    else
      object.next_board&.slug
    end
  end

  def users
    if @instance_options[:include_users] == :limited
      object.users.limit(USERS_LIMIT)
    else
      object.users
    end
  end

  def boards_count
    Boards::GetHistoryOfBoard.new(object.id).call.count
  end

  def include_users?
    %i[all limited].include?(@instance_options[:include_users])
  end
end
