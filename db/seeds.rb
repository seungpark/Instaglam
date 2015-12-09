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


photos = Photo.create!([
  {title: "photo1", caption: "caption1", user_id: 1},
  {title: "photo2", caption: "caption2", user_id: 2},
  {title: "photo3", caption: "caption3", user_id: 3},
  {title: "photo4", caption: "caption4", user_id: 4},
  {title: "photo5", caption: "caption5", user_id: 5}
])

tags = Tag.create!([
  {name: "yolo"},
  {name: "tbt"},
  {name: "nature"},
  {name: "nofilter"},
  {name: "sunset"},
  {name: "hbd"}
])


taggings = Tagging.create!([
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

comments = Comment.create!([
  {photo_id:1 , user_id:1 , body: "test1"},
  {photo_id:1 , user_id:2 , body: "test2"},
  {photo_id:1 , user_id:3 , body: "test3"},
  {photo_id:2 , user_id:1 , body: "test4"},
  {photo_id:2 , user_id:1 , body: "test5"},
  {photo_id:2 , user_id:2 , body: "helloworld"},
  {photo_id:2 , user_id:3 , body: "byeworld"},
  {photo_id:2 , user_id:4 , body: "helloagain"},
  {photo_id:3 , user_id:1 , body: "byeagain"},
  {photo_id:3 , user_id:1 , body: "commentbodytest1"},
  {photo_id:3 , user_id:2 , body: "commentbodytest2"},
  {photo_id:3 , user_id:3 , body: "heres a really long body test for the comment check for overflow of text"},
  {photo_id:3 , user_id:1 , body: "last comment"}
  ])

likes = Like.create!([
  {photo_id:1 , user_id:1},
  {photo_id:1 , user_id:2},
  {photo_id:1 , user_id:3},
  {photo_id:1 , user_id:4},
  {photo_id:2 , user_id:2},
  {photo_id:2 , user_id:3},
  {photo_id:2 , user_id:4},
  {photo_id:2 , user_id:5},
])

(0..13).each do |userid|
  (0..13).each do |followerid|
    Follow.create!([
      user_id: userid,
      follower_id: followerid
    ])
  end
end
