module Api
    class TasksController <  BaseApiController
        before_action :set_task, only: [:show, :update, :destroy]
        before_action :check_user
        def index
            render json: current_user.tasks.order(:end_date).all.as_json
        end
          
        def show
            render json: @task
        end
          
        def create
           task = current_user.tasks.new(task_params)
            if task.save
              render json: task
            else
              render json: {errors: task.errors, status: :unprocessable_entity}
            end
        end
          
        def update
            if @task.update_attributes(task_params)
                @task.update_attributes(completed_at: Date.today)if @task.completed == 100 && !@task.completed_at
                @task.update_attributes(completed_at: nil) if @task.completed < 100 && @task.completed_at
              render json: @task
            else
              render json: {errors: @task.errors, status: :unprocessable_entity}
            end
        end
          
        def destroy
            @task.destroy
            head :no_content
        end

        private
        # Never trust parameters from the scary internet, only allow the white list through.
        def task_params
            params.require(:task).permit(:name, :description, :start_date, :end_date, :completed_at, :completed)
        end

        def set_task
            @task = Task.find(params[:id])
        end
    end
end