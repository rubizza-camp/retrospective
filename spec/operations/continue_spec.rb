# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Boards::Continue do
  include Dry::Monads[:result]

  let_it_be(:prev_creator) { create(:user) }
  let_it_be(:current_user) { create(:user) }
  let_it_be(:prev_board) { create(:board) }
  let_it_be(:creatorship) do
    create(:membership, board: prev_board, user: prev_creator, role: 'creator', ready: true)
  end
  let_it_be(:membership) do
    create(:membership, board: prev_board, user: current_user, role: 'member')
  end

  subject { described_class.new(prev_board, current_user).call }

  context 'when prev_board was previously continued' do
    before do
      allow_any_instance_of(described_class)
        .to receive(:prev_board_continued?)
        .and_return(true)
    end

    it { is_expected.to be_a(Dry::Monads::Result::Failure) }
    it 'fails with standard error' do
      expect(subject.failure).to be_a(StandardError)
      expect(subject.failure.message)
        .to eq 'This board was already continued! Only one continuation per board is allowed!'
    end
  end

  context 'when prev_board was not previously continued' do
    before do
      allow_any_instance_of(described_class)
        .to receive(:prev_board_continued?)
        .and_return(false)
    end

    it { is_expected.to be_a(Dry::Monads::Result::Success) }
    it 'returns board in the result value' do
      expect(subject.value!).to be_instance_of(Board)
    end
    it 'duplicates memberships from the previous board' do
      expect { subject }.to change(Membership, :count).by(prev_board.memberships.count)
    end
    it 'assigns duplicated memberships to the new board' do
      expect(subject.value!.users).to contain_exactly(*prev_board.users)
    end
    it 'sets dupicated memberships ready statuses to false' do
      expect(subject.value!.memberships.where(ready: true)).to be_empty
      expect(subject.value!.memberships.where(ready: false)).to eq subject.value!.memberships
    end
    it 'sets current_user as the creator of the new board' do
      expect(subject.value!.memberships.find_by(role: 'creator').user_id).to eq current_user.id
    end
  end
end
