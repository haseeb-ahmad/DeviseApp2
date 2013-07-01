class UsersController < ApplicationController

  def check_email_and_username
    if User.already_exists? (params)
      render :nothing => true, :status => 409
    else
      render :nothing => true, :status => 200
    end
  end

  def validate_user
  	if User.vaild_email? (params[:email])
  		render :nothing => true, :status => 200
  	else
  		render :nothing => true, :status => 409
  	end  	
  end

  def get_user
    email = User.get_user_by_token(params[:token])
    respond_to do |format|
      format.json { render :json => email }
    end
  end

end
