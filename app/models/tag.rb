class Tag < ActiveRecord::Base
  validates :name, presence: true


  has_many :taggings

  has_many(
    :photos,
    through: :taggings,
    source: :photo
  )

end