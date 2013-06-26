class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  devise :omniauthable, :omniauth_providers => [:facebook , :google_oauth2]
  attr_accessor :login

  # Setup accessible (or protected) attributes for your model
  attr_accessible :username, :email, :password, :password_confirmation, :remember_me, :login, :provider, :uid, :name
  # attr_accessible :title, :body


  def self.find_for_oauth(auth, signed_in_resource=nil)
      data = auth.info
      user = User.where(:email => data["email"]).first

      if user != "" && user != nil && user != []
        user.update_attribute(:provider, auth.provider)
        user.update_attribute(:uid, auth.uid)
        user.update_attribute(:name, auth.extra.raw_info.name)
      end


      unless user
        user = User.new
        user.name = auth.extra.raw_info.name
        user.provider = auth.provider
        user.uid = auth.uid
        user.email = auth.info.email

        user.save(validate: false)
      end
      user
  end

  def self.already_exists? (input)
  	if User.where('email = ? OR username = ?', input[:email], input[:username]).count == 0
  		false
  	else
  		true
    end
  end

    def self.find_first_by_auth_conditions(warden_conditions)
    conditions = warden_conditions.dups
    if login = conditions.delete(:login)
      where(conditions).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
    else
      where(conditions).first
    end
  end
  
end
