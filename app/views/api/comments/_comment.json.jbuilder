json.extract!(
  comment,
  :photo_id, :user_id, :body
)

json.user comment.user
