class CreateSiteFunctions < ActiveRecord::Migration[5.1]
  def change
    create_table :site_functions do |t|
      t.string :name
      t.text :description
      t.string :url
      t.boolean :admin

      t.timestamps
    end
  end
end
