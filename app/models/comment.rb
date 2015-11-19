class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :photo
  has_one :body
end
