json.extract!(
  user,
  :id, :username, :session_token
)

json.username (photo.user.username)
