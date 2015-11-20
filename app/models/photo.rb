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

class AddDetailsToProducts < ActiveRecord::Migration
  def change
    add_column :products, :part_number, :string
    add_column :products, :price, :decimal
  end
end


# column name | data type | details
# ------------|-----------|-----------------------
# id          | integer   | not null, primary key
# title       | string    | not null
# caption     | text      | not null
# user_id     | integer   | not null, foreign key (references users), indexed
