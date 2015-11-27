json.extract!(
  user,
  :id, :username, :created_at, :avatar_file_name, :bio, :name, :photos
)

json.followers do
  json.array! @user.followers, :id, :username, :name
end

json.following_users do
  json.array! @user.following_users, :id, :username, :name
end


json.avatar_url asset_path(user.avatar.url)
