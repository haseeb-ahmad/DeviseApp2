class PagesController < ApplicationController


  def login
  	
  end

  def index_alt
  	unless user_signed_in?
  		redirect_to new_user_session_path
  		return;
  	end
    render :layout => 'after_login'
  end


end
