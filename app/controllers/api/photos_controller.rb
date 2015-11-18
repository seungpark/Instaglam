class Api::PhotosController < ApplicationController

  def index
    @photos = Photo.all
    render 'index'
  end

  def create
    @photo = Photo.new(photo_params)
    redirect_to root
  end

  def show
    @photo = Photo.find(params[:id])
    render 'show'
  end

  private
  def photos_params
    params.require(:photo).permit(:title, :caption, :user_id)
  end

end
