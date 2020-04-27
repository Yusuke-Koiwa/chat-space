class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :group_users
  has_many :messages
  has_many :groups, through: :group_users
  validates :name, presence: true, uniqueness: true

  def self.search(input, id)
    return nil if params[;keyword] == ""
    User.where('name Like ?', "%#{input}%").where.not(id: id).limit(10)
  end

end
