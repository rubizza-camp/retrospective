# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Boards::InviteUsers do
  let(:user) { create(:user) }
  let(:board) { create(:board) }

  it 'creates membership' do
    described_class.new(board, [user.id]).call
    expect(board.users.find(user.id)).to eq user
  end

  it 'returns users emails' do
    result = described_class.new(board, [user.id]).call
    expect(result.value[:email]).to eq [user.email]
  end
end