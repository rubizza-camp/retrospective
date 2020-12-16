# frozen_string_literal: true

module Users
  class OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def alfred
      @user = User.from_omniauth(request.env['omniauth.auth'])
      if @user.persisted?
        sign_in_and_redirect @user, event: :authentication
        set_flash_message(:notice, :success, kind: 'Alfred') if is_navigational_format?
      else
        session['devise.alfred_data'] = request.env['omniauth.auth']
        redirect_to new_user_registration_url
      end
    end

    def developer
      @user = User.first
      sign_in_and_redirect @user, event: :authentication
      set_flash_message(:notice, :success, kind: 'Developer') if is_navigational_format?
    end

    def failure
      redirect_to root_path
    end
  end
end
