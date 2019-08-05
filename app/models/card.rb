# frozen_string_literal: true

class Card < ApplicationRecord
  belongs_to :user
  belongs_to :board
end
