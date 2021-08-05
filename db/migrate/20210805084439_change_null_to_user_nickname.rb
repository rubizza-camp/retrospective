# frozen_string_literal: true

class ChangeNullToUserNickname < ActiveRecord::Migration[6.1]
  def change
    change_column_null :users, :nickname, false
  end
end
