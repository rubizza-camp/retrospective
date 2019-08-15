# frozen_string_literal: true

class MembershipsController < ApplicationController
  def create
    authenticate_user!
    @board = Board.find(params[:board_id])
    @membership = @board.memberships.build(user_id: current_user.id, role: :member)

    if @membership.save
      redirect_to @board, notice: "#{current_user.email} user has joined the board!"
    else
      redirect_to @board, alert: @membership.errors.full_messages.join(', ')
    end
  end
end
