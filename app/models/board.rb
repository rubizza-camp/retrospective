# frozen_string_literal: true

class Board < ApplicationRecord
  has_many :action_items, dependent: :restrict_with_error
  has_many :cards, dependent: :destroy
  has_many :memberships, dependent: :destroy
  has_many :users, through: :memberships
  has_many :board_permissions_users, dependent: :destroy
  validates_presence_of :title

  after_create :send_action_items

  belongs_to :previous_board, class_name: 'Board', optional: true
  before_create :set_slug

  scope :member_boards, lambda { |user|
    where.not(id: Board.select(:previous_board_id).where.not(previous_board_id: nil))
         .joins(board_permissions_users: :permission)
         .where(permissions: { identifier: :toggle_ready_status },
                board_permissions_users: { user_id: user.id })
         .order(created_at: :desc)
  }

  scope :creator_boards, lambda { |user|
    where.not(id: Board.select(:previous_board_id).where.not(previous_board_id: nil))
         .joins(board_permissions_users: :permission)
         .where(permissions: { identifier: :destroy_board },
                board_permissions_users: { user_id: user.id })
         .order(created_at: :desc)
  }

  def to_param
    slug
  end

  private

  def set_slug
    loop do
      self.slug = Nanoid.generate(size: 10)
      break unless Board.where(slug: slug).exists?
    end
  end

  def send_action_items
    DailyActionItemsJob.set(wait: 1.day).perform_later(self)
  end
end
