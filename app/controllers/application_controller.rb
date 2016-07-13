class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  include SessionsHelper
  def logged_in_user
    unless logged_in?
      flash[:danger] = t "flash.action"
      redirect_to login_url
    end
  end

  private
  def check_admin
    if logged_in?
      redirect_to root_path unless current_user.is_admin?
    else
      redirect_to root_path
    end
  end
end
