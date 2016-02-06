class AddCheckedColumnToLikes < ActiveRecord::Migration
  def change
    add_column :likes, :checked, :boolean, default: false
  end
end
