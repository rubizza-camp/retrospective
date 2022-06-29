# frozen_string_literal: true

class CardsChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'card'
  end

  def unsubscribed
    stop_all_streams
  end
end
