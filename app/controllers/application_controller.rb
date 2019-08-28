# frozen_string_literal: true

class ApplicationController < ActionController::Base
  rescue_from ActionPolicy::Unauthorized do |ex|
    p ex.result.message
  end

  before_action :authenticate_user!, except: %i[sign_in sign_up]
  authorize :user, through: :current_user
  verify_authorized unless: [:devise_controller?]
end
