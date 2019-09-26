class AddIndexToBoards < ActiveRecord::Migration[5.2]
  def change
    remove_index :boards, :previous_board_id
    add_index :boards, :previous_board_id, unique: true
  end
end
