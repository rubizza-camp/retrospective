# frozen_string_literal: true

Rails.application.routes.draw do
  get 'users/suggestions'
  root to: 'home#index'
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  resources :boards do
    resources :cards
    resources :action_items
    resources :memberships
    member do
      get 'users'
    end
  end

  resources :teams
end
