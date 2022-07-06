# frozen_string_literal: true

class BoardSerializer < ActiveModel::Serializer
  USERS_LIMIT = 4

  # rubocop:disable Layout/LineLength
  attributes :id, :title, :slug, :created_at, :users_count, :private, :boards_count, :column_emojis, :next_board_slug, :previous_board_slug, :column_names
  # rubocop:enable Layout/LineLength
  attribute :users, if: :include_users?
  attribute :previous_action_items
  has_many :action_items
  attribute :cards_by_type

  def previous_action_items
    return [] unless object.previous_board

    ActiveModelSerializers::SerializableResource.new(object.previous_board.action_items).as_json
  end

  def previous_board_slug
    object.previous_board&.slug
  end

  def next_board_slug
    object.next_board&.slug
  end

  def users
    if @instance_options[:include_users] == :limited
      object.users.limit(USERS_LIMIT)
    else
      object.users
    end
  end

  def cards_by_type
    object.column_names.map do |column|
      [[column, ActiveModelSerializers::SerializableResource.new(object.cards.where(kind: column)
        .includes(:author, comments: [:author]).order(created_at: :desc)).as_json]].to_h
    end.reduce({}, :merge).as_json
  end

  def boards_count
    Boards::GetHistoryOfBoard.new(object.id).call.count
  end

  def include_users?
    %i[all limited].include?(@instance_options[:include_users])
  end
end