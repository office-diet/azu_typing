class Typing < ApplicationRecord
  has_many :typings_categories
  has_many :categories, through: :typings_categories

  validates :original, :hiragana, presence: true
end
