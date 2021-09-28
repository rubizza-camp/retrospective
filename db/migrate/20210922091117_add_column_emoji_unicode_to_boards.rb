# frozen_string_literal: true

class AddColumnEmojiUnicodeToBoards < ActiveRecord::Migration[6.1]
  def change
    add_column :boards, :column_emojis, :text, array: true, default: ['😡', '😔', '🤗']
  end
end
