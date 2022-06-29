# frozen_string_literal: true

module API
  module V1
    class MembershipsController < API::V1::BaseController
      before_action only: %i[index current create] do
        @board = Board.find_by!(slug: params[:board_slug])
      end

      before_action only: %i[index current] do
        @current_membership = Membership.find_by!(user_id: current_user.id, board_id: @board.id)
      end

      before_action only: %i[destroy toggle_ready_status] do
        @membership = Membership.find(params[:id])
      end

      skip_verify_authorized only: %i[index current]

      # app/graphql/queries/memberships.rb
      def index
        memberships = @board.memberships.includes(:user)
        render json: serialize_resource(memberships)
      end

      # app/graphql/queries/membership.rb
      def current
        membership = @board.memberships.find_by(user: current_user)
        render json: serialize_resource(membership)
      end

      # app/graphql/mutations/invite_members_mutation.rb
      def create
        authorize! @board, to: :invite?, context: { user: current_user }

        users = Boards::FindUsersToInvite.new(params[:email], @board).call

        if users.any?
          result = Boards::InviteUsers.new(@board, users).call
          prepare_and_make_response(result.value!)
        else
          render_json_error('User was not found', :not_found)
        end
      end

      # app/graphql/mutations/destroy_membership_mutation.rb
      # rubocop:disable Metrics/MethodLength
      def destroy
        authorize! @membership,
                   context: { membership: Membership.find_by(user: current_user,
                                                             board: @membership.board) }

        @membership.transaction do
          @membership.board.board_permissions_users.where(user: @membership.user).destroy_all
          @membership.destroy
        end

        if @membership.persisted?
          render_json_error(@membership.errors.full_messages)
        else
          prepare_and_make_response(@membership)
        end
      end
      # rubocop:enable Metrics/MethodLength

      # app/graphql/mutations/toggle_ready_status_mutation.rb
      def toggle_ready_status
        authorize! @membership, to: :ready_toggle?,
                                context: { membership: @membership }

        if @membership.update(ready: !@membership.ready)
          prepare_and_make_response(@membership)
        else
          render_json_error(@membership.errors.full_messages)
        end
      end

      private

      def prepare_and_make_response(membership)
        payload = serialize_resource(membership)

        ActionCable.server.broadcast('membership', payload)
        render json: payload
      end
    end
  end
end
