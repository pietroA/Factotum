module Api
class UserFunctionsController < BaseApiController
    before_action :check_user
    before_action :set_user_function, only: [:update, :destroy, :show]

    def index
        render json: current_user.user_functions.all.as_json
    end

    def method_name
        render json: @user_function.as_json
    end

    def create
        user_function = current_user.user_functions.new(user_function_params)
        if user_function.save
            render json: user_function.as_json
        else
            render json: {errors: user_function.errors, status: :unprocessable_entity}
        end
    end

    def update
        if @user_function.update_attributes(user_function_params)
          render json: @user_function.as_json
        else
          render json: {errors: @user_function.errors, status: :unprocessable_entity}
        end
    end
      
    def destroy
        @user_function.destroy
        head :no_content
    end

    private 

    def user_function_params
        params.require(:user_function).permit(:user_id, :site_function_id)
    end

    def set_user_function
        @user_function = UserFunction.find(params[:id])
    end
end
end