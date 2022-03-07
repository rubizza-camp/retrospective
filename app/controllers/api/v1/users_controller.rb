# frozen_string_literal: true

module API
  module V1
    class UsersController < API::V1::BaseController
      skip_verify_authorized only: %i[index suggestions]

      def index
        render json: @current_user
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
    end
  end
end
