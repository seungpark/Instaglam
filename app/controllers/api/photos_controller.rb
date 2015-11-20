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
    @photo = Photo.new(photo_params)
    redirect_to root_url
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
