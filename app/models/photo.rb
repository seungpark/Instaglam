class Photo < ActiveRecord::Base

  has_attached_file :image, default_url: "missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  validates :title, :user_id, presence: true

  belongs_to :user

  has_many :taggings

  has_many(
    :tags,
    through: :taggings,
    source: :tag
  )

  has_many :comments

end
