# frozen_string_literal: true

require 'rails_helper'
require 'rake'

RSpec.describe 'permissions.rake' do
  let(:task_file) { 'tasks/permissions' }

  before do
    Rake.application.rake_require(task_file)
    Rake::Task.define_task(:environment)
  end

  let :run_task do
    Rake::Task[task_name].reenable
    Rake.application.invoke_task(task_name)
  end

  describe 'create_missing_permissions' do
    let(:user) { create(:user) }
    let_it_be(:board) { create(:board) }
    let_it_be(:other_permission) { create(:permission) }

    context 'for cards' do
      let_it_be(:card_permission) { create(:permission, identifier: 'update_card') }
      let!(:card) { create(:card, author: user) }
      let_it_be(:task_name) { 'permissions:create_missing_for_cards' }

      it 'builds missing card permissions' do
        run_task
        expect(user.card_permissions).to include(card_permission)
      end

      it 'does not build non card permissions' do
        run_task
        expect(user.card_permissions).not_to include(other_permission)
      end
    end

    context 'for comments' do
      let_it_be(:comment_permission) { create(:permission, identifier: 'update_comment') }
      let!(:comment) { create(:comment, author: user) }
      let_it_be(:task_name) { 'permissions:create_missing_for_comments' }

      it 'builds missing comment permissions' do
        run_task
        expect(user.comment_permissions).to include(comment_permission)
      end

      it 'does not build non comment permissions' do
        run_task
        expect(user.comment_permissions).not_to include(other_permission)
      end
    end

    context "for card's likes" do
      let_it_be(:like_permission) { create(:permission, identifier: 'like_card') }
      let(:author) { create(:user) }
      let!(:card) { create(:card, board: board, author: author) }
      let_it_be(:task_name) { 'permissions:create_missing_for_like_cards' }

      before do
        create(:membership, user: user, board: board)
        create(:membership, user: author, board: board)
      end

      it 'builds missing like_card permission' do
        run_task
        expect(user.card_permissions).to include(like_permission)
      end

      it 'does not build like_card permission for author' do
        run_task
        expect(author.card_permissions).not_to include(like_permission)
      end

      it 'does not build non card permission' do
        run_task
        expect(user.card_permissions).not_to include(other_permission)
      end
    end

    context "for comment's likes" do
      let_it_be(:like_permission) { create(:permission, identifier: 'like_comment') }
      let(:author) { create(:user) }
      let(:card) { create(:card, board: board) }
      let!(:comment) { create(:comment, author: author, card: card) }
      let_it_be(:task_name) { 'permissions:create_missing_for_like_comments' }

      before do
        create(:membership, user: user, board: board)
        create(:membership, user: author, board: board)
      end

      it 'builds missing like_comment permission' do
        run_task
        expect(user.comment_permissions).to include(like_permission)
      end

      it 'does not build like_comment permission for author' do
        run_task
        expect(author.comment_permissions).not_to include(like_permission)
      end

      it 'does not build non comment permission' do
        run_task
        expect(user.comment_permissions).not_to include(other_permission)
      end
    end
  end
end
