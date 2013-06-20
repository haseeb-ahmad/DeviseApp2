class UsersController < ApplicationController

  def checkname

    if User.already_exists? (params)
      render :nothing => true, :status => 409
    else
      render :nothing => true, :status => 200
    end

  end

end
