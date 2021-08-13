# frozen_string_literal: true

class AddLikeCommentPermission < ActiveRecord::Migration[6.1]
  IDENTIFIER = :like_comment

  def up
    return if Permission.exists?(identifier: IDENTIFIER)

    description = 'User can like a card comment'
    begin
      Permission.create!(identifier: IDENTIFIER, description: description)
    rescue StandardError => e
      puts e.message
    end
  end

  def down
    Permission.find_by(identifier: IDENTIFIER).destroy
  end
end
