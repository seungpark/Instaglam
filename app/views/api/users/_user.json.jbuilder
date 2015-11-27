json.extract!(
  user,
  :id, :username, :created_at, :avatar_file_name, :bio, :name, :photos
)

json.avatar_url asset_path(user.avatar.url)
