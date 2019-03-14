class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.references :user, foreign_key: true
      t.string :name
      t.text :description
      t.integer :completed
      t.date :start_date
      t.date :end_date
      t.date :completed_at
      t.boolean :active

      t.timestamps
    end
  end
end
