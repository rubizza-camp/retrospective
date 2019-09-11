# frozen_string_literal: true

class ActionItemPolicy < ApplicationPolicy
  def create?
    check?(:user_is_member)
  end

  def move?
    check?(:user_is_creator)
  end

  def user_is_creator
    check?(:user_is_member) &&
      user.memberships.find_by(board_id: record.board.id).role == 'creator'
  end

  def user_is_member
    record.board.users.include?(user)
  end
end
