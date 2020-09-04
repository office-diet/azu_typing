class TypingsController < ApplicationController
  def index
    @categories = Category.all
  end

  def category
    if params[:category] == "0"
      typings = Typing.order("RAND()").limit(10)
    else
      typing_ids = TypingsCategory.where(category_id: params[:category]).select(:typing_id)
      typings = Typing.where(id: typing_ids).order("RAND()").limit(10)
    end
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
    params.permit(:score, :category_id)
  end
end
