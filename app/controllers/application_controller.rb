class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  include SessionsHelper

  private
  def check_login
    unless logged_in?
      flash[:warning] = "Effettuare l'accesso o registrarsi per accedere a questa funzione"
      redirect_to login_path
    end
  end

  def check_admin
    unless current_user.admin
      flash[:warning] = "Ci dispiace, non hai l'autorizzazione per accedere a questa funzione"
      redirect_to root_url
    end
  end
end
