# frozen_string_literal: true

class BackfillColumnEmojis < ActiveRecord::Migration[6.1]
  disable_ddl_transaction!

  def up
    Board.unscoped.in_batches do |relation|
      relation.update_all column_emojis: ['😡', '😔', '🤗']
      sleep(0.01) # throttle
    end
  end
end
