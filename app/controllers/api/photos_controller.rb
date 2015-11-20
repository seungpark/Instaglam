class Api::PhotosController < ApplicationController

  def index
    if params.has_key?("username")

      userid = User.find_by(username: params[:username]).id
      @photos = Photo.where(user_id: userid)
      # @photos = Photo.select{|photo| photo.user_id == userid}
      # select {|photo| photo.user_id == userid}
    else
      @photos = Photo.all
    end
    # params.username ?  : @photos = Photo.all

    render 'index'
  end
    # render 'index' goes to views/api/photos/index.json.jbuilder

  def create
    puts photo_params
    @photo = Photo.create!(photo_params)
    render 'show'
  end

  def show
    @photo = Photo.find(params[:id])
    render 'show'
  end
    # render 'show' goes to views/api/photos/show.json.jbuilder

  private
  def photo_params
    params.require(:photo).permit(:title, :caption, :user_id, :image)
  end

end
