class Api::UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
    render :show
  end

  private
  def user_params
  end


end
