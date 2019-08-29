# frozen_string_literal: true

require 'rails_helper'

RSpec.describe BoardPolicy do
  let_it_be(:user) { build_stubbed(:user) }
  let_it_be(:board) { build_stubbed(:board) }

  let_it_be(:policy) { described_class.new(board, user: user) }

  context '#index?' do
    it 'returns true' do
      expect(policy.apply(:index?)).to eq true
    end
  end

  context '#show?' do
    it 'returns true' do
      expect(policy.apply(:show?)).to eq true
    end
  end

  context '#new?' do
    it 'returns true' do
      expect(policy.apply(:new?)).to eq true
    end
  end

  context '#create?' do
    it 'returns true' do
      expect(policy.apply(:create?)).to eq true
    end
  end

  context '#continue?' do
    it 'returns true' do
      expect(policy.apply(:continue?)).to eq true
    end
  end
end
