# frozen_string_literal: true

class ActionItemsChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'action_item'
  end

  def unsubscribed
    stop_all_streams
  end
end
