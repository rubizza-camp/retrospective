# frozen_string_literal: true

module API
  module V1
    class UsersController < API::V1::BaseController
      skip_verify_authorized only: %i[show update suggestions]

      def show
        render json: @current_user
      end

      def update
        if @current_user.update(user_params)
          avatar_delete
          render json: @current_user
        else
          render_json_error(@current_user.errors.full_messages)
        end
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
        params.require(:user).permit(:nickname, :first_name, :last_name, :avatar)
      end

      def avatar_delete
        return unless user_params[:avatar].nil?

        @current_user.remove_avatar!
        @current_user.save
      end

      def prepare_and_make_response(user)
        payload = serialize_resource(user)

        render json: payload
      end
    end
  end
end