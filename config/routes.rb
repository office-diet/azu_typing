Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'typings#index'
  resources :typings, only: [:index, :new, :update, :create, :destroy] do
    collection do
      post :category_create
      patch :category_update
      delete :category_destroy
    end
  end
  get 'typings/:category', to: 'typings#category'
  post 'typings/score', to: 'typings#score'
end
