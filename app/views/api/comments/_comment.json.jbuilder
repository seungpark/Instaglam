json.extract!(
  comment,
  :photo_id, :body
)

json.user do
  json.extract! comment.user, :id, :username
end
