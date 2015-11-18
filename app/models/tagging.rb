class Tagging < ActiveRecord::Base
  validates :photo_id, :tag_id, presence: true, numericality: { only_integer: true }
  # validate :user_is_owner, :before => :create

  belongs_to :tag
  belongs_to :photo





  private
  def user_is_owner
  end

end
