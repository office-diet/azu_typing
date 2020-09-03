class CreateTypings < ActiveRecord::Migration[6.0]
  def change
    create_table :typings do |t|
      t.string :original, null: false, unique: true
      t.string :hiragana, null: false

      t.timestamps
    end
  end
end
