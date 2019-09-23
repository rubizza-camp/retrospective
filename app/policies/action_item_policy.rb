# frozen_string_literal: true

class ActionItemPolicy < ApplicationPolicy
  authorize :board, allow_nil: true

  def create?
    check?(:user_is_creator?)
  end

  def move?
    check?(:user_is_creator?)
  end

  def close?
    check?(:user_is_creator?)
  end

  def complete?
    check?(:user_is_creator?)
  end

  def reopen?
    check?(:user_is_creator?)
  end

  def user_is_creator?
    board.creator?(user)
  end
end
