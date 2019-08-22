# frozen_string_literal: true

class BoardsController < ApplicationController
  # allow access boards#show without authentication for now
  before_action :authenticate_user!, except: :show
  before_action :set_board, only: :show

  def index
    @boards = Board.all
  end

  def show
    @cards_by_type = {
      mad: @board.cards.mad.includes(:author),
      sad: @board.cards.sad.includes(:author),
      glad: @board.cards.glad.includes(:author)
    }
    @action_items = @board.action_items
    @action_item = ActionItem.new(board_id: @board.id)
  end

  def new
    @board = Board.new(title: Date.today.strftime('%d-%m-%Y'))
  end

  def create
    @board = Board.new(board_params)
    @board.memberships.build(user_id: current_user.id, role: 'creator')
    byebug

    if @board.save
      redirect_to @board, notice: 'Board was successfully created.'
    else
      render :new
    end
  end

  private

  def board_params
    params.require(:board).permit(:title, :team_id, :email)
  end

  def set_board
    @board = Board.find_by(slug: params[:slug])
  end
end
