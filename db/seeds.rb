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
  {username: "guest4", password: "hello123"},
])


photos = Photo.create([
  {title: "photo1", caption: "caption1", user_id: 1},
  {title: "photo2", caption: "caption2", user_id: 2},
  {title: "photo3", caption: "caption3", user_id: 3},
  {title: "photo4", caption: "caption4", user_id: 4},
  {title: "photo5", caption: "caption5", user_id: 5},
])


  # column name | data type | details
  # ------------|-----------|-----------------------
  # id          | integer   | not null, primary key
  # title       | string    | not null
  # caption     | text      | not null
  # user_id     | integer   | not null, foreign key (references users), indexed
