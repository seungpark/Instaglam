class Api::UsersController < ApplicationController

  def show
    render json: User.find(params[:id])
  end

  private
  def user_params
  end


end
