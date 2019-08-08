# frozen_string_literal: true

class CardsController < ApplicationController
  
  before_action :set_board

  def create
    @card = @board.cards.new(card_params)
    @card.author_id = current_user.id
    unless @card.save
      # error handling wip
    end
    redirect_to board_path(@board.id)
  end

  private

  def card_params
    params.require(:card).permit(:kind, :body)
  end

  def set_board
    @board = Board.find(params[:board_id])
  end
end
