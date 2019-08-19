# frozen_string_literal: true

class MembershipsController < ApplicationController
  before_action :authenticate_user!, :set_board

  def create
    @membership = @board.memberships.build(user_id: current_user.id, role: :member)

    if @membership.save
      redirect_to @board, notice: "#{current_user.email.split('@').first} has joined the board!"
    else
      redirect_to @board, alert: @membership.errors.full_messages.join(', ')
    end
  end

  def index
    users = @board.users.pluck(:email)
    render json: users
  end

  private

  def membership_params
    params.require(:membership).permit(:email)
  end

  def set_board
    @board = Board.find(params[:board_id])
  end
end
