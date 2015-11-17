class Api::PhotosController < ApplicationController

  def index
    photos = Photo.all
    render 'index'
  end

  def create
    photo = Photo.create!(photo_params)
    render json: photo
  end

  private
  def photos_params
    params.require(:photo).permit()
  end


end
