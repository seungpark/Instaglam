json.extract!(
  photo,
  :id, :title, :caption, :user_id, :created_at, :tags
)

json.user do
  json.extract! photo.user, :id, :username, :avatar_file_name
end

json.author_avatar_url asset_path(photo.user.avatar.url)


json.image_url asset_path(photo.image.url)
json.comments do
  json.partial! "api/comments/comment", collection: photo.comments, as: :comment
end
json.likes do
  json.partial! "api/likes/like", collection: photo.likes, as: :like
end
