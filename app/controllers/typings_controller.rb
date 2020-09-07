class TypingsController < ApplicationController
  before_action :set_variables, only: [:new]
  before_action :basic_auth, only: [:new]

  def index
    @categories = Category.all
  end

  def new
  end

  def create
    typing_params = params.require(:typing)
    params_count = Typing.columns.count + Category.ids.max
    typing = Typing.where(typing_params.permit(:original, :hiragana)).first_or_initialize
    if typing.save
      TypingsCategory.where(typing_id: typing.id).destroy_all
      params_count.times do |num|
        if typing_params.permit("category_#{ num + 1 }").present?
          TypingsCategory.create(typing_id: typing.id, category_id: num + 1)
        end
      end
      redirect_to new_typing_path
    else
      set_variables
      @typing_new = typing
      render :new
    end
  end

  def update
    typing_params = params.require(:typing)
    params_count = Typing.columns.count + Category.ids.max
    typing = Typing.find(params[:id])
    if typing.update(typing_params.permit(:original, :hiragana))
      TypingsCategory.where(typing_id: typing.id).destroy_all
      params_count.times do |num|
        if typing_params.permit("category_#{ num + 1 }").present?
          TypingsCategory.create(typing_id: typing.id, category_id: num.to_i + 1)
        end
      end
      redirect_to new_typing_path
    else
      set_variables
      render :new
    end
  end

  def destroy
    typing = Typing.find(params[:id])
    typing.destroy
    redirect_to new_typing_path
  end

  def category_create
    category = Category.new(params.require(:category).permit(:name, :order))
    category.save
    redirect_to new_typing_path
  end

  def category_update
    category = Category.find(params[:id])
    category.update(params.require(:category).permit(:name, :order))
    redirect_to new_typing_path
  end

  def category_destroy
    category = Category.find(params[:id])
    category.destroy
    redirect_to new_typing_path
  end

  # APIコントローラ 

  def category
    typing_ids = TypingsCategory.where(category_id: params[:category]).select(:typing_id)
    typings = Typing.where(id: typing_ids).order("RAND()").limit(10)
    render json: {typings: typings}
  end

  def score
    score = Score.new(score_params)
    if score.save
      rank = Score.where("score > ?", score.score ).count + 1
    else
      rank = "ERROR"
    end
    render json: {rank: rank}
  end

  private 
  def score_params
    params.require(:score).permit(:score, :sps, :category_id)
  end

  def set_variables
    @typing_new = Typing.new
    @typing_all = Typing.all.order(updated_at: "desc")
    @category_new = Category.new
    @categories_all = Category.all.order(:order)
    @typings_categories = TypingsCategory.all
  end

  def basic_auth
    authenticate_or_request_with_http_basic do |username, password|
      username == ENV['BASIC_AUTH_USER'] && password == ENV['BASIC_AUTH_PASSWORD']
    end
  end
end
