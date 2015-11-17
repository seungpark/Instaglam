class Photo < ActiveRecord::Base
  validates :title, :user_id, presence: true

  belongs_to :user

  # has_many :taggings
  #
  # has_many(
  #   :tags,
  #   through: :taggings,
  #   source: :tags
  # )

end


# column name | data type | details
# ------------|-----------|-----------------------
# id          | integer   | not null, primary key
# title       | string    | not null
# caption     | text      | not null
# user_id     | integer   | not null, foreign key (references users), indexed
