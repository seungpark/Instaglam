json.(received_like, :id, :photo_id, :user_id, :created_at, :checked)

json.user do
  user = received_like.user
  json.(user, :username)
  json.avatar do
    json.(user.avatar, :url)
  end
end

json.photo do
  json.image do
    json.url received_like.photo.image.url
  end
end
