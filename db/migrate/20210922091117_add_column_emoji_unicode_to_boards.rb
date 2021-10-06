# frozen_string_literal: true

class AddColumnEmojiUnicodeToBoards < ActiveRecord::Migration[6.1]
  def up
    add_column :boards, :column_emojis, :text, array: true
    change_column_default :boards, :column_emojis, ['😡', '😔', '🤗']
  end

  def down
    remove_column :boards, :column_emojis
  end
end
