class CreateTypingsCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :typings_categories do |t|
      t.references :typing, null: false, foregn_key: true
      t.references :category, null: false, foregn_key: true
      t.timestamps
    end
  end
end
