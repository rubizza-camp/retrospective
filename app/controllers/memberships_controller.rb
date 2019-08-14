# frozen_string_literal: true

class MembershipsController < ApplicationController
  before_action :set_board

  def invite
    id = params[:membership][:id]
    user = User.find(id)
    @membership = Membership.new(board_id: @board.id, user_id: user.id, role: 'member')

    if @membership.save
      redirect_to @board, notice: 'Member was successfully created.'
    else
      redirect_to @board, notice: 'Member WAS NOT successfully created.'
    end
  end

  def set_board
    @board = Board.find(params[:id])
  end
end
