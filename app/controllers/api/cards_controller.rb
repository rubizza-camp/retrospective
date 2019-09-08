# frozen_string_literal: true

module API
  class CardsController < ApplicationController

    before_action :set_board
    before_action :set_card
  
    rescue_from ActionPolicy::Unauthorized do |ex|
      redirect_to @board, alert: ex.result.message
    end

    def destroy
      authorize! @card
      @card.destroy   
      respond_to do |format|
        format.json { head :ok }
      end
    end

    private
  
    def set_board
      @board = Board.find_by!(slug: params[:board_slug])
    end
  
    def set_card
      @card = Card.find(params[:id])
    end
  end
end
