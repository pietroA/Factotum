class SessionsController < ApplicationController
    def new
    end
  
    def create
      @user = User.find_by(name: params[:session][:name])
      @user ||= User.find_by(email: params[:session][:name])
      unless @user == nil
        if @user.authenticate(params[:session][:password])
          login @user
          flash[:success] = "Welcome back #{@user.name}" 
          flash[:success] = "Bentornato #{@user.name}" 
          redirect_to root_url
        else
          flash[:danger] = "Incorrect password for #{params[:session][:name]} / Password non corretta per #{params[:session][:name]}"
          redirect_to login_path
        end
      else
        flash[:danger] = "There are not user named #{params[:session][:name]} / Non ci sono utenti di nome #{params[:session][:name]}"
        redirect_to login_path
      end
    end
  
    def destroy
      language = current_user
      name = current_user.name
      log_out
      flash[:success] = "See you soon #{name}" if language == "en"
      flash[:success] = "A presto #{name}" if language == "it"
      redirect_to root_url
    end
  end
  