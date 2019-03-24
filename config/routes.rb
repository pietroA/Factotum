Rails.application.routes.draw do

  root 'pages#index'
  mount ActionCable.server => '/cable'

  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  
  get    '/signup',  to: 'users#new'

  get 'tasks/index'
  get 'tasks', to: 'tasks#index'

  get 'colourful/index'
  get 'colourful', to: 'colourful#index'

  get 'dice_rolls/index'
  get 'dice_rolls', to: 'dice_rolls#index'

  get 'time_units/index'
  get 'time_units', to: 'time_units#index'

  get 'site_functions/index'
  get 'site_functions', to: 'site_functions#index'

  resources :users
  namespace :api do
    resources :tasks
    resources :site_functions
    resources :user_functions
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
