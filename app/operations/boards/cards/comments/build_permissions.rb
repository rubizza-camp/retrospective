# frozen_string_literal: true

module Boards
  module Cards
    module Comments
      class BuildPermissions
        IDENTIFIERS_SCOPES = %w[comment].freeze
        LIKE_COMMENT_IDENTIFIER = :like_comment

        include Dry::Monads[:result]
        attr_reader :comment, :user

        def initialize(comment, user)
          @comment = comment
          @user = user
          @board = Card.includes([:board]).find_by_id(comment.card_id).board
        end

        def call(identifiers_scope:)
          unless IDENTIFIERS_SCOPES.include?(identifiers_scope.to_s)
            return Failure('Unknown permissions identifiers scope provided')
          end

          permissions_data = build_author_permission(identifiers_scope: identifiers_scope)
          like_permissions_data = build_like_permission(@board.users.where.not(id: user.id))

          comment.comment_permissions_users.build(permissions_data + like_permissions_data)
          Success()
        end

        private

        def build_author_permission(identifiers_scope:)
          Permission.public_send(
            "#{identifiers_scope}_permissions"
          ).map do |permission|
            { permission_id: permission.id, user_id: user.id }
          end
        end

        def build_like_permission(users)
          like_permission = Permission.find_by(identifier: LIKE_COMMENT_IDENTIFIER)

          users.map do |user|
            { permission_id: like_permission.id, user_id: user.id }
          end
        end
      end
    end
  end
end
