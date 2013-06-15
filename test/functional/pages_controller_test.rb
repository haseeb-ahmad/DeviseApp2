require 'test_helper'

class PagesControllerTest < ActionController::TestCase
  test "should get login" do
    get :login
    assert_response :success
  end

  test "should get index-alt" do
    get :index-alt
    assert_response :success
  end

end
