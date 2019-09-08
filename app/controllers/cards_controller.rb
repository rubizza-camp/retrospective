# frozen_string_literal: true

class CardsController < ApplicationController
  before_action :set_board
  before_action :set_card, only: :destroy

  rescue_from ActionPolicy::Unauthorized do |ex|
    redirect_to @board, alert: ex.result.message
  end

  def create
    card = @board.cards.build(card_params.merge(author_id: current_user.id))
    authorize! card
    card.save!
    redirect_to @board
  end

  def destroy
    authorize! @card
    @card.destroy
    respond_to do |format|
      format.json { head :ok }
    end
  end

  private

  def card_params
    params.require(:card).permit(:kind, :body)
  end

  def set_board
    @board = Board.find_by!(slug: params[:board_slug])
  end

  def set_card
    @card = Card.find(params[:id])
  end
end
