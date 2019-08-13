require 'rails_helper'

RSpec.describe Team, :type => :model do
  context 'validations' do
    it 'is valid with valid attributes' do
      expect(build(:team)).to be_valid
    end

    it 'is not valid without name' do
      expect(build(:team, name: nil)).to_not be_valid
    end
  end

  context 'associations' do
    it 'has_many_users' do
      expect(build(:team)).to respond_to(:users)
    end
  end
end
