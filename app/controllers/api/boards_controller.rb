# frozen_string_literal: true

module API
  class BoardsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_board
    before_action do
      authorize! @board
    end

    rescue_from ActionPolicy::Unauthorized do |ex|
      redirect_to @board, alert: ex.result.message
    end

    def invite
      users = Boards::FindUsers.new(board_params[:email]).call
      if users
        result = Boards::InviteUsers.new(@board, users).call
        render json: result
      else
        render json: { error: 'User was not found' }, status: 400
      end
    end

    def suggestions
      result = Boards::Suggestions.new(params[:autocomplete]).call
      render json: result
    end

    private

    def board_params
      params.require(:board).permit(:email)
    end

    def set_board
      @board = Board.find_by!(slug: params[:slug])
    end
  end
end
