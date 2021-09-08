# frozen_string_literal: true

class BoardSerializer < ActiveModel::Serializer
  USERS_LIMIT = 4

  attributes :id, :title, :slug, :created_at, :users_count, :private
  attribute :users, if: :include_users?

  def users
    if @instance_options[:include_users] == :limited
      object.users.limit(USERS_LIMIT)
    else
      object.users
    end
  end

  def boards_count
    Boards::GetHistoryOfBoard.new(id).call.count
  end

  def include_users?
    %i[all limited].include?(@instance_options[:include_users])
  end
end
