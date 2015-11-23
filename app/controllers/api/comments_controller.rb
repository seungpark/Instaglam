class Api::CommentsController < ApplicationController

  def index
    if params.has_key?("photo_id")
      @comments = Comment.where(photo_id: params[:photo_id])
    else
      @comments = Comment.all
    end
    render 'index'
  end

  def create
    photoid = params[:photo_id].to_i
    userid = params[:user_id].to_i
    body = params[:body]
    @comment = Comment.new(photo_id: photoid, user_id: userid, body: body)
    if @comment.save
      render 'show'
    else
      render json: {}
    end
  end

  def show
    @comment = Comment.find(params[:id])
    render 'show'
  end

  def destroy
    byebug
    photoid = params[:photo_id]
    userid = params[:user_id]
    body = params[:body]
    @comment = Comment.where(["photo_id = ? and user_id = ? and body = ?", photoid, userid, body ])[0]
    @comment.destroy
  end

end
