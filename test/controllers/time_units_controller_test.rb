require 'test_helper'

class TimeUnitsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get time_units_index_url
    assert_response :success
  end

end
