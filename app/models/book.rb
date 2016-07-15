class Book < ActiveRecord::Base
  belongs_to :category
  has_many :reviews, dependent: :destroy

  mount_uploader :picture, PictureUploader
  validate :picture_size

  def picture_size
    if picture.size > 5.megabytes
      errors.add(:picture, t("picture.validate"))
    end
  end
end
