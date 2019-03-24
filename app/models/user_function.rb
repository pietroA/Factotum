class UserFunction < ApplicationRecord
  belongs_to :user
  belongs_to :site_function

  def as_json(options = {})
    super(options.merge(include: [ :site_function]))
  end
end
