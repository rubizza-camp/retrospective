# frozen_string_literal: true

class ActionItem < ApplicationRecord
  include AASM

  belongs_to :author, class_name: 'User'
  belongs_to :assignee, class_name: 'User', optional: true
  belongs_to :board
  delegate :title, to: :board, prefix: :board

  validates_presence_of :body, :status

  aasm column: 'status' do
    state :pending, initial: true
    state :in_progress
    state :done
    state :closed

    event :closed do
      transitions from: :pending, to: :closed
      transitions from: :in_progress, to: :closed
      transitions from: :done, to: :closed
    end

    event :done do
      transitions from: :pending, to: :done
      transitions from: :in_progress, to: :done
    end

    event :in_progress do
      transitions from: :pending, to: :in_progress
      transitions from: :done, to: :in_progress
    end

    event :pending do
      transitions from: :closed, to: :pending
      transitions from: :done, to: :pending
      transitions from: :in_progress, to: :pending
    end
  end

  def move!(board)
    self.board_id = board.id
    increment(:times_moved)
    save
  end
end
