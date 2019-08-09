# frozen_string_literal: true

class ActionItemsController < ApplicationController
  before_action :set_board

  def create
    @action_item = @board.action_items.new(action_item_params)
    unless @action_item.save
      # error handling wip
    end
    redirect_to board_path(@board.id)
  end

  private

  def action_item_params
    params.require(:action_item).permit(:status, :body)
  end

  def set_board
    @board = Board.find(params[:board_id])
  end
end
