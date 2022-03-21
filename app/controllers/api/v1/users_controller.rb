# frozen_string_literal: true

module API
  module V1
    class UsersController < API::V1::BaseController
      skip_verify_authorized only: %i[show update suggestions]

      def show
        render json: @current_user
      end

      def update
        @current_user.update(user_params)
      end

      # app/graphql/queries/suggestions.rb
      def suggestions
        autocomplete = params[:autocomplete]
        @suggestions = Boards::Suggestions.new(autocomplete).call

        render json: {
          data: {
            suggestions: @suggestions
          }
        }
      end

      private

      def user_params
        params.require(:data_form).permit(:nickname, :first_name, :last_name, :avatar)
      end
    end
  end
end
