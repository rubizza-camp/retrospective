# frozen_string_literal: true

class CardPolicy < ApplicationPolicy
  def create?
    record.board.users.include?(user)
  end

  def destroy?
    record.author == user
  end
end
