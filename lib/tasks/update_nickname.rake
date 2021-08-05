# frozen_string_literal: true

namespace :db do
  desc 'update users with missing nickname'
  task set_nickname: :environment do
    User.where(nickname: [nil, '']).update_all("nickname=substring(email, '^[^@]+')")
  end
end
