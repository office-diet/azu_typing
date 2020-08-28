Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'typings#index'
  get 'typings/:category', to: 'typings#category'
end
