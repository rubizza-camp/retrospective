# frozen_string_literal: true

class User < ApplicationRecord
  devise :database_authenticatable, :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: %i[alfred google facebook developer github]

  has_many :cards, foreign_key: :author_id
  has_many :comments, foreign_key: :author_id
  has_many :memberships
  has_many :boards, through: :memberships
  has_many :board_permissions_users, dependent: :destroy
  has_many :board_permissions, through: :board_permissions_users, source: :permission
  has_many :card_permissions_users, dependent: :destroy
  has_many :card_permissions, through: :card_permissions_users, source: :permission
  has_many :comment_permissions_users, dependent: :destroy
  has_many :comment_permissions, through: :comment_permissions_users, source: :permission
  has_many :action_items, foreign_key: 'assignee_id', class_name: 'ActionItem'

  has_and_belongs_to_many :teams

  validates :provider, presence: true
  validates :uid, presence: true, uniqueness: { scope: :provider }
  validates :nickname, presence: true, uniqueness: true

  mount_base64_uploader :avatar, AvatarUploader

  def self.from_omniauth(provider, uid, info)
    user = find_by(provider: provider, uid: uid) || find_by(email: info[:email]) || new

    user.tap do |u|
      u.provider = provider
      u.uid = uid
      u.email = info[:email]
      u.remote_avatar_url = info[:image] || info[:avatar_url] if u.changed?

      u.send :new_user_settings, info
      u.save
    end
  end

  def allowed?(identifier, resource)
    permission = Permission.find_by(identifier: identifier)
    resource_name = resource.class.to_s.downcase

    public_send("#{resource_name}_permissions_users").where("#{resource_name}": resource,
                                                            permission: permission).any?
  end

  def creator?(board)
    board_permissions_users
      .exists?(permission: Permission.find_by_identifier(Permission::MASTER_CREATOR_ID),
               board: board)
  end

  private

  def new_user_settings(info)
    return unless new_record?

    self.password = Devise.friendly_token[0, 20]
    self.nickname = info[:nickname] || (email && email[/^[^@]+/])
    self.first_name = info[:first_name] if info[:first_name]
    self.last_name = info[:last_name] if info[:last_name]
  end
end
