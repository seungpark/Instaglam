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
    @comment = current_user.comments.new(
      photo_id: params[:photo_id].to_i,
      body: params[:body]
    )
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
    @comment = Comment.find(params[:id])
    @comment.destroy!
    render json: {}
  end

  def update
    @comment = Comment.find(params[:id])
    @comment.checked = true
    @comment.save
  end

end
