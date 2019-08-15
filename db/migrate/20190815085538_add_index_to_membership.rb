class AddIndexToMembership < ActiveRecord::Migration[5.2]
  def change
  	add_index :memberships, [:user_id, :board_id], unique: true
  end
end
