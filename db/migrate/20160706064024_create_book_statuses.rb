class CreateBookStatuses < ActiveRecord::Migration
  def change
    create_table :book_statuses do |t|
      t.integer :user_id
      t.integer :book_id
      t.integer :reading_status
      t.bool :is_favorite

      t.timestamps null: false
    end
  end
end
