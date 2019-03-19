require 'test_helper'

class ColourfulControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get colourful_index_url
    assert_response :success
  end

end
