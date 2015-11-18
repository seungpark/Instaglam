class Api::PhotosController < ApplicationController

  def index
    @photos = Photo.all
    render json: @photos
  end

  def create
    @photo = Photo.new(photo_params)
    render json: @photo
  end

  private
  def photos_params
    params.require(:photo).permit(:title, :caption, :user_id)
  end

end
