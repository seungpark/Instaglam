json.extract!(
  photo,
  :id, :title, :caption, :user_id
)

json.username (photo.user.username)
