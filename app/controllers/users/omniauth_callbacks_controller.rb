class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

	def facebook
		user = User.find_for_oauth(request.env["omniauth.auth"], current_user)

		if user.persisted?
			set_flash_message(:notice, :success, :kind => "Facebook") if is_navigational_format?
		else
			session["devise.facebook_data"] = request.env["omniauth.auth"]
		end

		sign_in_and_redirect user, :event => :authentication

	end

	def google_oauth2
	    user = User.find_for_oauth(request.env["omniauth.auth"], current_user)

	    if user.persisted?
	      flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => "Google"
	    else
	      session["devise.google_data"] = request.env["omniauth.auth"]
	    end

		sign_in_and_redirect user, :event => :authentication

	end

end