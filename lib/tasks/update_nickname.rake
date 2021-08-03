# frozen_string_literal: true

namespace :db do
  desc 'update users with missing nickname'
  task set_nickname: :environment do
    User.find_each do |user|
      next if user.nickname.present?

      user.update(nickname: user.email[/^[^@]+/])
    end
  end
end
