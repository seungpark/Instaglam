class UsersController < ApplicationController

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    current_user
    if @user.save
    @user.followings.new(user_id: @user.id, follower_id: @user.id).save
    @user.followings.new(user_id: 1, follower_id: @user.id).save if @user.id != 1
      sign_in(@user)
      byebug
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :edit
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
