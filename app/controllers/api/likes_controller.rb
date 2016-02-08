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
    photoid = params[:photo_id].to_i
    userid = params[:user_id].to_i
    @like = Like.new(photo_id: photoid, user_id: userid)
    if @like.save
      render 'show'
    else
      render json: {}
    end
  end

  def show
    @like = Like.find(params[:id])
    render 'show'
  end

  def destroy
    @like = Like.find(params[:id])
    @like.destroy!
    render json: {}
  end

  def update
    @like = Like.find(params[:id])
    @like.checked = true
    @like.save
    render 'show'
  end

    # @like = Like.where(photo_id: photoid, user_id: userid)
    # @like.destroy
    # render 'destroy'



end
