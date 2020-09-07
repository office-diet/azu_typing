class CreateScores < ActiveRecord::Migration[6.0]
  def change
    create_table :scores do |t|
      t.integer :score, null: false
      t.float :sps, null: false
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
