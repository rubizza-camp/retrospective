# frozen_string_literal: true

class MembershipsController < ApplicationController
  before_action :set_board

  def invite
    @membership = Membership.new(membership_params.merge(board_id: @board.id, role: 'member'))

    if @membership.save
      redirect_to @board, notice: 'Member was successfully created.'
    else
      redirect_to @board, notice: 'Member WAS NOT successfully created.'
    end
  end
  
  private

  def membership_params
    params.require(:membership).permit(:user_id)
  end

  def set_board
    @board = Board.find(params[:id])
  end
end
