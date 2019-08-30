# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Boards::InviteUsers do
  let_it_be(:user) { create(:user) }
  let_it_be(:board) { create(:board) }

  it 'creates membership' do
    described_class.new(board, [user]).call
    expect(board.users.find(user.id)).to eq user
  end

  it 'returns users emails' do
    result = described_class.new(board, [user]).call
    expect(result.value[:email]).to eq [user.email]
  end
end
