class Api::PhotosController < ApplicationController

  def index
    if params.has_key?("username")

      userid = User.find_by(username: params[:username]).id
      @photos = Photo.where(user_id: userid).order(created_at: :desc)
      # @photos = Photo.select{|photo| photo.user_id == userid}
      # select {|photo| photo.user_id == userid}
    else
      @photos = Photo.where(user_id: params[:user_id]).order(created_at: :desc)
    end
    # params.username ?  : @photos = Photo.all

    render 'index'
  end
    # render 'index' goes to views/api/photos/index.json.jbuilder

  def create
    @photo = Photo.new(photo_params)
    @photo.save!

    tags = params[:photo][:tags].split(",")
    tags.each do |tag|
      exists = Tag.find_by_name(tag)
      if !!exists
        new_tag = exists
      else
        new_tag = Tag.new(name: tag)
        new_tag.save!
      end
      @photo.taggings.new(tag_id: new_tag.id, photo_id: @photo.id).save!
    end
    render 'show'
  end

  def show
    @photo = Photo.find(params[:id])
    render 'show'
  end
    # render 'show' goes to views/api/photos/show.json.jbuilder

  private
  def photo_params
    params.require(:photo).permit(:title, :caption, :user_id, :image, :bucket)
  end

end
