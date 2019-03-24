module Api
class SiteFunctionsController < BaseApiController
    before_action :check_user
    before_action :set_site_function, only: [:update, :destroy, :show]

    def index
        if(current_user.admin)
            render json: SiteFunction.all.as_json
        else
            site_functions = SiteFunction.where(admin: false).all
            p site_functions
            render json: site_functions.as_json
        end
    end

    def show
        render json: @site_function.as_json
    end

    def create
        if(SiteFunction.find_by(name: params[:site_function][:name]))
            render json: {errors: "Questa funzione esiste già", status: :unprocessable_entity}
        else
            site_function = SiteFunction.new(site_function_params)
            if site_function.save
                render json: site_function.as_json
            else
                render json: {errors: site_function.errors, status: :unprocessable_entity}
            end
        end
    end

    def update
        if @site_function.update_attributes(site_function_params)
          render json: @site_function.as_json
        else
          render json: {errors: @site_function.errors, status: :unprocessable_entity}
        end
    end
      
    def destroy
        @site_function.destroy
        head :no_content
    end

    private 

    def site_function_params
        params.require(:site_function).permit(:name, :description, :url, :admin)
    end

    def set_site_function
        @site_function = SiteFunction.find(params[:id])
    end
end
end