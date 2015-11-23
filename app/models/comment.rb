class Comment < ActiveRecord::Base

  validates :photo_id, :user_id, :body, presence: true

  belongs_to :user
  belongs_to :photo

end
