# frozen_string_literal: true

module API
  class UserPolicy < ApplicationPolicy
    def suggestions?
      # record.board.users.include?(user)
      puts record
      true
    end
  end
end
