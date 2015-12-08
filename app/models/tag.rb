class Tag < ActiveRecord::Base
  include PgSearch
  multisearchable against: :name

  validates :name, presence: true, uniqueness: true

  has_many :taggings

  has_many(
    :photos,
    through: :taggings,
    source: :photo
  )

end
