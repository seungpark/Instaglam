class User < ActiveRecord::Base
  include PgSearch
  multisearchable :against => [:username, :name]

  attr_reader :password

  after_initialize :ensure_session_token

  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :session_token, :username, uniqueness: true

  has_attached_file :avatar, default_url: "missingavatar.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  has_many :photos

  has_many :likes

  has_many(
    :received_likes,
    through: :photos,
    source: :likes
  )

  has_many :comments

  has_many(
    :received_comments,
    through: :photos,
    source: :comments
  )

  has_many(
    :follows,
    class_name: "Follow",
    primary_key: :id,
    foreign_key: :user_id
  )

  has_many(
    :followers,
    through: :follows,
    source: :follower
  )

  has_many(
    :followings,
    class_name: "Follow",
    primary_key: :id,
    foreign_key: :follower_id
  )

  has_many(
    :following_users,
    through: :followings,
    source: :user
  )



  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user && user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def is_password?(unencrypted_password)
    BCrypt::Password.new(self.password_digest).is_password?(unencrypted_password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
end
