class Api::PhotosController < ApplicationController

  def index
    @photos = Photo.all
    render 'index'
  end
    # render 'index' goes to views/api/photos/index.json.jbuilder

  def create
    @photo = Photo.new(photo_params)
    redirect_to root
  end

  def show
    @photo = Photo.find(params[:id])
    render 'show'
  end
    # render 'show' goes to views/api/photos/show.json.jbuilder

  private
  def photos_params
    params.require(:photo).permit(:title, :caption, :user_id)
  end

end
