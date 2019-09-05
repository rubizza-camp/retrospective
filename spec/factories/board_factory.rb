# frozen_string_literal: true

FactoryBot.define do
  factory :board do
    title { Date.today.strftime('%d-%m-%Y') }
    # slug { Nanoid.generate(size: 10) }
  end
end
