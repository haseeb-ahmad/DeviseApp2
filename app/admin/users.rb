ActiveAdmin.register User do

  index do
    selectable_column
	column :id
    column :username
    column :email
    column :name
    column :provider
    column :uid
    column :current_sign_in_at
    column :last_sign_in_at
    column :sign_in_count
    column :created_at
    column :updated_at
    default_actions                   
  end

  
end
