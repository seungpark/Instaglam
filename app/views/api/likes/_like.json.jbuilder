json.extract!(
  like,
  :id, :photo_id, :user_id
)

json.user do
  json.extract! like.user, :username
end
