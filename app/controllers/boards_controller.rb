# frozen_string_literal: true

class BoardsController < ApplicationController
  before_action :authenticate_user!

  def index
    @boards = Board.all
  end

  def show
    @board = Board.find(params[:id])
    @cards_by_type = {
      mad: @board.cards.mad,
      sad: @board.cards.sad,
      glad: @board.cards.glad
    }
    @action_items = @board.action_items
  end
end
