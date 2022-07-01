# frozen_string_literal: true

class MembershipsChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'membership'
  end

  def unsubscribed
    stop_all_streams
  end
end
