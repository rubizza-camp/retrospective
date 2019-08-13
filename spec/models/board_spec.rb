# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Board, type: :model do

  let(:board) { build_stubbed(:board) }

  context 'validations' do
    it 'is valid with valid attributes' do
      expect(board).to be_valid
    end

    it 'is not valid without a title' do
      expect(build_stubbed(:board, title: nil)).to_not be_valid
    end
  end

  context 'associations' do
    it 'has many cards' do
      expect(board).to respond_to(:cards)
    end

    it 'has many action items' do
      expect(board).to respond_to(:action_items)
    end

    it 'belongs to creator' do
      expect(board).to respond_to(:creator)
    end

    it 'belongs to team' do
      expect(board).to respond_to(:team)
    end
  end
end
