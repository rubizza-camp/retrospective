# frozen_string_literal: true

class ActionItemPolicy < ApplicationPolicy
  authorize :board, allow_nil: true

  def create?
    user.allowed?('create_action_items', board)
  end

  def update?
    user.allowed?('update_action_items', current_board)
  end

  def destroy?
    user.allowed?('destroy_action_items', current_board)
  end

  def move?
    user.allowed?('move_action_items', current_board) && record.pending?
  end

  def closed?
    user.allowed?('close_action_items', current_board) && record.may_closed?
  end

  def done?
    user.allowed?('complete_action_items', current_board) && record.may_done?
  end

  def pending?
    user.allowed?('reopen_action_items', current_board) && record.may_pending?
  end

  def in_progress?
    true
    # user.allowed?('in_progress_action_items', current_board) && record.may_in_progress?
  end

  def current_board
    board || record.board
  end
end
