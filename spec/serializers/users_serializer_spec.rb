# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserSerializer do
  let_it_be(:board) { create(:board) }
  let_it_be(:user) { create(:user) }
  let_it_be(:membership) { create(:membership, user: user, board: board) }

  subject { described_class.new(user, board_id: board.id).to_json }

  it 'makes json with email' do
    expect(subject).to include "\"email\":\"#{user.email}\""
  end

  it 'makes json with readiness' do
    expect(subject).to include "\"readiness\":#{user.memberships.find_by(board_id: board.id).ready}"
  end
end
