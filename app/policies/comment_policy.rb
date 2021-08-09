# frozen_string_literal: true

class CommentPolicy < ApplicationPolicy
  def update?
    user.allowed?('update_comment', record)
  end

  def destroy?
    user.allowed?('destroy_comment', record)
  end

  def like?
    user.allowed?('like_comment', record)
  end
end
