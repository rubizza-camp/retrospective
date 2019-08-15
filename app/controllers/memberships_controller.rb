# frozen_string_literal: true

class MembershipsController < ApplicationController
  before_action :set_board

  # def invite
  #   membership = Membership.new(membership_params.merge(board_id: @board.id, role: 'member'))

  #   if membership.save
  #     redirect_to @board, notice: 'Member was successfully created.'
  #   else
  #     redirect_to @board, alert: @membership.errors.full_messages.join(', ')
  #   end
  # end

  def invite
  	user = User.find_by(email: membership_params[:email])
    if user 
      membership = Membership.new(board_id: @board.id, role: 'member', user_id: user.id)
      membership.save
      redirect_to @board, notice: 'Member was successfully created.'
    else
    	redirect_to @board, alert: 'Member was NOT created.'
    end
  end
  
  private

  # def membership_params
  #   params.require(:membership).permit(:user_id)
  # end

  def membership_params
    params.require(:membership).permit(:email)
  end

  def set_board
    @board = Board.find(params[:id])
  end
end
