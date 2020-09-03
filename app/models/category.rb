class Category < ApplicationRecord
  has_many :typings_categories
  has_many :typings, through: :typings_categories

  validates :name, presence: true
end
