json.extract! @user, :id, :username, :created_at, :avatar_file_name

json.avatar_url asset_path(@user.avatar.url)
