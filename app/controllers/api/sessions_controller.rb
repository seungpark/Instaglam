class Api::SessionsController < ApplicationController

  def show
    # sleep 2 # simulate latency

    unless current_user
      render json: {}
      return
    end

    @user = current_user
    render json: @user
  end

  def create
    @user = User.find_by_credentials(params[:username], params[:password])

    if @user.nil?
      render json: {errors: ["Wrong Username / Password!"]}, status: 401
    else
      sign_in(@user)
      render json: @user
      # passes @user info as json BACK to AJAX REQUEST FROM SESSIONS API UTIL
      #as 'credentials'
    end
  end

  def destroy
    sign_out!
    render json: {}
  end


end
