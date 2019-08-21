# frozen_string_literal: true

require 'nanoid'

class Board < ApplicationRecord
  has_many :action_items
  has_many :cards
  has_many :memberships
  has_many :users, through: :memberships
  validates_presence_of :title

  before_create :set_slug  
  
  private  
  
  def set_slug
    #loop do
      self.slug = Nanoid.generate(size: 10)
      #break unless Board.where(slug: slug).exists?
    #end
  end
end
