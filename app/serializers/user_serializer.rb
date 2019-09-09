# frozen_string_literal: true

class UserSerializer < ActiveModel::Serializer
  attributes :email, :readiness

  def readiness
    object.memberships.find_by(board_id: instance_options[:board_id]).ready
  end
end
