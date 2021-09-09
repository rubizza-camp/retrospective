# frozen_string_literal: true

class RemoveRoleFromMemberships < ActiveRecord::Migration[6.1]
  def change
    safety_assured { remove_column :memberships, :role }
  end
end
