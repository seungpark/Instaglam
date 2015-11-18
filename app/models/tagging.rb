class Tagging < ActiveRecord::Base
  validates :photo_id, :tag_id, presence: true, numericality: { only_integer: true }

  belongs_to :tag
  belongs_to :photo
end
