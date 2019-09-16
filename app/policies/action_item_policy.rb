# frozen_string_literal: true

class ActionItemPolicy < ApplicationPolicy
  def create?
    check?(:user_is_creator)
  end

  def move?
    check?(:user_is_creator)
  end

  def user_is_creator
    user.memberships.find_by(board_id: record.id, role: 'creator') ? true : false
  end
end
