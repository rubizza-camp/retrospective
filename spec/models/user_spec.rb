# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'Validations' do
    it 'is valid with valid attributes' do
      expect(FactoryBot.create(:user)).to be_valid
    end
    it 'is not valid without a email' do
      expect(FactoryBot.build(:user, email: nil)).to_not be_valid
    end
  end

  describe 'Associations' do
    it { is_expected.to have_many(:boards) }
    it { is_expected.to have_many(:cards) }
  end

  auth_hash = OmniAuth::AuthHash.new(
    provider: 'github',
    uid: '1234',
    info: {
      email: 'user@example.com'
    }
  )

  describe 'Omniauth' do
    it 'retrieves an existing user' do
      user = FactoryBot.create(:github_user)
      omniauth_user = User.from_omniauth(auth_hash)
      expect(user).to eq(omniauth_user)
    end

    it "creates a new user if one doesn't already exist" do
      expect(User.count).to eq(0)
      User.from_omniauth(auth_hash)
      expect(User.count).to eq(1)
    end
  end
end
