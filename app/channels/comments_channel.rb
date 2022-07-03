# frozen_string_literal: true

class CommentsChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'comment'
  end

  def unsubscribed
    stop_all_streams
  end
end
