# frozen_string_literal: true

class ActionItem < ApplicationRecord
  include AASM

  belongs_to :board

  validates_presence_of :body, :status

  aasm column: 'status' do
    state :pending, initial: true
    state :closed
    state :done

    event :close do
      transitions from: :pending, to: :closed
    end

    event :complete do
      transitions from: :pending, to: :done
    end

    event :reopen do
      transitions from: :closed, to: :pending
      transitions from: :done, to: :pending
    end
  end

  def move!(board)
    self.board_id = board.id
    save
  end
end
