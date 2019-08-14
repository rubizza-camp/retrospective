# frozen_string_literal: true

class MembershipsController < ApplicationController
  def invite
    @board = Board.find(params[:id])
    email = params[:membership][:email]
    if (user = User.find_by(email: email))
      @membership = Membership.new(board_id: @board.id, user_id: user.id, role: 'member')

      if @membership.save
        redirect_to @board, notice: 'Member was successfully created.'
      else
        redirect_to @board, notice: 'Member WAS NOT successfully created.'
      end

    else
      redirect_to @board, notice: 'User with this email not exists'
    end
  end
end
