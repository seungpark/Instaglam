json.(received_comment, :id, :photo_id, :user_id, :body, :created_at, :checked)

json.user do
  user = received_comment.user
  json.(user, :username)
  json.avatar do
    json.(user.avatar, :url)
  end
end

json.photo do
  json.image do
    json.url received_comment.photo.image.url
  end
end
