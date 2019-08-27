# frozen_string_literal: true

class MembershipPolicy < ApplicationPolicy
  def create?
    true
  end
end
