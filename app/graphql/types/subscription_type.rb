# frozen_string_literal: true

module Types
  class SubscriptionType < BaseObject
    # rubocop:disable Layout/LineLength
    field :action_item_added, Types::ActionItemType, null: false, description: 'An action item was added' do
      argument :boardSlug, String, required: true
    end

    field :action_item_moved, Types::ActionItemType, null: false, description: 'An action item was moved' do
      argument :boardSlug, String, required: true
    end

    field :action_item_destroyed, Types::ActionItemType, null: false, description: 'An action item was destroyed' do
      argument :boardSlug, String, required: true
    end

    field :action_item_updated, Types::ActionItemType, null: false, description: 'An action item was updated' do
      argument :boardSlug, String, required: true
    end

    field :card_added, Types::CardType, null: false, description: 'A card was added' do
      argument :boardSlug, String, required: true
    end

    field :card_updated, Types::CardType, null: false, description: 'A card was updated' do
      argument :boardSlug, String, required: true
    end

    field :card_destroyed, Types::DeletedCardType, null: false, description: 'A card was destroyed' do
      argument :boardSlug, String, required: true
    end

    field :membership_destroyed, Types::MembershipType, null: false, description: 'A membership record was destroyed' do
      argument :boardSlug, String, required: true
    end

    field :membership_list_updated, [Types::MembershipType], null: false, description: 'List of board members was updated' do
      argument :boardSlug, String, required: true
    end

    field :membership_updated, Types::MembershipType, null: false, description: 'A membership record was updated' do
      argument :boardSlug, String, required: true
    end

    field :board_continued, Types::DeletedBoardType, null: false, description: 'A board was continued' do
      argument :boardSlug, String, required: true
    end

    field :board_destroyed, Types::DeletedBoardType, null: false, description: 'A board was destroyed' do
      argument :boardSlug, String, required: true
    end
    # rubocop:enable Layout/LineLength

    def action_item_added(*); end

    def action_item_moved(*); end

    def action_item_destroyed(*); end

    def action_item_updated(*); end

    def card_added(*); end

    def card_updated(*); end

    def card_destroyed(*); end

    def membership_destroyed(*); end

    def membership_list_updated(*); end

    def membership_updated(*); end

    def board_continued(*); end

    def board_destroyed(*); end
  end
end
