json.extract! @user, :id, :username, :name, :bio, :created_at, :session_token, :avatar_file_name, :avatar_updated_at

json.avatar_url asset_path(@user.avatar.url)

json.followers do
  json.array! @user.followers, :id, :username, :name
end

json.following_users do
  json.array! @user.following_users, :id, :username, :name
end
