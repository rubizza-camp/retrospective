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

  def toggle_ready
    #if (membership = @board.memberships.find_by(user_id: current_user.id))
    #  membership.update(ready: !membership.ready)
    #  render json: membership.ready
    #end
    render json: current_user
  end

  private

  def set_board
    @board = Board.find(params[:board_id])
  end
end
