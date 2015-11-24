class Api::UsersController < ApplicationController

  def index
    if params.has_key?("username")
      @users = User.where(username: params[:username])
    else
      @users = User.all
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  private
  def user_params
  end


end
