# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CommentPolicy do
  let_it_be(:user) { create(:user) }
  let_it_be(:board) { create(:board) }
  let_it_be(:card) { create(:card, board: board) }
  let_it_be(:comment) { create(:comment, card: card) }
  let(:policy) { described_class.new(comment, user: user) }

  describe '#update?' do
    subject { policy.apply(:update?) }

    context 'with permission' do
      let_it_be(:update_comment_permission) { create(:permission, identifier: 'update_comment') }
      before do
        create(:comment_permissions_user, comment: comment,
                                          user: user,
                                          permission: update_comment_permission)
      end

      it { is_expected.to eq true }
    end

    context 'without permission' do
      it { is_expected.to eq false }
    end
  end

  describe '#destroy?' do
    subject { policy.apply(:destroy?) }

    context 'with permission' do
      let(:destroy_comment_permission) { create(:permission, identifier: 'destroy_comment') }
      before do
        create(:comment_permissions_user, comment: comment,
                                          user: user,
                                          permission: destroy_comment_permission)
      end

      it { is_expected.to eq true }
    end

    context 'without permission' do
      it { is_expected.to eq false }
    end
  end

  describe '#like?' do
    subject { policy.apply(:like?) }

    context 'with permission' do
      let_it_be(:like_comment_permission) { create(:permission, identifier: 'like_comment') }
      before do
        create(:comment_permissions_user, comment: comment,
                                          user: user,
                                          permission: like_comment_permission)
      end
      it { is_expected.to be true }
    end

    context 'without permission' do
      it { is_expected.to be false }
    end
  end
end
