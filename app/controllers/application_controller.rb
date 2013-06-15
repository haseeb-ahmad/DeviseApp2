class ApplicationController < ActionController::Base
  #protect_from_forgery

  def after_sign_in_path_for(resource)
  	pages_index_alt_path
  end
end
