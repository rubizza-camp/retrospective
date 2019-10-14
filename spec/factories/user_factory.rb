# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
    guest { false }

    trait :github do
      provider { 'github' }
      uid { 1234 }
    end
  end
end
