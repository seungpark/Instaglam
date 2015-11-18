# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


users = User.create([
  {username: "seung", password: "hello123"},
  {username: "guest", password: "hello123"},
  {username: "guest2", password: "hello123"},
  {username: "guest3", password: "hello123"},
  {username: "guest4", password: "hello123"}
])


photos = Photo.create([
  {title: "photo1", caption: "caption1", user_id: 1},
  {title: "photo2", caption: "caption2", user_id: 2},
  {title: "photo3", caption: "caption3", user_id: 3},
  {title: "photo4", caption: "caption4", user_id: 4},
  {title: "photo5", caption: "caption5", user_id: 5}
])

tags = Tag.create([
  {name: "tag1"},
  {name: "tag2"},
  {name: "tag3"},
  {name: "tag4"},
  {name: "tag5"},
  {name: "tag6"}
])


taggings = Tagging.create([
  {photo_id:1, tag_id:1},
  {photo_id:1, tag_id:2},
  {photo_id:1, tag_id:3},
  {photo_id:2, tag_id:4},
  {photo_id:2, tag_id:5},
  {photo_id:3, tag_id:4},
  {photo_id:3, tag_id:5},
  {photo_id:3, tag_id:6},
  {photo_id:3, tag_id:2},  
])

  # column name | data type | details
  # ------------|-----------|-----------------------
  # id          | integer   | not null, primary key
  # title       | string    | not null
  # caption     | text      | not null
  # user_id     | integer   | not null, foreign key (references users), indexed
