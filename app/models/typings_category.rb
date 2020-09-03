class TypingsCategory < ApplicationRecord
  belongs_to :typing
  belongs_to :category

  validates :typing_id, :category_id, presence: true
end
