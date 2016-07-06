class Book < ActiveRecord::Base
  belongs_to :category
  has_many :reviews, dependent: :destroy
end
