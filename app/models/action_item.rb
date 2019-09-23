# frozen_string_literal: true

class ActionItem < ApplicationRecord
  belongs_to :board

  validates_presence_of :body, :status

  def close!
    self.status = 'closed'
    save
  end

  def done!
    self.status = 'done'
    save
  end

  def pending!
    self.status = 'pending'
    save
  end

  def pending?
    status == 'pending'
  end
end
