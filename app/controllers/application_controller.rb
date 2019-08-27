# frozen_string_literal: true

class ApplicationController < ActionController::Base
  rescue_from ActionPolicy::Unauthorized, with: :user_not_authorized

  before_action :authenticate_user!, except: %i[sign_in sign_up]
  authorize :user, through: :current_user
  verify_authorized unless: [:devise_controller?]

  def user_not_authorized
    redirect_to root_path, alert: 'you are not authorized'
  end
end
