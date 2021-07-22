# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Boards::Cards::BuildPermissions do
  subject(:build_permissions) do
    described_class.new(card, user).call(identifiers_scope: identifiers_scope)
  end

  let(:card) { create(:card) }
  let(:user) { card.author }
  let!(:permission) { create(:permission, identifier: 'update_card') }

  context 'with valid identifiers scope' do
    let(:identifiers_scope) { 'card' }

    it { is_expected.to be_success }

    it 'builds permission to card' do
      build_permissions
      expect(card.card_permissions_users.first.permission).to eq(permission)
    end

    it 'builds permission to user' do
      build_permissions
      expect(card.card_permissions_users.first.user).to eq(user)
    end
  end

  context 'with invalid identifiers scope' do
    let(:identifiers_scope) { 'invalid' }

    it { is_expected.to be_failure }

    it 'does not build permissions_users' do
      build_permissions
      expect(card.card_permissions_users).to be_empty
    end
  end

  context 'like_card permission' do
    let(:identifiers_scope) { 'card' }

    let(:board) { card.board }
    let(:other_user) { create(:user) }

    let!(:like_permission) { create(:permission, identifier: 'like_card') }

    before do
      board.users << other_user
    end

    it 'builds for others' do
      expect { build_permissions }.to change { card.card_permissions_users.size }

      card_permissions_users = select_card_permissions_users(card.card_permissions_users,
                                                             like_permission.id)

      expect(card_permissions_users).not_to be_empty
      expect(card_permissions_users.map(&:user_id)).to include(other_user.id)
    end

    it "doesn't builds for author" do
      expect { build_permissions }.to change { card.card_permissions_users.size }

      card_permissions_users = select_card_permissions_users(card.card_permissions_users,
                                                             like_permission.id)

      expect(card_permissions_users.map(&:user_id)).not_to include(user.id)
    end
  end

  def select_card_permissions_users(card_permissions_users, permission_id)
    card_permissions_users.select { |cpu| cpu.permission_id == permission_id }
  end
end
