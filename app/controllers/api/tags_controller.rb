class Api::TagsController < ApplicationController

  def index
    if params.has_key?("photo_id")
      @tags = Tag.where(photo_id: params[:photo_id])
    else
      @tags = Tag.all
    end
    render 'index'
  end

  def create
    photoid = params[:photo_id].to_i
    userid = params[:user_id].to_i
    @tag = Tag.new(photo_id: photoid, user_id: userid)
    if @tag.save
      render 'show'
    else
      render json: {}
    end
  end

  def show
    @tag = Tag.find(params[:id])
    render 'show'
  end

  def destroy
    @tag = Tag.where(id: params[:id])[0]
    @tag.destroy!
    render json: {}
  end



end
