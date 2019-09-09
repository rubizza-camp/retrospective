# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Boards::FindUsersToInvite do
  let(:user) { create(:user) }
  let(:team) { create(:team, :with_users) }
  let(:board) { create(:board) }

  it 'finds user by email' do
    result = described_class.new(user.email, board).call
    expect(result).to eq [user]
  end

  it 'finds team users by team name' do
    result = described_class.new(team.name, board).call
    expect(result).to eq team.users
  end
end
