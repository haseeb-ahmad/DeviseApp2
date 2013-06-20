class UsersController < ApplicationController

  def checkname

    if User.AlreadyExists? (params[:email])
      render :nothing => true, :status => 409
    else
      render :nothing => true, :status => 200
    end

  end

end
