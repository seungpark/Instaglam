json.extract!(
  comment,
  :photo_id, :user_id, :body
)

json.username comment.user.username
