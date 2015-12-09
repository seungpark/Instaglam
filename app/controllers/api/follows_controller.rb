class Api::FollowsController < ApplicationController

  def index
    if params.has_key?("photo_id")
      @follows = Follow.where(id: params[:id])
    else
      @follows = Follow.all
    end
    render 'index'
  end

  def create
    followerid = params[:follower_id].to_i
    userid = params[:user_id].to_i
    @follow = Follow.new(user_id: userid, follower_id: followerid)
    if @follow.save
      render 'show'
    else
      render json: {}
    end
  end

  def show
    @follow = Follow.find(params[:id])
    render 'show'
  end

  def destroy
    @follow = Follow.find(id: params[:id])
    @follow.destroy!
    render json: {}
  end

    # @follow = Follow.where(photo_id: photoid, user_id: userid)
    # @follow.destroy
    # render 'destroy'



end
