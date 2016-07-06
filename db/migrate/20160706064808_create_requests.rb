class CreateRequests < ActiveRecord::Migration
  def change
    create_table :requests do |t|
      t.integer :user_id
      t.bool :is_approved
      t.string :book_name

      t.timestamps null: false
    end
  end
end
