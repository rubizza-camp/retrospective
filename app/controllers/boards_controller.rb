# frozen_string_literal: true

class BoardsController < ApplicationController
  before_action :authenticate_user!

  def index
    @boards = Board.all
  end

  def show
    @board = Board.find(params[:id])
    @cards = @board.cards
    @action_items = @board.action_items
  end
end
