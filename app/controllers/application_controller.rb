class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user

  private

  def current_user
    user ||= User.find_by(session_token: session[:session_token])
    @current_user = user.nil? ? nil : user
  end

  def sign_in(user)
    session[:session_token] = user.reset_session_token!
  end

  def signed_in?
    !!@current_user
  end

  def sign_out!
    if current_user
      current_user.reset_session_token!
      session[:session_token] = nil
    end
  end


end
