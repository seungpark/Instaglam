class AddIndexToTaggings < ActiveRecord::Migration
  def change
    add_index :taggings, [:photo_id, :tag_id], unique: true
  end
end
