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
