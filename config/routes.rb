# frozen_string_literal: true

# rubocop:disable Metrics/BlockLength

Rails.application.routes.draw do
  root to: 'home#index'
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  resources :boards, param: :slug do
    member do
      post 'continue'
    end
    resources :cards
    resources :action_items do
      member do
        post 'move'
        put 'close'
        put 'complete'
        put 'reopen'
      end
    end
    resources :memberships
  end

  resources :teams

  namespace :api do
    resources :boards, param: :slug do
      member do
        post 'invite'
        get 'suggestions'
      end
      resources :memberships, only: %i[index destroy] do
        collection do
          get 'ready_status'
          put 'ready_toggle'
        end
      end
      resources :cards
    end
  end
end

# rubocop:enable Metrics/BlockLength
