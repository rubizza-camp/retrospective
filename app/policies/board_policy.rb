# frozen_string_literal: true

class BoardPolicy < ApplicationPolicy
  # everyone can see any board
  def index?
    true
  end

  def show?
    true
  end

  def new?
    true
  end

  def create?
    true
  end

  def continue?
    true
  end
end
