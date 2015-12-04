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

  def create
    @user = User.new(
      username: user_params[:username],
      password: user_params[:password],
      name: user_params[:name],
      bio: user_params[:bio]
    )
    @user.save
    @user.follows.new(user_id: @user.id, follower_id: @user.id).save
    @user.follows.new(user_id: 1, follower_id: @user.id) if @user.id != 1
    render :show
  end

  def update
    @user = User.find(params[:id])
    if params.has_key?("user")
      if @user.update_attributes({avatar: params[:user][:avatar]})
        render :show
      end
    else
      if @user.update_attributes({name: params[:name], bio: params[:bio]})
        render :show
      end
      # redirect_to makes another patch request
      # else
      #   flash.now[:errors] = @user.errors.full_messages
      #   render :edit
    end
  end

  private
  def user_params
    params.require(:userinfo).permit(:username, :password, :name, :bio)
  end


end
