# frozen_string_literal: true

module API
  class MembershipsController < ApplicationController
    before_action :authenticate_user!, :set_board, :set_membership
    before_action except: :index do
      authorize! @membership
    end
    skip_verify_authorized only: :index

    rescue_from ActionPolicy::Unauthorized do |ex|
      render json: { error: ex.result.message }, status: :unauthorized
    end

    def index
      members = @board.memberships
      render json: members, each_serializer: MembershipSerializer
    end

    def destroy
      member = Membership.find(params[:id])
      if member.destroy
        head :ok
      else
        render json: { error: member.errors.full_messages.join(',') }, status: :bad_request
      end
    end

    def ready_status
      render json: @membership.ready
    end

    def ready_toggle
      @membership.update(ready: !@membership.ready)
      render json: @membership.ready
    end

    private

    def membership_params
      params.require(:membership).permit(:email)
    end

    def set_board
      @board = Board.find_by!(slug: params[:board_slug])
    end

    def set_membership
      @membership = @board.memberships.find_by(user_id: current_user.id)
    end
  end
end
