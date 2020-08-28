class TypingsController < ApplicationController
  def index
  end

  def category
    typings = Typing.where(category: params[:category]).order("RAND()")
    render json: {typings: typings}
  end
end
