# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Boards::FindUsersToInvite do
  let_it_be(:user) { create(:user) }
  let_it_be(:team) { create(:team) }
  let_it_be(:board) { create(:board) }

  it 'finds user by email' do
    result = described_class.new(user.email, board).call
    expect(result).to eq [user.id]
  end

  it 'finds team users by team name' do
    result = described_class.new(team.name, board).call
    expect(result).to eq team.users.ids
  end
end
