module Api
    class BaseApiController <  ActionController::API
        include SessionsHelper

        private
        def check_user
            render json: {errors: "Accedi per visualizzare la pagina", status: :unprocessable_entity} unless logged_in?
        end

        def check_admin
            render json: {errors: "Ci dispiace, il tuo account non ha sufficiente autorizzazione per questa funzione.", status: :unprocessable_entity} unless current_user.admin
        end
    end
end
