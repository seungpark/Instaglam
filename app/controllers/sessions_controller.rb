class SessionsController < ApplicationController
  skip_before_action :need_login!, only: [:new, :create]

  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(login_params[:username], login_params[:password])
    if @user
      sign_in(@user)
      redirect_to new_session_url, flash: { success: "Welcome #{@user.username}!" }
    else
      redirect_to new_session_url, alert: "Invalid Login"
    end
  end

  def destroy
    sign_out!
    redirect_to new_session_url, flash: { success: "Logged Out!" }
  end

  private

  def login_params
    params.require(:user).permit(:username, :password)
  end


end
