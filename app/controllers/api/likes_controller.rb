class Api::LikesController < ApplicationController

  def index
    if params.has_key?("photo_id")
      @likes = Like.where(photo_id: params[:photo_id])
    else
      @likes = Like.all
    end
    render 'index'
  end

  def create
    byebug
  end

  def show
    @like = Like.find(params[:id])
    render 'show'
  end

  private
  def likes_params

  end

end
