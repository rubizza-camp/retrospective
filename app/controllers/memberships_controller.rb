# frozen_string_literal: true

class MembershipsController < ApplicationController

  #def create
  #  @board.cards.create(card_params.merge(author_id: current_user.id))
  #  redirect_to @board
  #end

  private

  def membership_params
    params.require(:membership).permit! #(:kind, :body)
  end
end
