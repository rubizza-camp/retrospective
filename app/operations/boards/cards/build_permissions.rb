# frozen_string_literal: true

module Boards
  module Cards
    class BuildPermissions
      IDENTIFIERS_SCOPES = %w[card].freeze
      LIKE_CARD_IDENTIFIER = :like_card

      include Dry::Monads[:result]
      attr_reader :card, :user

      def initialize(card, user)
        @card = card
        @user = user
      end

      def call(identifiers_scope:)
        unless IDENTIFIERS_SCOPES.include?(identifiers_scope.to_s)
          return Failure('Unknown permissions identifiers scope provided')
        end

        permissions_data = build_author_permissions(identifiers_scope: identifiers_scope)
        like_permissions_data = build_like_permission(card.board.users.where.not(id: user.id))

        card.card_permissions_users.build(permissions_data + like_permissions_data)
        Success()
      end

      private

      def build_author_permissions(identifiers_scope:)
        Permission.public_send(
          "#{identifiers_scope}_permissions"
        ).map do |permission|
          { permission_id: permission.id, user_id: user.id }
        end
      end

      def build_like_permission(users)
        like_permission = Permission.find_by(identifier: LIKE_CARD_IDENTIFIER)

        users.map do |user|
          { permission_id: like_permission.id, user_id: user.id }
        end
      end
    end
  end
end
