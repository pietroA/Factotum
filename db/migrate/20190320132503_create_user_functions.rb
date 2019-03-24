class CreateUserFunctions < ActiveRecord::Migration[5.1]
  def change
    create_table :user_functions do |t|
      t.references :user, foreign_key: true
      t.references :site_function, foreign_key: true

      t.timestamps
    end
  end
end
