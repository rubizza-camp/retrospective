require 'rails_helper'

RSpec.describe Boards::Continue do
  let_it_be(:creator) { create(:user) }
  let_it_be(:prev_board) { create(:board) }
  let_it_be(:creatorship) { create(:membership, board: prev_board, user: creator, role: 'creator') }

  #subject { described_class.new(board, user) }

  describe '#default_board_name' do
    subject { described_class.new(prev_board, creator).send(:default_board_name) }

    it { is_expected.to eq Date.today.strftime('%d-%m-%Y') }
  end

  describe '#prev_board_continued?' do
    subject { described_class.new(prev_board, creator).send(:prev_board_continued?) }

    context 'when board was not previously continued' do
      it { is_expected.to eq false }
    end

    context 'when board was previously continued' do
      let_it_be(:next_board) { create(:board, previous_board: prev_board) }
      it { is_expected.to eq true }
    end
  end

  describe '#duplicate_memberships' do
    subject { described_class.new(prev_board, creator).send(:duplicate_memberships) }

    let_it_be(:member) { create(:user) }
    let_it_be(:membership) { create(:membership, board: prev_board, user: member) }

    it { is_expected.to be_instance_of(Array) }
    #it { is_expected.to  }


    #it { binding.pry }
      
    #end
  end
end
