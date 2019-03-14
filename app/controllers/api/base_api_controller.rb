module Api
    class BaseApiController <  ActionController::API
        include SessionsHelper

        private
        def check_user
            render json: {errors: "Sign in to access these data, please", status: :unprocessable_entity} unless logged_in?
        end
    end
end
