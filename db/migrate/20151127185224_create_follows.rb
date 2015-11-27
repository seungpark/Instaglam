class CreateFollows < ActiveRecord::Migration
  def change
    create_table :follows do |t|
      t.integer :user_id
      t.integer :follower_id

      t.timestamps null: false
    end
    add_index :follows, [:user_id, :follower_id], unique: true
  end
end
