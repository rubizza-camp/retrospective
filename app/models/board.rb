# frozen_string_literal: true

class Board < ApplicationRecord
  has_many :action_items
  has_many :cards
  has_many :memberships
  has_many :users, through: :memberships
  validates_presence_of :title

  before_create :set_slug

  def to_param
    slug
  end

  private

  def set_slug
    self.slug = Nanoid.generate(size: 20)
  end
end
