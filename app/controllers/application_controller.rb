class ApplicationController < ActionController::Base
  #protect_from_forgery

def after_sign_up_path_for(resource)
    after_sign_in_path_for(resource)
end

def after_sign_in_path_for(resource)
    unless resource.is_a?(User)
      admin_dashboard_path
    else
      pages_index_alt_path
    end
end

end
