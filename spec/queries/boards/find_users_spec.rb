# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Boards::FindUsers do
  let_it_be(:user) { create(:user) }
  let_it_be(:team) { create(:team) }

  it 'finds user by email' do
    result = described_class.new(user.email).call
    expect(result).to eq [user]
  end

  it 'finds team users by team name' do
    result = described_class.new(team.name).call
    expect(result).to eq team.users
  end
end
