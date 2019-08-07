# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email { 'user@example.com' }
    password { 'password' }
    password_confirmation { 'password' }

    factory :github_user do
      provider { 'github' }
      uid { 1234 }
    end
  end
end
