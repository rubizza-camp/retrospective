# frozen_string_literal: true

module API
  module V1
    class ActionItemsController < API::V1::BaseController
      before_action :set_action_item, except: %i[create index]
      before_action :set_board, only: %i[create move]

      skip_verify_authorized only: %i[index]

      def index
        action_items = current_user.action_items.includes(%i[author assignee board])
                                   .order(status: :desc, created_at: :asc)
        render json: action_items
      end

      # app/graphql/mutations/add_action_item_mutation.rb
      def create
        action_item = ActionItem.new(action_item_params.merge!(board: @board,
                                                               author: current_user))

        authorize! action_item, context: { user: current_user, board: @board }

        if action_item.save
          prepare_and_make_response(action_item)
        else
          render_json_error(action_item.errors.full_messages)
        end
      end

      # app/graphql/mutations/update_action_item_mutation.rb
      def update
        unless @action_item.author_id == current_user.id
          authorize! @action_item,
                     context: { user: current_user,
                                board: @board }
        end

        if @action_item.update(action_item_params)
          prepare_and_make_response(@action_item)
        else
          render_json_error(@action_item.errors.full_messages)
        end
      end

      # app/graphql/mutations/destroy_action_item_mutation.rb
      def destroy
        unless @action_item.author_id == current_user.id
          authorize! @action_item,
                     context: { user: current_user,
                                board: @board }
        end

        if @action_item.destroy
          prepare_and_make_response(@action_item)
        else
          render_json_error(@action_item.errors.full_messages)
        end
      end

      def status
        statuses = %w[closed done pending in_progress]
        current_status = params[:status]
        policy_status = "#{current_status}?".to_sym

        authorize! @action_item, to: policy_status, context: { user: current_user, board: @board }

        if statuses.include?(current_status) && @action_item.send("#{current_status}!")
          prepare_and_make_response(@action_item)
        else
          render_json_error(@action_item.errors.full_messages)
        end
      end

      def move
        authorize! @action_item, context: { user: current_user, board: @board }

        if @action_item.move!(@board)
          prepare_and_make_response(@action_item)
        else
          render_json_error(@action_item.errors.full_messages)
        end
      end

      private

      def action_item_params
        params.permit(:body, :assignee_id, :author_id, :status)
      end

      def prepare_and_make_response(action_item)
        payload = serialize_resource(action_item)

        ActionCable.server.broadcast('action_item', payload)
        render json: action_item
      end

      def set_action_item
        @action_item = ActionItem.find(params[:id])
      end

      def set_board
        @board = Board.find_by(slug: params[:board_slug])
      end
    end
  end
end
