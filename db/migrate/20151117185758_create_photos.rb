class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :title, null: false
      t.text :caption
      t.integer :user_id, null: false
      t.timestamps null: false
    end
  end
end


# column name | data type | details
# ------------|-----------|-----------------------
# id          | integer   | not null, primary key
# title       | string    | not null
# caption     | text      | not null
# tags        | text      | not null
# user_id     | integer   | not null, foreign key (references users), indexed
