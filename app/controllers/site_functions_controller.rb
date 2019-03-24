class SiteFunctionsController < ApplicationController
    before_action :check_login
    before_action :check_admin
    def index
    end
end
