json.extract!(
  photo,
  :id, :title, :caption, :user_id
)

json.username (photo.user.username)
json.image_url asset_path(photo.image.url)
json.comments (photo.comments)
