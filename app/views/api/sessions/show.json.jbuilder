json.extract! @user, :id, :username, :name, :bio, :created_at, :session_token, :avatar_file_name, :avatar_updated_at, :followings

json.avatar_url asset_path(@user.avatar.url)

json.followers do
  json.array! @user.followers, :id, :username, :name
end

json.following_users do
  json.array! @user.following_users, :id, :username, :name
end

json.received_likes do
  json.array! @user.received_likes, :id, :photo_id, :user_id, :created_at, :checked, :user, :photo
end

json.received_comments do
  json.array! @user.received_comments, :id, :photo_id, :user_id, :body, :created_at, :checked, :user, :photo
end
