# frozen_string_literal: true

module API
  class BoardsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_board, only: %i[invite suggestions]

    # rubocop: disable Metrics/MethodLength
    # rubocop: disable Metrics/AbcSize
    def invite
      authorize! @board
      user = User.find_by(email: board_params[:email])
      if user
        membership = @board.memberships.build(role: 'member', user_id: user.id)
        if membership.save
          render json: { email: user.email }
        else
          render json: { error: membership.errors.full_messages.join(',') }, status: 400
        end
      else
        render json: { error: 'User was not found' }, status: 400
      end
    end
    # rubocop: enable Metrics/MethodLength
    # rubocop: enable Metrics/AbcSize

    def suggestions
      authorize! @board
      users = User.where('email LIKE ?', "#{params[:autocomplete]}%")
                  .or(User.where('uid LIKE ?', "#{params[:autocomplete]}%")).pluck(:email)
      render json: users
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
