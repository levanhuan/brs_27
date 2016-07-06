class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.bool :is_admin
      t.string :gravatar

      t.timestamps null: false
    end
  end
end
