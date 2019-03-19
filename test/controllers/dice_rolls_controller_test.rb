require 'test_helper'

class DiceRollsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get dice_rolls_index_url
    assert_response :success
  end

end
