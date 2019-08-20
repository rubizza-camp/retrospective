# frozen_string_literal: true

class MembershipsController < ApplicationController
  before_action :authenticate_user!, :set_board, :set_membership

  def create
    @membership = @board.memberships.build(user_id: current_user.id, role: :member)

    if @membership.save
      redirect_to @board, notice: "#{current_user.email.split('@').first} has joined the board!"
    else
      redirect_to @board, alert: @membership.errors.full_messages.join(', ')
    end
  end

  # send json with current_user ready status for now
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
    @board = Board.find(params[:board_id])
  end

  def set_membership
    @membership = @board.memberships.find_by(user_id: current_user.id)
  end
end
