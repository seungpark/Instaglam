# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


users = User.create!([
  {username: "seung", password: "hello123", bio: "travel the world", name: "Seung Park"},
  {username: "anthonydavis", password: "hello123", bio: "how you like my brow", name: "Anthony Davis"},
  {username: "jamesharden", password: "hello123", bio: "FEAR the BEARD", name: "James Harden"},
  {username: "chandlerbing", password: "hello123", bio: "Can I BE any funnier?", name: "Chandler Bing"},
  {username: "jimmyfallon", password: "hello123", bio: "LADIES AND GENLEMEN", name: "Jimmy Fallon"},
  {username: "johncena", password: "hello123", bio: "JOHN CENA", name: "JOHN CENA"},
  {username: "lebronjames", password: "hello123", bio: "the king", name: "LeBron James"},
  {username: "carmelo", password: "hello123", bio: "", name: "Carmelo Anthony"},
  {username: "mikekrieger", password: "hello123", bio: "welcome to instaglam", name: "Mike Krieger"},
  {username: "obama", password: "hello123", bio: "For the People", name: "Barack Obama"},
  {username: "smiley", password: "hello123", bio: "I'm happy", name: "Smiley Face"},
  {username: "curry", password: "hello123", bio: "Chef Curry", name: "Steph Curry"},
  {username: "guest", password: "hello123", bio: "I am a guest", name: "John Doe"},

])



(0..13).each do |userid|
  (0..13).each do |followerid|
    Follow.create!([
      user_id: userid,
      follower_id: followerid
    ])
  end
end
