# frozen_string_literal: true

module API
  class MembershipPolicy < ApplicationPolicy
    authorize :membership_to_destroy, allow_nil: true

    def ready_status?
      check?(:user_is_member?)
    end

    def ready_toggle?
      check?(:user_is_member?)
    end

    def destroy?
      check?(:user_is_creator?) && !membership_to_destroy.creator?
    end

    def user_is_member?
      record.user == user
    end

    def user_is_creator?
      record.board.creator?(user)
    end
  end
end
