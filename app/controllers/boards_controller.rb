# frozen_string_literal: true

class BoardsController < ApplicationController
  # allow access boards#show without authentication for now
  before_action :authenticate_user!, except: :show
  before_action :set_board, only: :show

  def index
    @boards = Board.all
  end

  # rubocop: disable Metrics/AbcSize
  def show
    @cards_by_type = {
      mad: @board.cards.mad.includes(:author),
      sad: @board.cards.sad.includes(:author),
      glad: @board.cards.glad.includes(:author)
    }
    @action_items = @board.action_items
    @action_item = ActionItem.new(board_id: @board.id)
    @previous_action_items = @board.previous_board.action_items unless @board.previous_board.nil?
  end
  # rubocop: enable Metrics/AbcSize

  def new
    @board = Board.new(title: Date.today.strftime('%d-%m-%Y'))
    @boards = Board.all
  end

  def create
    @board = Board.new(board_params)
    @board.memberships.build(user_id: current_user.id, role: 'creator')

    if @board.save
      redirect_to @board, notice: 'Board was successfully created.'
    else
      render :new
    end
  end

  private

  def board_params
    params.require(:board).permit(:title, :team_id, :email, :previous_board_id)
  end

  def set_board
    @board = Board.find(params[:id])
  end
end
