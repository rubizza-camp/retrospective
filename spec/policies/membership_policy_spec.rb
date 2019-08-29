# frozen_string_literal: true

require 'rails_helper'

RSpec.describe MembershipPolicy do
  let_it_be(:user) { build_stubbed(:user) }
  let_it_be(:membership) { build_stubbed(:membership) }
  let_it_be(:policy) { described_class.new(membership, user: user) }

  context '#create?' do
    it 'returns true' do
      expect(policy.apply(:create?)).to eq true
    end
  end
end
