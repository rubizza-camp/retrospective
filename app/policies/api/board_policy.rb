# frozen_string_literal: true

module API
  class BoardPolicy < ApplicationPolicy
    def suggestions?
      record.users.include?(user)
    end
  end
end
